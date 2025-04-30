// backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';   // ← اضافه شد

import products from './data/products.js';
import users from './data/users.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // پاک‌سازی کامل دیتابیس
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('🗑️ همه‌ی کالکشن‌ها پاک شدند');

    // وارد کردن کاربران و گرفتن آیدی ادمین
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} کاربر وارد شد`);

    // نسبت دادن محصولات به ادمین (اولین کاربر)
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((p) => ({
      ...p,
      user: adminUserId,
    }));

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} محصول وارد شد`);

    console.log('🎉 Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// اجرای تابع
importData();
