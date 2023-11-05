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
  activateOrDeActivateServiceById,
  getAllServicesByUser,
} = require("../controllers/services");

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

servericesRouter.post(
  "/",
  authentication,
  authorization("add_service"),
  addService
);

servericesRouter.put(
  "/:id",
  authentication,
  authorization("edit_service"),
  updateService
);

servericesRouter.put(
  "/:id/:status",
  authentication,
  authorization("update_service_status"),
  updateServiceStatus
);

servericesRouter.get(
  "/provider/:provider_id",
  authentication,
  authorization("get_service"),
  getAllServicesByUser
);

servericesRouter.get("/", getAllServices);

servericesRouter.get(
  "/:id",
  authentication,
  authorization("get_service"),
  getServiceOnId
);

servericesRouter.get("/category/:category_id", getAllServicesOnCategory);

servericesRouter.get(
  "/subcategory/:sub_category_id",
  getAllServicesOnSubCategory
);

servericesRouter.delete(
  "/delete/:id/:is_deleted",
  authentication,
  authorization("delete_service"),
  activateOrDeActivateServiceById
);

module.exports = servericesRouter;
