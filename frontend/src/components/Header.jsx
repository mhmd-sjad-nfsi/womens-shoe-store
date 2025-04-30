// frontend/src/components/Header.jsx

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  AdminPanelSettings,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { toggleMode } from '../redux/slices/uiSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.ui.mode);
  const isDark = mode === 'dark';

  // منوی کاربر
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // منوی ادمین
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const handleOpenAdminMenu = (e) => setAnchorElAdmin(e.currentTarget);
  const handleCloseAdminMenu = () => setAnchorElAdmin(null);

  const logoutHandler = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* عنوان سایت */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          فروشگاه کفش زنانه
        </Typography>

        {/* سوییچ تم */}
        <IconButton
          onClick={() => dispatch(toggleMode())}
          color="inherit"
          sx={{ mr: 1 }}
        >
          {isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* آیکون سبد خرید */}
        <IconButton
          component={RouterLink}
          to="/cart"
          size="large"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {userInfo ? (
          <>
            {/* منوی ادمین */}
            {userInfo.isAdmin && (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenAdminMenu}
                >
                  <AdminPanelSettings />
                </IconButton>
                <Menu
                  anchorEl={anchorElAdmin}
                  open={Boolean(anchorElAdmin)}
                  onClose={handleCloseAdminMenu}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/admin/products"
                    onClick={handleCloseAdminMenu}
                  >
                    مدیریت محصولات
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/admin/orders"
                    onClick={handleCloseAdminMenu}
                  >
                    مدیریت سفارش‌ها
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/admin/users"
                    onClick={handleCloseAdminMenu}
                  >
                    مدیریت کاربران
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* منوی کاربر */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenUserMenu}
              sx={{ ml: 1 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={RouterLink}
                to="/profile"
                onClick={handleCloseUserMenu}
              >
                پروفایل
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/orders"
                onClick={handleCloseUserMenu}
              >
                سفارش‌های من
              </MenuItem>
              <MenuItem onClick={logoutHandler}>خروج</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ textTransform: 'none', mr: 1 }}
            >
              ورود
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/register"
              sx={{ textTransform: 'none' }}
            >
              ثبت‌نام
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
