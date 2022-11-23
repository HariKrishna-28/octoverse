import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import tokenReducer from "../features/tokenSlice";

export const store = configureStore({
  reducer: {
    defaultThemePreference: themeReducer,
    userStatus: authReducer,
    authToken: tokenReducer,
  },
});
