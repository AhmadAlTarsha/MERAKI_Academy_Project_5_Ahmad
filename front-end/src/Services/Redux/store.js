import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import postReducer from "./Posts/index";
import serviceReducer from "./Services/index";
import categoriesReducer from "./Category/index";

import regionsReducer from "./regions/regions";

import subCategoriesReducer from "./Sub_Categories/index";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    services: serviceReducer,
    categories: categoriesReducer,
    regions: regionsReducer,
    subCategories: subCategoriesReducer,
  },
});
