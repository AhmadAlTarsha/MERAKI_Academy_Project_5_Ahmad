const Order = require("../models/Order");
const SubCategory = require("../models/Sub_categories");
const User = require("../models/user");
const Status = require("../models/Status");
const { throwError } = require("../middlewares/throwError");

exports.addOrder = async (req, res, next) => {
  let { provider_id, sub_category_id, service_id, review } = req.body;

  try {
    const addOrder = await Order.findOrCreate({
      where: {
        customer_id: req.token.user.id,
        service_id,
      },
      defaults: {
        customer_id: req.token.user.id,
        service_id,
        provider_id,
        sub_category_id,
        review,
      },
    });

    if (addOrder[0]._options.isNewRecord) {
      // io.getIo().emit("services", { action: "create" });
      return res.status(401).json({
        error: true,
        message: "Order added Successfully",
      });
    }
    return throwError(404, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { status_id } = req.query;

  const data = status_id
    ? {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { status_id },
      }
    : {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
      };

  try {
    const ordersData = await Order.findAndCountAll(data);
    const orders = ordersData.rows.map((order) => {
      return {
        ...order.dataValues,
        customer: {
          id: order.dataValues.customer.id,
          full_name: `${order.dataValues.customer.first_name} ${order.dataValues.customer.last_name}`,
          email: order.dataValues.customer.email,
          phone: order.dataValues.customer.phone,
        },
        provider: {
          id: order.dataValues.provider.id,
          full_name: `${order.dataValues.provider.first_name} ${order.dataValues.provider.last_name}`,
          email: order.dataValues.provider.email,
          phone: order.dataValues.provider.phone,
        },
        sub_category: {
          ...order.dataValues.sub_category.dataValues,
        },
        status: {
          ...order.dataValues.status.dataValues,
        },
      };
    });
    res.status(200).json({
      error: false,
      orders: {
        count: ordersData.count,
        rows: orders,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrdersByCustomerId = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { status_id } = req.query;
  const { customer_id } = req.params;

  const data = status_id
    ? {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { status_id, customer_id },
      }
    : {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { customer_id },
      };

  try {
    const ordersData = await Order.findAndCountAll(data);
    const orders = ordersData.rows.map((order) => {
      return {
        ...order.dataValues,
        customer: {
          id: order.dataValues.customer.id,
          full_name: `${order.dataValues.customer.first_name} ${order.dataValues.customer.last_name}`,
          email: order.dataValues.customer.email,
          phone: order.dataValues.customer.phone,
        },
        provider: {
          id: order.dataValues.provider.id,
          full_name: `${order.dataValues.provider.first_name} ${order.dataValues.provider.last_name}`,
          email: order.dataValues.provider.email,
          phone: order.dataValues.provider.phone,
        },
        sub_category: {
          ...order.dataValues.sub_category.dataValues,
        },
        status: {
          ...order.dataValues.status.dataValues,
        },
      };
    });
    res.status(200).json({
      error: false,
      orders: {
        count: ordersData.count,
        rows: orders,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrdersByProviderId = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { status_id } = req.query;
  const { provider_id } = req.params;

  const data = status_id
    ? {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { status_id, provider_id },
      }
    : {
        include: [
          { model: User, required: true, as: "customer" },
          { model: User, required: true, as: "provider" },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { provider_id },
      };

  try {
    const ordersData = await Order.findAndCountAll(data);
    const orders = ordersData.rows.map((order) => {
      return {
        ...order.dataValues,
        customer: {
          id: order.dataValues.customer.id,
          full_name: `${order.dataValues.customer.first_name} ${order.dataValues.customer.last_name}`,
          email: order.dataValues.customer.email,
          phone: order.dataValues.customer.phone,
        },
        provider: {
          id: order.dataValues.provider.id,
          full_name: `${order.dataValues.provider.first_name} ${order.dataValues.provider.last_name}`,
          email: order.dataValues.provider.email,
          phone: order.dataValues.provider.phone,
        },
        sub_category: {
          ...order.dataValues.sub_category.dataValues,
        },
        status: {
          ...order.dataValues.status.dataValues,
        },
      };
    });
    res.status(200).json({
      error: false,
      orders: {
        count: ordersData.count,
        rows: orders,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { id, status } = req.params;
  let message = "";

  try {
    const result = await Order.update({ status_id: status }, { where: { id } });

    if (typeof result[0] === "number") {
      if (status == 2) {
        message = `Order Accepted`;
      } else if (status == 3) {
        message = `Order Rejected`;
      } else if (status == 4) {
        message = `Order Canceled`;
      }
      return res.status(200).json({
        error: false,
        message,
      });
    }
    return throwError(400, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
