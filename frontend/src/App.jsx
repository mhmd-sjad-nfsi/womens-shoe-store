import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import CheckoutScreen from "./screens/CheckoutScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import MyOrdersScreen from "./screens/MyOrdersScreen.jsx";

// Admin
import AdminOrdersScreen from "./screens/admin/AdminOrdersScreen.jsx";
import AdminProductsScreen from "./screens/admin/AdminProductsScreen.jsx";
import AdminProductEditScreen from "./screens/admin/AdminProductEditScreen.jsx";
import AdminUsersScreen from "./screens/admin/AdminUsersScreen.jsx";
import AdminUserEditScreen from "./screens/admin/AdminUserEditScreen.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* صفحات عمومی */}
        <Route index element={<HomeScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="cart" element={<CartScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="orders" element={<MyOrdersScreen />} />

        {/* فرایند سفارش */}
        <Route path="checkout" element={<CheckoutScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />

        {/* پنل ادمین */}
        <Route path="admin/orders" element={<AdminOrdersScreen />} />
        <Route path="admin/products" element={<AdminProductsScreen />} />
        <Route path="admin/product/:id/edit" element={<AdminProductEditScreen />} />
        <Route path="admin/users" element={<AdminUsersScreen />} />
        <Route path="admin/user/:id/edit" element={<AdminUserEditScreen />} />

        {/* مسیر پیش‌فرض برای 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
