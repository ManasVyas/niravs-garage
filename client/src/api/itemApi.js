import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const getAllItems = createAsyncThunk("item/getAllItems", async () => {
  try {
    const items = await axios.get(`${config.Backend_URL}item`);
    return items.data.data;
  } catch (error) {
    return error;
  }
});

export const getItemById = async (itemId) => {
  try {
    const response = await axios.get(`${config.Backend_URL}item/${itemId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const createItem = async (itemDetails) => {
  const response = await axios.post(
    `${config.Backend_URL}item/add`,
    itemDetails
  );
  return response.data;
};

export const updateItem = async (itemDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}item/update`,
    itemDetails
  );
  return response.data;
};

export const deleteItem = async (itemId) => {
  const response = await axios.delete(
    `${config.Backend_URL}item/delete/${itemId}`
  );
  return response.data;
};
