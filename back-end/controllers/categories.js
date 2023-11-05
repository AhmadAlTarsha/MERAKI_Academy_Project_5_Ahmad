const pool = require("../models/DB");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");
const { throwError } = require("../middlewares/throwError");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

exports.addCategory = async (req, res, next) => {
  let { name } = req.body;

  if (!req.file) {
    console.log(req);
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");
  try {
    const result = await Category.findOrCreate({
      where: { name },
      defaults: { name, image },
    });

    if (!result[0]._options.isNewRecord) {
      clearImage(image);
      return res.status(401).json({
        error: true,
        message: "Category Already Exist",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Category Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  let { name } = req.body;
  const { id } = req.params;
  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    const result = await Category.update({ name, image }, { where: { id } });
    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message: "Category Updated Successfully",
      });
    }

    return throwError(400, "Something went wrong");
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const isDeleted = req.query.is_deleted;

  try {
    const data = isDeleted
      ? {
          order: [["id", "DESC"]],
          offset: (currentPage - 1) * perPage,
          limit: perPage,
          where: { is_deleted: isDeleted },
        }
      : {
          order: [["id", "DESC"]],
          offset: (currentPage - 1) * perPage,
          limit: perPage,
        };
    const result = await Category.findAndCountAll(data);

    const categories = result?.rows.map((category) => ({
      id: category.id,
      name: category.name,
      image: `http://localhost:5000/${category.image}`,
      is_deleted: category.is_deleted,
      created_at: category.created_at,
    }));

    res.status(200).json({
      error: false,
      categories: {
        count : result.count,
        rows : categories
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCateogoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Category.findByPk(id);
    if (result?.dataValues?.id) {
      return res.status(200).json({
        error: false,
        Category: result,
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

exports.activateOrDeActivateCategoryById = async (req, res, next) => {
  const { id, isDeleted } = req.params;

  try {
    const result = await Category.update(
      { is_deleted: isDeleted },
      { where: { id } }
    );

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          isDeleted == 1
            ? "Category Deleted Successfully"
            : "Category Restored Successfully",
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
