import jwt from 'jsonwebtoken';

// ساخت توکن JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // اعتبار توکن ۳۰ روزه است
  });
};

export default generateToken;
