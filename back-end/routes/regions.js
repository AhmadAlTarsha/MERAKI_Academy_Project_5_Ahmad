const express = require("express");
const {
  getAllRegions,
  addNewRegions,
  deleteRegionsById,
} = require("../controllers/regions");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const regionsRout = express.Router();

regionsRout.get("/", getAllRegions);

regionsRout.post(
  "/",
  authentication,
  authorization("add_region"),
  addNewRegions
);

regionsRout.delete(
  "/:id/:is_deleted",
  authentication,
  authorization("delete_region"),
  deleteRegionsById
);

module.exports = regionsRout;
