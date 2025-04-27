import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ساخت Schema برای یوزر
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ایمیل باید یکتا باشه
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // به طور پیش‌فرض یوزرها ادمین نیستند
    },
  },
  {
    timestamps: true, // زمان ساخت و آخرین آپدیت
  }
);

// هش کردن پسورد قبل از ذخیره در دیتابیس
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  
  // اگر پسورد تغییر کرده، پسورد رو هش می‌کنیم
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// متد برای چک کردن پسورد
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ساخت مدل یوزر
const User = mongoose.model('User', userSchema);

export default User;
