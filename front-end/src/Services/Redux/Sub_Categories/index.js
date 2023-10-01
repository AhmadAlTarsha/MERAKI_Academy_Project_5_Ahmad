import { createSlice } from "@reduxjs/toolkit";
// import { AddCategory } from "../../APIS/Category/Add_Category";

export const subCategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subCategories: [],
    subCategory: {},
  },
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    // addCategory: (state, action) => {
    //   console.log("Category PAYLOAD ===> ", action.payload);
    //   AddCategory(action.payload)
    //     .then((result) => {
    //       console.log("CATEGORY RESULT ====> ", result);
    //     })
    //     .catch((err) => {
    //       console.log("CATEGORY ERROR ====> ", err);
    //     });
    // },
  },
});

export const { setSubCategories, setSubCategory } =
  subCategorySlice.actions;
export default subCategorySlice.reducer;
