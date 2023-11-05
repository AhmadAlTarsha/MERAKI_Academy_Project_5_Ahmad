const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const {
  addOrder,
  getAllOrders,
  getOrdersByCustomerId,
  getOrdersByProviderId,
  updateOrderStatus
} = require("../controllers/orders");
const ordersRouter = express.Router();

ordersRouter.post(
  "/",
  authentication,
  authorization("add_orders"),
  addOrder
);

ordersRouter.get(
  "/",
  authentication,
  authorization("get_orders"),
  getAllOrders
);

ordersRouter.get(
  "/customer/:customer_id",
  authentication,
  authorization("get_orders"),
  getOrdersByCustomerId
);

ordersRouter.get(
  "/provider/:provider_id",
  authentication,
  authorization("get_orders"),
  getOrdersByProviderId
);

ordersRouter.put(
  "/:id/:status",
  authentication,
  authorization("update_status"),
  updateOrderStatus
);

module.exports = ordersRouter;
