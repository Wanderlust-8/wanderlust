import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener activitys del servidor
export const fetchActivitys = createAsyncThunk(
  "activitys/fetchActivitys",
  async () => {
    const response = await axios.get("http://localhost:3002/activity");
    return response.data;
  }
);

export const activitysSlice = createSlice({
  name: "activitys",
  initialState: { activitysList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar una nueva activity
    addActivity: (state, action) => {
      state.activitysList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los activitys del servidor
    [fetchActivitys.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchActivitys.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.activitysList = action.payload;
    },
    [fetchActivitys.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addActivity } = activitysSlice.actions;

export default activitysSlice.reducer;

export const selectActivitys = (state) => state.activitys.activitysList;
export const selectActivitysStatus = (state) => state.activitys.status;
