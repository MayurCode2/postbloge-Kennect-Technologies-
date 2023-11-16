import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addComment } from "./commentSlice";

const Api="http://localhost:3000";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const getToken = () => {
    return localStorage.getItem('token');
  };

  export const createPost = createAsyncThunk("post/createPost", async (post, thunkAPI) => {
    try {
      const response = await axios.post(`${Api}/posts/create`, post, {
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
export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${Api}/posts/all`, {
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

  export const searchPostsAndComments = createAsyncThunk("post/searchPostsAndComments", async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${Api}/posts/search/${query}`, {
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

  const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createPost.pending, (state) => {
          state.loading = true;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.loading = false;
          state.posts.unshift(action.payload.post);
        })
        // Add a case to handle comments for a specific post
        .addCase(addComment.fulfilled, (state, action) => {
          const { postId, comment } = action.payload;
          const post = state.posts.find((p) => p._id === postId);
          if (post) {
            post.comments.unshift(comment);
          }
        })
        .addCase(createPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(getAllPosts.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload.posts;
        })
        .addCase(getAllPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(searchPostsAndComments.pending, (state) => {
          state.loading = true;
        })
        .addCase(searchPostsAndComments.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload.posts;
        })
        .addCase(searchPostsAndComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        });
    },
  });

export default postSlice.reducer;

