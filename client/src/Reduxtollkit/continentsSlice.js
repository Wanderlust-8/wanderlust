import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener continents del servidor
export const fetchContinents = createAsyncThunk(
  "continents/fetchContinents",
  async () => {
    const response = await axios.get("http://localhost:3002/continents");
    return response.data;
  }
);

export const continentsSlice = createSlice({
  name: "continents",
  initialState: { continentsList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo continent
    addContinent: (state, action) => {
      state.continentsList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los continents del servidor
    [fetchContinents.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchContinents.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.continentsList = action.payload;
    },
    [fetchContinents.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addContinent } = continentsSlice.actions;

export default continentsSlice.reducer;
export const selectContinents = (state) => state.continents.continentsList;
export const selectContinentsStatus = (state) => state.continents.status;
