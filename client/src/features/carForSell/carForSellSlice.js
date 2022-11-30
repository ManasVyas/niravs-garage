import { createSlice } from "@reduxjs/toolkit";
import { getAllCarsForSell } from "../../api/carForSellApi";

const initialState = {
  loading: false,
  cars: [],
  error: ``,
};

const carForSellSlice = createSlice({
  name: "carForSell",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCarsForSell.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCarsForSell.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      state.error = "";
    });
    builder.addCase(getAllCarsForSell.rejected, (state, action) => {
      state.loading = false;
      state.cars = [];
      state.error = action.error.message;
    });
  },
});

export default carForSellSlice.reducer;
