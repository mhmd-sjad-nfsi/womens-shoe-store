// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Layout from "./components/Layout";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminOrdersScreen from "./screens/admin/AdminOrdersScreen";
import AdminProductsScreen from './screens/admin/AdminProductsScreen';
import AdminProductEditScreen from './screens/admin/AdminProductEditScreen';



function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="cart" element={<CartScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="checkout" element={<CheckoutScreen />} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="admin/orders" element={<AdminOrdersScreen />} />
        <Route path="admin/products" element={<AdminProductsScreen />} />
+       <Route path="admin/product/:id/edit" element={<AdminProductEditScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
