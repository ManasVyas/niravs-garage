import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  getAppointmentsByUserId,
} from "../../api/appointmentApi";

const initialState = {
  loading: false,
  appointments: [],
  error: ``,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.error = "";
    });
    builder.addCase(getAllAppointments.rejected, (state, action) => {
      state.loading = false;
      state.appointments = [];
      state.error = action.error.message;
    });
    builder.addCase(getAppointmentsByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointmentsByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.error = "";
    });
    builder.addCase(getAppointmentsByUserId.rejected, (state, action) => {
      state.loading = false;
      state.appointments = [];
      state.error = action.error.message;
    });
  },
});

export default appointmentSlice.reducer;