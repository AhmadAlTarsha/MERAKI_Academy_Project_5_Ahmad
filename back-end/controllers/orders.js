const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.addOrder = (req, res, next) => {
  let { serverices_provider_id, sub_category_id, review } = req.body;

  const values = [
    req?.token?.user?.id,
    serverices_provider_id,
    sub_category_id,
    review,
  ];

  pool
    .query(
      `INSERT INTO orders (customer_id, serverices_provider_id, sub_category_id, review) VALUES ($1, $2, $3, $4)`,
      values
    )
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: false,
          message: "Order Added succefully",
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllOrders = (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const status = Number(req.query.stauts);

  let query = `SELECT orders.id, orders.customer_id, orders.serverices_provider_id, orders.status_id, orders.sub_category_id, orders.review, orders.created_at,
  customers.first_name AS customerFirstName, customers.last_name AS customerLastName, customers.email AS customerEmail,
  providers.first_name AS providerFirstName, providers.last_name AS providerLastName, providers.email AS providerEmail,
  statuses.name, sub_categories.name AS subCategoryName, categories.name AS categoryName, categories.id AS categoryId
  FROM orders
  INNER JOIN users customers ON customers.id = orders.customer_id
  INNER JOIN users providers ON providers.id = orders.serverices_provider_id
  INNER JOIN statuses ON statuses.id = orders.status_id
  INNER JOIN sub_categories ON sub_categories.id = orders.sub_category_id
  INNER JOIN categories ON sub_categories.category_id = categories.id`;
  let data = [];

  if (perPage && currentPage && status) {
    query += ` WHERE orders.status_id = $1 ORDER BY orders.id ASC LIMIT $2 OFFSET $3`;
    data = [status, perPage, (currentPage - 1) * perPage];
  } else if (perPage && currentPage) {
    query += ` ORDER BY orders.id ASC LIMIT $1 OFFSET $2`;
    data = [perPage, (currentPage - 1) * perPage];
  } else if (!perPage && !currentPage && status) {
    query += ` WHERE orders.status_id = $1 ORDER BY orders.id ASC`;
    data = [status];
  } else {
    query = query;
  }

  pool
    .query(query, data)
    .then((result) => {
      if (result.command === `SELECT`) {
        const orders = result?.rows.map((order) => ({
          id: order.id,
          customer: {
            id: order.customer_id,
            full_name: `${order.customerfirstname} ${order.customerlastname}`,
            email: order.customeremail,
          },
          provider: {
            id: order.serverices_provider_id,
            full_name: `${order.providerfirstname} ${order.providerlastname}`,
            email: order.provideremail,
          },
          review: order.review,
          category: {
            id: order.categoryid,
            name: order.categoryname,
            sub_category: {
              id: order.sub_category_id,
              name: order.subcategoryname,
            },
          },
          status: {
            id: order.status_id,
            name: order.name,
          },
          created_at: order.created_at,
        }));
        return res.status(200).json({
          error: false,
          orders,
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
