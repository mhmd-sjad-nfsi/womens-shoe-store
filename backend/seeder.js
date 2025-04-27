import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();        // پاک کردن همهٔ محصولات قبلی
    await Product.insertMany(products); // وارد کردن محصولات جدید

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error}`);
    process.exit(1);
  }
};

importData();
