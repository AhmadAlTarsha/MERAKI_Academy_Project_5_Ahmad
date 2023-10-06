import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    comments: {},
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
