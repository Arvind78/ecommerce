import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isSuccess: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
      return;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
      return;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isSuccess = false;
      return;
    },
    logout: (state) => {
      state.currentUser = null;
      return;
    },
  },
});
export const { loginSuccess, updateUser, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
