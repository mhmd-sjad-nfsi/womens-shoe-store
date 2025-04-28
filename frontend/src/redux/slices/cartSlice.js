// frontend/src/redux/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // هر آیتم شامل: {_id, name, image, price, size, qty, ...}
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // اضافه کردن به سبد خرید با در نظر گرفتن سایز
    addToCart: (state, action) => {
      const item = action.payload;
      // تطبیق بر اساس آیدی محصول و سایز
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.size === item.size
      );

      if (existItem) {
        // اگر همان محصول و سایز قبلاً وجود داشت، جایگزینش کن
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.size === existItem.size
            ? item
            : x
        );
      } else {
        // در غیر این صورت، آیتم جدید را اضافه کن
        state.cartItems.push(item);
      }
    },

    // حذف آیتم از سبد خرید بر اساس آیدی و سایز
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => !(x._id === id && x.size === size)
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
