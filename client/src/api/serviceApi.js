import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async () => {
    const response = await axios.get(`${config.Backend_URL}service`);
    return response.data.data;
  }
);

export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (serviceId) => {
    const response = await axios.get(
      `${config.Backend_URL}service/${serviceId}`
    );
    return response.data.data;
  }
);

export const addService = async (serviceDetails) => {
  const response = await axios.post(
    `${config.Backend_URL}service/add`,
    serviceDetails
  );
  return response.data;
};

export const updateService = async (serviceDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}service/update`,
    serviceDetails
  );
  return response.data;
};

export const deleteService = async (serviceId) => {
  const response = await axios.delete(
    `${config.Backend_URL}service/delete/${serviceId}`
  );
  return response.data;
};
