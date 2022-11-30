import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async () => {
    const response = await axios.get(`${config.Backend_URL}appointment`);
    return response.data.data;
  }
);

export const getAppointmentsByUserId = createAsyncThunk(
  "appointment/getAppointmentsByUserId",
  async (userId) => {
    const response = await axios.get(
      `${config.Backend_URL}appointment/user/${userId}`
    );
    return response.data.data;
  }
);

export const createAppointment = async (appointmentDetails) => {
  try {
    const response = await axios.post(
      `${config.Backend_URL}appointment/add`,
      appointmentDetails
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateAppointment = async (appointmentDetails) => {
  try {
    const response = await axios.put(
      `${config.Backend_URL}appointment/update`,
      appointmentDetails
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};