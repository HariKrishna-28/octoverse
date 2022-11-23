import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export const selectToken = (state: any) => state.authToken.token;

export default authSlice.reducer;
