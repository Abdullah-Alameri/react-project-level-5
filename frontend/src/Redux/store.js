import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneproductsApi, productsApi } from "./productsAPI";
import counterReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductsApi.reducerPath]: oneproductsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneproductsApi.middleware),
});

setupListeners(store.dispatch);
