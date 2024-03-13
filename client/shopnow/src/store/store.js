import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import wishlistProduct from './wishlistSlice';
import addressSlice from './addressSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  shippingAddress: addressSlice,
  wishlistProduct: wishlistProduct,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
