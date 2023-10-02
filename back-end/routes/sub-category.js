const express = require("express");
const subCategoryRouter = express.Router();
const {
  addSubCategory,
  updateSubCategory,
  getAllSubCategoriesOnCategory,
  getSubCateogoryById,
  deleteSub_CategoryById,
  getAllSubCategories,
} = require("../controllers/sub-category");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

subCategoryRouter.post(
  "/",
  authentication,
  authorization("CATEGORY_CONTROL"),
  addSubCategory
);

subCategoryRouter.put(
  "/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  updateSubCategory
);

subCategoryRouter.get("/", getAllSubCategories);

subCategoryRouter.get("/:categoryId", getAllSubCategoriesOnCategory);

subCategoryRouter.get(
  "/category/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  getSubCateogoryById
);

subCategoryRouter.delete(
  "/delete/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  deleteSub_CategoryById
);
module.exports = subCategoryRouter;
