import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "./config.json";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userDetails) => {
    const response = await axios.post(
      `${config.Backend_URL}auth/register`,
      userDetails
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userDetails) => {
    const response = await axios.post(
      `${config.Backend_URL}auth/login`,
      userDetails
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", () => {});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userDetails) => {
    const response = await axios.put(
      `${config.Backend_URL}user/update`,
      userDetails
    );
    return response.data;
  }
);