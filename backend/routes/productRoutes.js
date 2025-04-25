import express from 'express';
const router = express.Router();

// @route   GET /api/products
// @desc    تست محصول
// @access  Public
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'کفش زنانه نمونه' }]);
});

export default router;
