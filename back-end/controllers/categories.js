const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.addCategory = (req, res, next) => {
  let { name } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  const values = [name, image];

  pool
    .query(`INSERT INTO categories (name, image) VALUES ($1, $2)`, values)
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: false,
          message: "Category Added succefully",
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

exports.updateCategory = (req, res, next) => {
  let { name } = req.body;
  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  const { id } = req.params;
  const values = image ? [name, image, id] : [name, id];

  pool
    .query(
      image
        ? `UPDATE categories SET name = $1, image = $2 WHERE id = $3`
        : `UPDATE categories SET name = $1 WHERE id = $2`,
      values
    )
    .then((result) => {
      if (result.command === "UPDATE") {
        return res.status(200).json({
          error: false,
          message: "Category Updated successfully",
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

exports.getAllCategories = (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const isDeleted = Number(req.query.is_deleted);
  let query = `SELECT * FROM categories`;
  let data = [];

  if (perPage && currentPage && isDeleted) {
    query += ` ORDER BY id ASC WHERE is_deleted = $1 LIMIT $2 OFFSET $3`;
    data = [isDeleted, perPage, (currentPage - 1) * perPage];
  }

  if (perPage && currentPage) {
    query += ` ORDER BY id ASC LIMIT $1 OFFSET $2`;
    data = [perPage, (currentPage - 1) * perPage];
  }

  if (!perPage && !currentPage) {
    query += ` WHERE is_deleted = 0 ORDER BY id ASC`;
  }

  pool
    .query(query, data)
    .then((result) => {
      if (result.command === `SELECT`) {
        const categories = result.rows.map((category) => ({
          id: category.id,
          image: `http://localhost:5000/${category.image}`,
          name: category.name,
          is_deleted: category.is_deleted,
        }));
        return res.status(200).json({
          error: false,
          categories,
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

exports.getCateogoryById = (req, res, next) => {
  pool
    .query(`SELECT * FROM categories WHERE id = $1`, [req.params.id])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          category: result.rows[0],
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

exports.activateOrDeActivateCategoryById = (req, res, next) => {
  const { id } = req.params;
  const { active } = req.body;

  const query = `UPDATE categories SET is_deleted = $1 WHERE id = $2 ;`;
  const data = [active, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message:
            active == 0
              ? `Category activated successfully`
              : `Category deleted successfully`,
        });
      }
      return throwError(400, "something went rowing");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
