import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,              // ← اضافه شد
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders        → ساخت سفارش جدید
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// GET  /api/orders/myorders → سفارش‌های کاربر جاری
router.route('/myorders').get(protect, getMyOrders);

// GET  /api/orders/:id    → جزییات سفارش
router.route('/:id').get(protect, getOrderById);

export default router;
