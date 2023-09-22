const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.addService = (req, res, next) => {
  let {
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    status_id,
    default_image,
  } = req.body;

  const values = [
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    status_id,
    default_image,
  ];

  pool
    .query(
      `INSERT INTO serverices (service_provider_id, category_id, sub_category_id, title, description, status_id, default_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values
    )
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: false,
          message: "Service Added succefully",
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

exports.updateService = (req, res, next) => {
  let {
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    status_id,
    default_image,
  } = req.body;

  const { id } = req.params;

  const values = [
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    status_id,
    default_image,
    id,
  ];

  pool
    .query(
      `UPDATE serverices SET service_provider_id = $1, category_id = $2, sub_category_id = $3, 
      title = $4, description = $5, status_id = $6, default_image = $7 WHERE id = $8`,
      values
    )
    .then((result) => {
      if (result.command === "UPDATE") {
        return res.status(200).json({
          error: false,
          message: "Service Updated succefully",
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

exports.getAllServicesOnCategory = (req, res, next) => {
  pool
    .query(`SELECT * FROM serverices WHERE category_id = $1`, [
      req.params.categoryId,
    ])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllServicesOnSubCategory = (req, res, next) => {
  pool
    .query(`SELECT * FROM serverices WHERE sub_category_id = $1`, [
      req.params.subCategoryId,
    ])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getServiceOnId = (req, res, next) => {
  pool
    .query(`SELECT * FROM serverices WHERE id = $1`, [req.params.id])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows[0],
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
