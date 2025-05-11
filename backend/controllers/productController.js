import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    گرفتن تمام محصولات
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    گرفتن یک محصول با آیدی
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
  const { name, price, description, image, brand, category, sizes, colors } = req.body;

  // ساخت آرایه stock بر اساس sizes با مقدار count صفر
  const stock = sizes.map((sz) => ({ size: sz, count: 0 }));

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    description,
    sizes,
    stock,
    colors,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    به‌روزرسانی محصول
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, sizes, stock, colors } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }

  // به‌روز رسانی فیلدها
  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.sizes = sizes;
  product.colors = colors;

  // اطمینان از هم‌خوانی stock و sizes
  // اگر سایزی در stock نیست، با count=0 اضافه می‌شود
  const newStock = sizes.map((sz) => {
    const exist = stock.find((s) => s.size === sz);
    return { size: sz, count: exist ? exist.count : 0 };
  });
  product.stock = newStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    حذف محصول
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }
  await product.remove();
  res.json({ message: 'محصول با موفقیت حذف شد' });
});
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }

  // مطمئن شوید کاربر قبلاً نظر نداده
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('شما قبلاً نظر خود را ثبت کرده‌اید');
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'نظر با موفقیت ثبت شد' });
});
// @desc    Delete a review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private/Admin
export const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('محصول پیدا نشد');
  }

  const reviewIndex = product.reviews.findIndex(
    (r) => r._id.toString() === req.params.reviewId
  );
  if (reviewIndex === -1) {
    res.status(404);
    throw new Error('نظر پیدا نشد');
  }

  // حذف نقد
  product.reviews.splice(reviewIndex, 1);
  product.numReviews = product.reviews.length;
  product.rating =
    product.numReviews > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews
      : 0;

  await product.save();
  res.json({ message: 'نظر با موفقیت حذف شد' });
});

