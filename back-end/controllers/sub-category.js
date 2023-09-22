const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.addSubCategory = (req, res, next) => {
  let { category_id, name, image } = req.body;

  const values = [category_id, name, image];

  pool
    .query(
      `INSERT INTO sub_categories (category_id, name, image) INTO ($1, $2, $3)`,
      values
    )
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: false,
          message: "Sub Category Added succefully",
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

exports.updateSubCategory = (req, res, next) => {
  let { category_id, name, image } = req.body;
  const { id } = req.params;
  const values = [category_id, name, image, id];

  pool
    .query(`UPDATE sub_categories SET name = $1, image = $2, category_id = $3 WHERE id = $4`, values)
    .then((result) => {
      if (result.command === "UPDATE") {
        return res.status(200).json({
          error: false,
          message: "Sub Category Updated succefully",
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

exports.getAllSubCategoriesOnCategory = (req, res, next) => {
  pool
    .query(`SELECT * FROM sub_categories WHERE category_id = $1`, [req.params.categoryId])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          subCategories: result.rows,
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

exports.getSubCateogoryById = (req, res, next) => {
  pool
    .query(`SELECT * FROM sub_categories WHERE id = $1`, [req.params.id])
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
