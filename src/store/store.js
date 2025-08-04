import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../feature/cart/cartSlice';
import { shopApi } from '../services/shop/shopApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});