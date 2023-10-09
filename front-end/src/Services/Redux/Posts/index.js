import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPost, GetPostsByUserId } from "../../APIS/Posts/GetAllPosts";

export const getAllPostsByUser = createAsyncThunk(
  "user/posts",
  async (payload) => {
    return await GetPostsByUserId(
      payload.limit,
      payload.offset,
      payload.active
    );
  }
);

export const getPostById = createAsyncThunk("post", async (payload) => {
  return await GetPost(payload.id);
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    postId: {},
    comments: {},
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsByUser.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getAllPostsByUser.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
        state.post = action.payload;
      })
      .addCase(getAllPostsByUser.rejected, (state, action) => {
        console.log("REDUX POSTS ERROR ===> ", action);
        state.errorMessage = {
          error: true,
          message: "Something went wrong",
        };
      });

    builder
      .addCase(getPostById.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.postId = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });
  },
  reducers: {
    setPosts: (state, action) => {
      state.post = action.payload;
    },
    setComments: (state, action) => {
      state.comments = JSON.parse(JSON.stringify(action.payload));
    },
  },
});

export const { setPosts, setComments } = postSlice.actions;
export default postSlice.reducer;