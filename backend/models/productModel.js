import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    image:       { type: String, required: true },   // مسیر یا URL عکس
    description: { type: String, required: true },
    brand:       { type: String, required: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true },
    countInStock:{ type: Number, required: true, default: 0 },
    rating:      { type: Number, required: true, default: 0 },
    numReviews:  { type: Number, required: true, default: 0 },
    sizes:       { type: [Number], required: true }, // سایزهای موجود
    colors:      { type: [String], required: true }, // رنگ‌های موجود
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
