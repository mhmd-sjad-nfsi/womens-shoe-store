// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
