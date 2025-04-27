import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // آرایه محصولات سبد خرید
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        // اگر این محصول قبلا تو سبد بود، جایگزین کن
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        // اگر نبود اضافه کن
        state.cartItems.push(item);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
