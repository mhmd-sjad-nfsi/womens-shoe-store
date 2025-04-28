import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    image:       { type: String, required: true },
    description: { type: String, required: true },
    brand:       { type: String, required: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true },
    sizes:       { type: [Number], required: true }, 
    stock: [
      {
        size:  { type: Number, required: true },
        count: { type: Number, required: true, default: 0 },
      },
    ],
    rating:      { type: Number, required: true, default: 0 },
    numReviews:  { type: Number, required: true, default: 0 },
    colors:      { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
