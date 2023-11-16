import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};
const Api="http://localhost:3000";
const getToken = () => {
    return localStorage.getItem('token');
  };
export const addComment = createAsyncThunk("comment/addComment", async (comment, thunkAPI) => {
  try {
   
    const response = await axios.post(`${Api}/comments/add`,comment, {
        headers: {
          'Authorization': `${getToken()}`,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default commentSlice.reducer;

