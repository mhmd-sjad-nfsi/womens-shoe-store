import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import axios from 'axios';
import Order from '../models/orderModel.js';   // ← اضافه شد

const router = express.Router();
const ZP_BASE = 'https://sandbox.zarinpal.com/pg/rest/WebGate';

// POST /api/payments/zarinpal
router.post(
  '/zarinpal',
  protect,
  asyncHandler(async (req, res) => {
    const { orderId, amount } = req.body;
    const merchant_id = process.env.ZP_MERCHANT_ID;
    const callback_url = `${process.env.ZP_CALLBACK_URL}?orderId=${orderId}`;

    const { data } = await axios.post(
      `${ZP_BASE}/PaymentRequest.json`,
      {
        MerchantID: merchant_id,
        Amount: amount,
        Description: `پرداخت سفارش ${orderId}`,
        CallbackURL: callback_url,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (data.Status === 100) {
      return res.json({
        paymentUrl: `https://sandbox.zarinpal.com/pg/StartPay/${data.Authority}`,
      });
    }

    res.status(400).json({ message: 'خطا در ایجاد درخواست پرداخت' });
  })
);

// GET /api/payments/zarinpal/callback
router.get(
  '/zarinpal/callback',
  asyncHandler(async (req, res) => {
    const { Status, Authority, orderId } = req.query;

    if (Status !== 'OK') {
      return res.redirect(`/checkout?paymentError=پرداخت ناموفق بود`);
    }

    // پیدا کردن سفارش و محاسبه مبلغ ریالی
    const order = await Order.findById(orderId);
    if (!order) {
      return res.redirect(`/checkout?paymentError=سفارش یافت نشد`);
    }
    const merchant_id = process.env.ZP_MERCHANT_ID;
    const amount = Math.round(order.totalPrice * 10); // تومان→ریال

    // Verify
    const { data } = await axios.post(
      `${ZP_BASE}/PaymentVerification.json`,
      {
        MerchantID: merchant_id,
        Authority,
        Amount: amount,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (data.Status === 100) {
      // علامت‌گذاری سفارش به‌عنوان پرداخت‌شده
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();

      return res.redirect(`/order/${orderId}`);
    } else {
      return res.redirect(`/checkout?paymentError=پرداخت تأیید نشد`);
    }
  })
);

export default router;
