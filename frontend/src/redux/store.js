import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice"; // اضافه کن

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,           // اضافه شد
  },
});

export default store;
