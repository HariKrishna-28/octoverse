import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    defaultThemePreference: themeReducer,
    userStatus: authReducer,
  },
});
