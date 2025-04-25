import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';  // بعدا می‌سازیم

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('سلام! سرور با موفقیت راه‌اندازی شد.');
});

// API Routes
app.use('/api/products', productRoutes);

// Error handling (اختیاری در آینده)
app.use((req, res, next) => {
  res.status(404).json({ message: 'مسیر پیدا نشد' });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
