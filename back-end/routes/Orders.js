const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const {
  addOrder,
  getAllOrders,
  getOrdersByCustomerId,
  getOrdersByProviderId,
} = require("../controllers/orders");
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

ordersRouter.get(
  "/customer/",
  authentication,
  authorization("ORDER_CONTROL"),
  getOrdersByCustomerId
);

ordersRouter.get(
  "/provider/",
  authentication,
  authorization("ORDER_CONTROL"),
  getOrdersByProviderId
);

module.exports = ordersRouter;
