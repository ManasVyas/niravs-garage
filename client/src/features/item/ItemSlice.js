import { createSlice } from "@reduxjs/toolkit";
import { getAllItems } from "../../api/itemApi";

const initialState = {
  loading: false,
  items: [],
  error: ``,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(getAllItems.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export default itemSlice.reducer;
