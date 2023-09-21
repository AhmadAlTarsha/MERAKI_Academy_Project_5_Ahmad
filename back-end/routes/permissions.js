const express = require("express");
const permissionsRouter = express.Router();
const permissionsController = require("../controllers/permissions");

permissionsRouter.post("/", permissionsController.createPermssions);

module.exports = permissionsRouter;