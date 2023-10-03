const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { addOrder, getAllOrders } = require("../controllers/orders");
const ordersRouter = express.Router();

ordersRouter.post(
  "/",
  authentication,
  authorization("ORDER_CONTROL"),
  addOrder
);

ordersRouter.get(
  "/",
  authentication,
  authorization("ORDER_CONTROL"),
  getAllOrders
);

module.exports = ordersRouter;
