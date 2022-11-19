import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const getToken = (state: any) => state.authToken.token;

export default tokenSlice.reducer;
