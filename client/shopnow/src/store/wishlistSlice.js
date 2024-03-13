import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const wishlistProduct = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // if (state.products.find(product => product._id !== action.payload._id)) {
      state.products.push(action.payload);

      // }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      return state;
    },
  },
});

export const { addProduct, removeProduct } = wishlistProduct.actions;
export default wishlistProduct.reducer;
