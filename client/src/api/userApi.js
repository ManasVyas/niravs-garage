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
