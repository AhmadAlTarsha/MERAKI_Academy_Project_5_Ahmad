const express = require("express");
const rolesRouter = express.Router();
const rolesController = require("../controllers/roles");

rolesRouter.post("/", rolesController.createRoles);
rolesRouter.get("/", rolesController.getAllRole);

module.exports = rolesRouter;