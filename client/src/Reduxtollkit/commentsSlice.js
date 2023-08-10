import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener comments del servidor
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await axios.get("http://localhost:3002/comments");
    return response.data;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: { commentsList: [], status: "idle", error: null },
  reducers: {
    // Reducer para agregar un nuevo comment
    addComment: (state, action) => {
      state.commentsList.push(action.payload);
    },
  },
  extraReducers: {
    // Reducer para obtener los comments del servidor
    [fetchComments.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.commentsList = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectComments = (state) => state.comments.commentsList;
export const selectCommentsStatus = (state) => state.comments.status;
