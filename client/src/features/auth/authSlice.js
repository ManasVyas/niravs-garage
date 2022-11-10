import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "../../api/authApi";

const initialState = {
  loading: false,
  loggedInUser: {},
  error: ``,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload.user;
      state.error = "";
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = action.error;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload.user;
      state.error = "";
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = action.error;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.error = "";
      localStorage.removeItem("token");
    });
  },
});

export default authSlice.reducer;
