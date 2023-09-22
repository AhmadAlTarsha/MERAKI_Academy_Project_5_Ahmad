const express = require("express");
const servericesRouter = express.Router();
const {
  addService,
  updateService,
  getAllServicesOnCategory,
  getAllServicesOnSubCategory,
  getAllServicesOnId,
} = require("../controllers/services");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

servericesRouter.post(
  "/",
  authentication,
  authorization("SERVICE-CONTROL"),
  addService
);

servericesRouter.put(
  "/:id",
  authentication,
  authorization("SERVICE-CONTROL"),
  updateService
);

servericesRouter.get(
  "/:id",
  authentication,
  authorization("SERVICE-CONTROL"),
  getAllServicesOnId
);

servericesRouter.get(
  "/category/:categoryId",
  authentication,
  authorization("SERVICE-CONTROL"),
  getAllServicesOnCategory
);

servericesRouter.get(
  "/subcategory/:subCategoryId",
  authentication,
  authorization("SERVICE-CONTROL"),
  getAllServicesOnSubCategory
);

module.exports = servericesRouter;
