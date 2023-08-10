import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener airlines del servidor
export const fetchAirlines = createAsyncThunk(
  "airlines/fetchAirlines",
  async () => {
    const response = await axios.get("http://localhost:3002/airlines");
    return response.data;
  }
);

export const airlinesSlice = createSlice({
  name: "airlines",
  initialState: { airlinesList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo airline
    addAirline: (state, action) => {
      state.airlinesList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los airlines del servidor
    [fetchAirlines.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAirlines.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.airlinesList = action.payload;
    },
    [fetchAirlines.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addAirline } = airlinesSlice.actions;

export default airlinesSlice.reducer;

export const selectAirlines = (state) => state.airlines.airlinesList;
export const selectAirlinesStatus = (state) => state.airlines.status;
