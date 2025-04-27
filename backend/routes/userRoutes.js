import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'; // توکن JWT رو می‌سازیم
import asyncHandler from 'express-async-handler';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ثبت‌نام یوزر
router.post(

  '/register',
  protect,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('این ایمیل قبلاً ثبت شده است');
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id), // توکن JWT برای یوزر
      });
    } else {
      res.status(400);
      throw new Error('خطا در ثبت‌نام');
    }
  })
);

// ورود یوزر
router.post(
  '/login',
  protect,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id), // توکن JWT برای یوزر
      });
    } else {
      res.status(401);
      throw new Error('ایمیل یا پسورد اشتباه است');
    }
  })
);

export default router;
