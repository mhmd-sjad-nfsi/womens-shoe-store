import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// برای ESM: ساخت __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware ها
app.use(express.json());

// استاتیک کردن پوشه‌ی uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// روت ها
app.use('/api/products', productRoutes);

// اتصال به دیتابیس
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
