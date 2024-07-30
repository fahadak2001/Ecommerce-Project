// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/features/productSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
