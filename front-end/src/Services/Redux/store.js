import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
// import postReducer from "./Posts/index";
import serviceReducer from "./Services/index";

export default configureStore({
  reducer: {
    auth: authReducer,
    // posts: postReducer,
    services: serviceReducer,
  },
});
