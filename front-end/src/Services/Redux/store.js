import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import postReducer from "./posts/index";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
