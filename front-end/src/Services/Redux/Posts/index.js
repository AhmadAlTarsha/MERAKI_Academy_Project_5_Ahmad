import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPostsByUserId } from "../../APIS/Posts/GetAllPosts";

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

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
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
