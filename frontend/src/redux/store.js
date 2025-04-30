import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice"; // اضافه کن
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    orderCreate: orderReducer,
    ui: uiReducer,

  },
});

export default store;
