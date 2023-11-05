const express = require("express");
const subCategoryRouter = express.Router();
const {
  addSubCategory,
  updateSubCategory,
  getAllSubCategoriesOnCategory,
  getSubCateogoryById,
  getAllSubCategories,
  activateOrDeActivateSubCategoryById,
} = require("../controllers/sub-category");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

subCategoryRouter.post(
  "/",
  authentication,
  authorization("add_category"),
  addSubCategory
);

subCategoryRouter.put(
  "/:id",
  authentication,
  authorization("edit_category"),
  updateSubCategory
);

subCategoryRouter.get("/", getAllSubCategories);

subCategoryRouter.get("/category/", getAllSubCategoriesOnCategory);

subCategoryRouter.get(
  "/:id",
  authentication,
  authorization("get_category"),
  getSubCateogoryById
);

subCategoryRouter.delete(
  "/:id/:isDeleted",
  authentication,
  authorization("delete_category"),
  activateOrDeActivateSubCategoryById
);
module.exports = subCategoryRouter;
