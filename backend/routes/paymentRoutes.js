import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import axios from 'axios';
import Order from '../models/orderModel.js';

const router = express.Router();
// Base URL for Zarinpal sandbox or production based on env
const ZP_BASE ='https://sandbox.zarinpal.com/pg/v4/payment';

// POST /api/payments/zarinpal
router.post(
  '/zarinpal',
  protect,
  asyncHandler(async (req, res) => {
    const { orderId, amount, description, metadata } = req.body;
    const merchant_id = process.env.ZP_MERCHANT_ID;
    const callback_url = `${process.env.ZP_CALLBACK_URL}?orderId=${orderId}`;

    // Initiate payment request
    const resp = await axios.post(
      `${ZP_BASE}/request.json`,
      {
        merchant_id,
        amount,
        callback_url,
        description: description || `پرداخت سفارش ${orderId}`,
        metadata: metadata || {},
      },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
    );

    const { data } = resp.data; // data object contains code, authority, fee, etc.
    if (data.code === 100) {
      const gateway = process.env.ZP_SANDBOX === 'true'
        ? 'https://sandbox.zarinpal.com/pg/StartPay'
        : 'https://payment.zarinpal.com/pg/StartPay';
      return res.json({ paymentUrl: `${gateway}/${data.authority}` });
    }

    return res.status(400).json({ message: `خطا در ایجاد درخواست پرداخت: ${resp.data.errors?.[0]?.message || 'نامشخص'}` });
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

    const order = await Order.findById(orderId);
    if (!order) {
      return res.redirect(`/checkout?paymentError=سفارش یافت نشد`);
    }

    const merchant_id = process.env.ZP_MERCHANT_ID;
    const amount = Math.round(order.totalPrice * 10); // تومان → ریال

    // Verify transaction
    const resp = await axios.post(
      `${ZP_BASE}/verify.json`,
      { merchant_id, amount, authority: Authority },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
    );

    const { data } = resp.data;
    if (data.code === 100) {
      // Mark order as paid
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.ref_id,
        status: 'success',
        update_time: new Date(),
        payer: {
          card_pan: data.card_pan,
          card_hash: data.card_hash,
        },
      };
      await order.save();
      return res.redirect(`/order/${orderId}`);
    }

    // Payment failed or already verified
    return res.redirect(`/checkout?paymentError=خطای اعتبارسنجی پرداخت: کد ${data.code}`);
  })
);

export default router;
