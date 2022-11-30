import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import carReducer from "../features/car/carSlice";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import serviceReducer from "../features/service/serviceSlice";
import itemReducer from "../features/item/itemSlice";
import carForSellReducer from "../features/carForSell/carForSellSlice";
import orderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    car: carReducer,
    appointment: appointmentReducer,
    service: serviceReducer,
    item: itemReducer,
    carForSell: carForSellReducer,
    order: orderReducer,
  },
});

export default store;
