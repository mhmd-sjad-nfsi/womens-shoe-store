import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// لیست محصولات
router.get('/', getProducts);

// جزئیات محصول
router.get('/:id', getProductById);

export default router;
