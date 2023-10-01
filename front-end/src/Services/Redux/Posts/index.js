import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: {},
  },
  reducers: {
    setPosts: (state, action) => {
      console.log("POSTS PAYLOAD ===> ", action.payload);
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      console.log("POST PAYLOAD ===> ", action.payload);
      state.post = action.payload;
    },
  },
});

export const { setPosts, setPost } = postSlice.actions;
export default postSlice.reducer;
