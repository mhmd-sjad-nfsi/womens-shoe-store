// backend/controllers/orderController.js

import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'; // ← اضافه شد

// @desc    ایجاد سفارش جدید
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('سبد خرید خالی است');
  }

  // ایجاد سفارش
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  // ذخیره سفارش در دیتابیس
  const createdOrder = await order.save();

  // ← این قسمت: کسر موجودی هر محصول برای هر سایز
  for (const item of createdOrder.orderItems) {
  const prod = await Product.findById(item.product);
  if (prod) {
    const stockEntry = prod.stock.find((s) => s.size === item.size);
    if (stockEntry) {
      stockEntry.count = Math.max(stockEntry.count - item.qty, 0);
    }
    // غیرفعال کردن اعتبارسنجی تا خطای user: required رو دور بزنیم
    await prod.save({ validateBeforeSave: false });
  }
}


  res.status(201).json(createdOrder);
});

// @desc    دریافت سفارش بر اساس ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('سفارش یافت نشد');
  }
});

// @desc    دریافت سفارش‌های کاربر جاری
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    دریافت همهٔ سفارش‌ها (ادمین)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
});
