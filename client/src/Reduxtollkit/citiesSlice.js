import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener cities del servidor
export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await axios.get("http://localhost:3002/cities");
  return response.data;
});

export const citiesSlice = createSlice({
  name: "cities",
  initialState: { citiesList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar una nueva city
    addCity: (state, action) => {
      state.citiesList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los cities del servidor
    [fetchCities.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCities.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.citiesList = action.payload;
    },
    [fetchCities.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addCity } = citiesSlice.actions;

export default citiesSlice.reducer;

export const selectCities = (state) => state.cities.citiesList;
export const selectCitiesStatus = (state) => state.cities.status;
