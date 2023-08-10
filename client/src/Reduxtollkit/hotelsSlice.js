import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener hotels del servidor
export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  const response = await axios.get("http://localhost:3002/hotels");
  return response.data;
});

export const hotelsSlice = createSlice({
  name: "hotels",
  initialState: { hotelsList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo hotel
    addHotel: (state, action) => {
      state.hotelsList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los hotels del servidor
    [fetchHotels.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHotels.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.hotelsList = action.payload;
    },
    [fetchHotels.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addHotel } = hotelsSlice.actions;

export default hotelsSlice.reducer;

export const selectHotels = (state) => state.hotels.hotelsList;
export const selectHotelsStatus = (state) => state.hotels.status;
