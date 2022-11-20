import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import carReducer from "../features/car/carSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    car: carReducer,
  },
});

export default store;
