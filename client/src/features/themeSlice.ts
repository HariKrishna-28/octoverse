import { createSlice } from "@reduxjs/toolkit";

function userThemePreference() {
  const theme = window.matchMedia("(prefers-color-scheme: dark");
  if (theme.matches) {
    return true;
  } else {
    return false;
  }
}

const initialState = {
  darkTheme: userThemePreference(),
};

export const themeSlice = createSlice({
  name: "defaultThemePreference",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.darkTheme = action.payload.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: any) =>
  state.defaultThemePreference.darkTheme;

export default themeSlice.reducer;
