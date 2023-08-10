import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener users del servidor
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3002/users");
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: { usersList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo user
    addUser: (state, action) => {
      state.usersList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los users del servidor
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.usersList = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
export const selectUsers = (state) => state.users.usersList;
export const selectUsersStatus = (state) => state.users.status;
