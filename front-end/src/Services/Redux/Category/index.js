import { createSlice } from "@reduxjs/toolkit";
import { AddCategory } from "../../APIS/Category/Add_Category";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      console.log("Category PAYLOAD ===> ", action.payload);
      state.category = action.payload;
    },
    addCategory: (state, action) => {
    //   console.log("Category PAYLOAD ===> ", action.payload);
    //   AddCategory(action.payload)
    //     .then((result) => {
    //       console.log("CATEGORY RESULT ====> ", result);
    //     })
    //     .catch((err) => {
    //       console.log("CATEGORY ERROR ====> ", err);
    //     });
    },
  },
});

export const { setCategories, setCategory, addCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
