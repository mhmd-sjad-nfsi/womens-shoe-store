import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice"; // اضافه کن

const store = configureStore({
  reducer: {
    cart: cartReducer, // اضافه کن
  },
});
export default store;
