import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // هر آیتم: { _id, name, image, price, countInStock, qty }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(x => x._id === item._id);

      if (exist) {
        // اگر وجود دارد، فقط تعداد را به‌روزرسانی کن
        state.cartItems = state.cartItems.map(x =>
          x._id === exist._id ? { ...x, qty: item.qty } : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
