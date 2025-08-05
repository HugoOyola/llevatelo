import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import cartReducer from '../feature/cart/cartSlice';
import { shopApi } from '../services/shop/shopApi';
import { authApi } from "../services/auth/authApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
});