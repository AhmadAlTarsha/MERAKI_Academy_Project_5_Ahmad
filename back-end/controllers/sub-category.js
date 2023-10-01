const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.addSubCategory = (req, res, next) => {
  let { category_id, name } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  const values = [category_id, name, image];

  pool
    .query(
      `INSERT INTO sub_categories (category_id, name, image) VALUES ($1, $2, $3)`,
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
  let { category_id, name } = req.body;
  const { id } = req.params;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  const values = image
    ? [name, image, category_id, id]
    : [name, category_id, id];

  pool
    .query(
      image
        ? `UPDATE sub_categories SET name = $1, image = $2, category_id = $3 WHERE id = $4`
        : `UPDATE sub_categories SET name = $1, category_id = $2 WHERE id = $3`,
      values
    )
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

exports.getAllSubCategories = (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  let totalItems;
  pool
    .query(
      `SELECT sub_categories.id, sub_categories.name, sub_categories.image, sub_categories.is_deleted, sub_categories.created_at,
      categories.name AS categoryName
      FROM sub_categories
      INNER JOIN categories ON categories.id = sub_categories.category_id
      LIMIT $1 OFFSET $2`,
      [perPage, (currentPage - 1) * perPage]
    )
    .then((result) => {
      if (result.command === `SELECT`) {
        const subCategories = result.rows.map((subCategory) => ({
          id: subCategory?.id,
          name: subCategory?.name,
          image: `http://localhost:5000/${subCategory?.image}`,
          category_id: subCategory?.category_id,
          category_name: subCategory?.categoryname,
          is_deleted: subCategory?.is_deleted,
          created_at: subCategory?.created_at,
        }));
        return res.status(200).json({
          error: false,
          subCategories,
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

exports.getAllSubCategoriesOnCategory = (req, res, next) => {
  pool
    .query(`SELECT * FROM sub_categories WHERE category_id = $1`, [
      req.params.categoryId,
    ])
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

exports.deleteSub_CategoryById = (req, res, next) => {
  const { id } = req.params;

  const query = `UPDATE sub_categories SET is_deleted= 1 WHERE id = $1 ;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message: `sub_categories deleted successfully`,
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
