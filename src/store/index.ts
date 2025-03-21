import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "./conversionSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    conversion: conversionReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
