const express = require("express");
const {
  getAllRegions,
  addNewRegions,
  deleteRegionsById,
} = require("../controllers/regions");

const regionsRout = express.Router();

regionsRout.get("/", getAllRegions);
regionsRout.post("/", addNewRegions);
regionsRout.delete("/:id", deleteRegionsById);

module.exports = regionsRout;
