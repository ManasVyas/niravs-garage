import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const getCarsByUserId = createAsyncThunk(
  "car/getCarsByUserId",
  async (userId) => {
    const response = await axios.get(`${config.Backend_URL}car/user/${userId}`);
    return response.data.data;
  }
);

export const addCar = createAsyncThunk("car/addCar", async (carDetails) => {
  const response = await axios.post(`${config.Backend_URL}car/add`, carDetails);
  return response.data;
});

export const updateCar = createAsyncThunk(
  "car/updateCar",
  async (carDetails) => {
    const response = await axios.put(
      `${config.Backend_URL}car/update`,
      carDetails
    );
    return response.data;
  }
);

export const deleteCar = createAsyncThunk("car/deleteCar", async (carId) => {
  const response = await axios.delete(
    `${config.Backend_URL}car/delete/${carId}`
  );
  return response.data.data;
});
