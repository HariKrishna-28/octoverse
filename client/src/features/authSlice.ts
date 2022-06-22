import { createSlice } from "@reduxjs/toolkit";

// const user = {
//   _id: "629f7ac1de8cb5eec75f0e2e",
//   userName: "hario",
//   email: "harioo@gmail.com",
//   profilePicture: "",
//   coverPicture: "",
//   followers: ["629f7acade8cb5eec75f0e30", "62a9e37f2eab78bf004a947b"],
//   following: ["629f7acade8cb5eec75f0e30"],
//   isAdmin: false,
//   description: "this is my description",
//   city: "",
//   from: "",
//   createdAt: "2022-06-07T16:20:17.543Z",
//   __v: 0,
// };

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
