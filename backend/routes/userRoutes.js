import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);

router
  .route('/')
  .get(protect, admin, getUsers);           // GET /api/users       => لیست همه کاربران

router
  .route('/:id')
  .delete(protect, admin, deleteUser)       // DELETE /api/users/:id
  .get(protect, admin, getUserById)         // GET    /api/users/:id
  .put(protect, admin, updateUser);         // PUT    /api/users/:id

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
