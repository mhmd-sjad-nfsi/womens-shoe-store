import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';
import axios from 'axios';

const router = express.Router();

const ZP_BASE = 'https://sandbox.zarinpal.com/pg/rest/WebGate'; 

// درخواست پرداخت
// POST /api/payments/zarinpal
router.post(
  '/zarinpal',
  protect,
  asyncHandler(async (req, res) => {
    const { orderId, amount } = req.body; 
    const merchant_id = process.env.ZP_MERCHANT_ID;
    const callback_url = `${process.env.ZP_CALLBACK_URL}?orderId=${orderId}`;

    const { data } = await axios.post(`${ZP_BASE}/PaymentRequest.json`, {
      MerchantID: merchant_id,
      Amount: amount,
      Description: `پرداخت سفارش ${orderId}`,
      CallbackURL: callback_url,
    });

    if (data.Status === 100) {
      // ارسال کاربر به وب‌گیت زرین‌پال
      return res.json({
        paymentUrl: `https://sandbox.zarinpal.com/pg/StartPay/${data.Authority}`,
      });
    }

    res.status(400).json({ message: 'خطا در ایجاد درخواست پرداخت' });
  })
);

// هندل callback
// GET /api/payments/zarinpal/callback
router.get(
  '/zarinpal/callback',
  asyncHandler(async (req, res) => {
    const { Status, Authority, orderId } = req.query;

    if (Status !== 'OK') {
      return res.redirect(`/checkout?paymentError=پرداخت ناموفق بود`);
    }

    const merchant_id = process.env.ZP_MERCHANT_ID;
    // Verify
    const { data } = await axios.post(`${ZP_BASE}/PaymentVerification.json`, {
      MerchantID: merchant_id,
      Authority,
      Amount: req.query.amount, // مبلغ باید همان مبلغ پرداخت باشد
    });

    if (data.Status === 100) {
      // می‌توانید اینجا سفارش را isPaid=true کنید
      // await Order.findByIdAndUpdate(orderId, { isPaid: true, paidAt: Date.now() });

      return res.redirect(`/order/${orderId}`);
    } else {
      return res.redirect(`/checkout?paymentError=پرداخت تأیید نشد`);
    }
  })
);

export default router;
