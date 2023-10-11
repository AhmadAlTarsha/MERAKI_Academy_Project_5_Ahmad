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
  getAllServicesByUser,
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

servericesRouter.get(
  "/services/:providerId",
  authentication,
  authorization("SERVICE_CONTROL"),
  getAllServicesByUser
);

servericesRouter.get("/", getAllServices);

servericesRouter.get(
  "/:id",
  authentication,
  authorization("SERVICE_CONTROL"),
  getServiceOnId
);

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
