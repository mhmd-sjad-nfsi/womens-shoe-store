import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // توکن JWT از هدر Authorization
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // بررسی توکن

      req.user = await User.findById(decoded.id).select('-password'); // پیدا کردن یوزر با id توکن
      next(); // ادامه اجرا
    } catch (error) {
      res.status(401);
      throw new Error('توکن نامعتبر است');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('توکن را ارسال کنید');
  }
};

export { protect };
