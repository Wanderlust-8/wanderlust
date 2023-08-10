import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener countries del servidor
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get("http://localhost:3002/countries");
    return response.data;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState: { countriesList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo country
    addCountry: (state, action) => {
      state.countriesList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los countries del servidor
    [fetchCountries.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.countriesList = action.payload;
    },
    [fetchCountries.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
export const selectCountries = (state) => state.countries.countriesList;
export const selectCountriesStatus = (state) => state.countries.status;
