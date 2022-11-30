import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const getAllCarsForSell = createAsyncThunk(
  "carForSell/getAllCarsForSell",
  async () => {
    try {
      const carForSell = await axios.get(`${config.Backend_URL}car-for-sell`);
      return carForSell.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCarForSellById = async (carId) => {
  try {
    const response = await axios.get(
      `${config.Backend_URL}car-for-sell/${carId}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const createCarForSell = async (carDetails) => {
  const response = await axios.post(
    `${config.Backend_URL}car-for-sell/add`,
    carDetails
  );
  return response.data;
};

export const updateCarForSell = async (carDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}car-for-sell/update`,
    carDetails
  );
  return response.data;
};

export const deleteCarForSell = async (carId) => {
  const response = await axios.delete(
    `${config.Backend_URL}car-for-sell/delete/${carId}`
  );
  return response.data;
};
