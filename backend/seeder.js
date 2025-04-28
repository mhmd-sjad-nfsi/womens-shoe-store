import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';

import Product from './models/productModel.js';
import User from './models/userModel.js';

import products from './data/products.js';
import users from './data/users.js';

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    // پاک‌سازی کالکشن‌ها
    await User.deleteMany();
    await Product.deleteMany();

    // ایمپورت کاربران و محصولات
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} کاربر وارد شد`);

    const sampleProducts = products.map((p) => ({
      ...p,
      user: createdUsers[0]._id, // منتسب کردن تمام محصولات به ادمین
    }));
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} محصول وارد شد`);

    console.log('🔄 Data Imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
