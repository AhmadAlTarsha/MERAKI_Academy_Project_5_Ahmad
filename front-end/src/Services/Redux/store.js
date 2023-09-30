import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
// import postReducer from "./Posts/index";
import serviceReducer from "./Services/index";
import categoriesReducer from "./Category/index";

export default configureStore({
  reducer: {
    auth: authReducer,
    // posts: postReducer,
    services: serviceReducer,
    categories: categoriesReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: ["TYPE"],
  //       ignoredActionPaths: ["property"],
  //       ignoredPaths: ["reducer.property"],
  //     },
  //   }),
});
