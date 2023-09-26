const express = require("express");
const categoryRouter = express.Router();
const {
  addCategory,
  updateCategory,
  getAllCategories,
  getCateogoryById,
  activateOrDeActivateCategoryById
} = require("../controllers/categories");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

categoryRouter.post(
  "/",
  authentication,
  authorization("CATEGORY_CONTROL"),
  addCategory
);

categoryRouter.put(
  "/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  updateCategory
);

categoryRouter.get(
  "/",
  getAllCategories
);

categoryRouter.get(
  "/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  getCateogoryById
);

categoryRouter.delete(
  "/active/:id",
  authentication,
  authorization("CATEGORY_CONTROL"),
  activateOrDeActivateCategoryById
);

module.exports = categoryRouter;
