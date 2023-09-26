const express = require("express");
const servericesRouter = express.Router();
const {
  addService,
  updateService,
  getAllServicesOnCategory,
  getAllServicesOnSubCategory,
  getServiceOnId,
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
  getServiceOnId
);

servericesRouter.get("/category/:categoryId", getAllServicesOnCategory);

servericesRouter.get(
  "/subcategory/:subCategoryId",
  getAllServicesOnSubCategory
);

module.exports = servericesRouter;
