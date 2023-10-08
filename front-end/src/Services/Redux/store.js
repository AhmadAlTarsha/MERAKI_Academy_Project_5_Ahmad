import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index";
import postReducer from "./Posts/index";
import serviceReducer from "./Services/index";
import categoriesReducer from "./Category/index";
import roleReducer from "./roles/roles";
import regionsReducer from "./regions/regions";
import ordersReducer from "./Orders/index";
import subCategoriesReducer from "./Sub_Categories/index";
import chatsReducer from "./Chats/index";

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    services: serviceReducer,
    categories: categoriesReducer,
    roles: roleReducer,
    regions: regionsReducer,
    subCategories: subCategoriesReducer,
    orders: ordersReducer,
    chats: chatsReducer,
  },
});
