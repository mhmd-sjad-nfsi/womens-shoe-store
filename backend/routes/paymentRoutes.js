import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @desc   ایجاد درخواست پرداخت زرین‌پال
 * @route  POST /api/payments/zarinpal
 * @access Private
 */
router.post(
  '/zarinpal',
  protect,
  asyncHandler(async (req, res) => {
    const { orderId, amount } = req.body;

    // در اینجا منطق ساخت درخواست به زرین‌پال قرار می‌گیرد.
    // فعلاً یک URL placeholder برمی‌گردانیم:
    const callbackUrl = `https://your-domain.com/api/payments/zarinpal/callback`; 
    // اگر نیاز بود بعداً orderId و token را به callbackUrl اضافه کنید.

    // جواب را به کلاینت می‌دهیم:
    res.json({
      paymentUrl: 'https://next-step-for-zarinpal.example.com/XXXXXXXXXX', // placeholder
      callbackUrl,
    });
  })
);

/**
 * @desc   هندل کردن callback زرین‌پال
 * @route  GET /api/payments/zarinpal/callback
 * @access Public (زرین‌پال به آن دسترسی دارد)
 */
router.get(
  '/zarinpal/callback',
  asyncHandler(async (req, res) => {
    // پارامترهای تراکنش را از query بخوانید
    const { Authority, Status, orderId } = req.query;

    // اینجا منطق Verify تراکنش (درستی پرداخت) قرار می‌گیرد.
    // برای شروع، فرض می‌کنیم موفقیت‌آمیز بوده:
    if (Status === 'OK') {
      // مثال: در ادامه می‌توانید order را در دیتابیس isPaid=true کنید
      // await Order.findByIdAndUpdate(orderId, { isPaid: true, paidAt: Date.now() });

      // کاربر را به صفحه نهایی تراکنش (سپس OrderScreen) هدایت کنید
      res.redirect(`/order/${orderId}`);
    } else {
      // پرداخت ناموفق
      res.redirect(`/checkout?paymentError=پرداخت ناموفق بود`);
    }
  })
);

export default router;
