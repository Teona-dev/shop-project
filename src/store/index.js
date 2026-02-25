import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import cartReducer, { cartPersistMiddleware } from './cartSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  middleware: (getDefault) => getDefault().concat(cartPersistMiddleware),
});
