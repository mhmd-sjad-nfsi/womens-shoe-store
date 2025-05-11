import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts) // GET /api/products
  .post(protect, admin, createProduct); // POST /api/products (ادمین)

router
  .route("/:id")
  .get(getProductById) // GET /api/products/:id
  .put(protect, admin, updateProduct) // PUT /api/products/:id (ادمین)
  .delete(protect, admin, deleteProduct); // DELETE /api/products/:id (ادمین)
// حذف نظر توسط ادمین
router.delete("/:id/reviews/:reviewId", protect, admin, deleteReview);

router.route("/:id/reviews").post(protect, createProductReview);

router.route("/:id/reviews/:reviewId").delete(protect, admin, deleteReview);
export default router;
