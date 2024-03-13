import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItemIndex = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex === -1) {
        // If item doesn't exist in cart, add it with quantity 1
        state.carts.push({ ...action.payload, quantity: 1 });
      } else {
        // If item exists, increment its quantity
        state.carts[existingItemIndex].quantity += 1;
      }
    },

    removeItemFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.carts = state.carts.filter((item) => item._id !== itemToRemove);
      return state;
    },
    increaseItemQuantity: (state, action) => {
      state.carts.findIndex((item) => {
        if (item._id === action.payload._id) {
          item.quantity++;
        }
      });
      return state;
    },
    decreaseItemQuantity: (state, action) => {
      state.carts.findIndex((item) => {
        if (item._id === action.payload._id) {
          item.quantity > 1 ? item.quantity-- : (item.quantity = 1);
        }
      });
      return state;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
