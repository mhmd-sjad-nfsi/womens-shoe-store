import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      res.status(401);
      throw new Error('توکن نامعتبر است');
    }
  }
  res.status(401);
  throw new Error('توکن را ارسال کنید');
};

export { protect };

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403);
  throw new Error('دسترسی ادمین لازم است');
};
