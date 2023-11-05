const express = require("express");
const categoryRouter = express.Router();
const {
  addCategory,
  updateCategory,
  getAllCategories,
  getCateogoryById,
  activateOrDeActivateCategoryById,
} = require("../controllers/categories");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

categoryRouter.post(
  "/",
  authentication,
  authorization("add_category"),
  addCategory
);

categoryRouter.put(
  "/:id",
  authentication,
  authorization("edit_category"),
  updateCategory
);

categoryRouter.get("/", getAllCategories);

categoryRouter.get(
  "/:id",
  authentication,
  authorization("get_category"),
  getCateogoryById
);

categoryRouter.delete(
  "/:id/:isDeleted",
  authentication,
  authorization("delete_category"),
  activateOrDeActivateCategoryById
);

module.exports = categoryRouter;
