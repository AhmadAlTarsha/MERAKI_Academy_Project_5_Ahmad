const express = require("express");
const servericesRouter = express.Router();
const {
  addService,
  updateService,
  getAllServicesOnCategory,
  getAllServicesOnSubCategory,
  getServiceOnId,
  getAllServices,
  updateServiceStatus,
  deleteService,
} = require("../controllers/services");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

servericesRouter.post(
  "/",
  authentication,
  authorization("SERVICE_CONTROL"),
  addService
);

servericesRouter.put(
  "/:id",
  authentication,
  authorization("SERVICE_CONTROL"),
  updateService
);

servericesRouter.put(
  "/status/:id",
  authentication,
  authorization("SERVICE_CONTROL"),
  updateServiceStatus
);

servericesRouter.get("/", getAllServices);

servericesRouter.get("/:id", getServiceOnId);

servericesRouter.get("/category/:categoryId", getAllServicesOnCategory);

servericesRouter.get(
  "/subcategory/:subCategoryId",
  getAllServicesOnSubCategory
);

servericesRouter.delete(
  "/delete/:id",
  authentication,
  authorization("SERVICE_CONTROL"),
  deleteService
);

module.exports = servericesRouter;
