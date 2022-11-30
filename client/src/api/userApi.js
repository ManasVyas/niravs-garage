import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const users = await axios.get(`${config.Backend_URL}user`);
    return users.data.data;
  } catch (error) {
    return error;
  }
});

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${config.Backend_URL}user/update`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateUser = async (userDetails) => {
  const response = await axios.put(
    `${config.Backend_URL}user/update`,
    userDetails
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(
    `${config.Backend_URL}user/delete/${userId}`
  );
  return response.data;
};
