import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isFetching: false,
  error: { message: "" },
};

export const authSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.user = action.payload.user;
      state.isFetching = action.payload.isFetching;
      state.error = action.payload.error;
    },
  },
});

export const { setUserStatus } = authSlice.actions;
export const getUserData = (state: any) => {
  const data = {
    user: state.userStatus.user,
    isFetching: state.userStatus.isFetching,
    error: state.userStatus.error,
  };
  return data;
};
// export const selectFetching = (state: any) => state.userStatus.isFetching;
// export const selectError = (state: any) => state.userStatus.error;

export default authSlice.reducer;
