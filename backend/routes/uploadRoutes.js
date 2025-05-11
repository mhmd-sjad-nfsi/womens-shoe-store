import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // اضافه کردن timestamp برای جلوگیری از تکراری بودن نام فایل
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// تنها اجازه فایل‌های تصویری
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('فرمت مجاز: jpg, jpeg, png'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  '/',
  upload.single('image'),
  (req, res) => {
    // آدرس فایل در فولدر uploads
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  }
);

export default router;
