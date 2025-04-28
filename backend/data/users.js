import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'ادمین',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'کاربر عادی',
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10),
    isAdmin: false,
  },
];

export default users;
