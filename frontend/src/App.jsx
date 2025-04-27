import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Layout from "./components/Layout";
import CartScreen from "./screens/CartScreen";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />

      </Route>
    </Routes>
  );
}

export default App;
