import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: [],
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.address.push(action.payload);
      return state;
    },
    removeAddress: (state, action) => {
      state.address.splice(action.payload, 1);
      return state;
    },
  },
});

export const { addAddress, removeAddress } = addressSlice.actions;

export default addressSlice.reducer;
