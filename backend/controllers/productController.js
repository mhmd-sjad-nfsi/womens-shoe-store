import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    دریافت لیست همه محصولات
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    دریافت جزئیات یک محصول بر اساس ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }
});
// @desc    ایجاد محصول جدید
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'نمونه',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'نمونه',
    category: 'نمونه',
    countInStock: 0,
    description: 'توضیح نمونه',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    به‌روزرسانی محصول
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }
});

// @desc    حذف محصول
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'محصول با موفقیت حذف شد' });
  } else {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }
});

