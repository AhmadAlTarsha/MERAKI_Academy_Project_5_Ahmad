// const pool = require("../models/DB");
const SubCategories = require("../models/Sub_categories");
const Category = require("../models/Category");
const { throwError } = require("../middlewares/throwError");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

exports.addSubCategory = async (req, res, next) => {
  let { category_id, name } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  try {
    const result = await SubCategories.findOrCreate({
      where: { name },
      defaults: { name, image, category_id },
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
      message: "Sub Category Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateSubCategory = async (req, res, next) => {
  let { category_id, name } = req.body;
  const { id } = req.params;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    const result = await SubCategories.update(
      { name, image, category_id },
      { where: { id } }
    );

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message: "Sub Category Updated Successfully",
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

exports.getAllSubCategories = async (req, res, next) => {
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
          include: { model: Category, required: true },
        }
      : {
          order: [["id", "DESC"]],
          offset: (currentPage - 1) * perPage,
          limit: perPage,
          include: { model: Category, required: true },
        };

    const result = await SubCategories.findAndCountAll(data);

    const subCategories = result?.rows?.map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
      category: {
        id: subCategory.category_id,
        name: subCategory.Category.name,
      },
      image: `http://localhost:5000/${subCategory.image}`,
      is_deleted: subCategory.is_deleted,
      created_at: subCategory.created_at,
    }));

    res.status(200).json({
      error: false,
      subCategories: {
        count: result.count,
        rows: subCategories,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllSubCategoriesOnCategory = async (req, res, next) => {
  const { perPage, currentPage, is_deleted, category_id } = req.query;

  try {
    const data = is_deleted
      ? {
          order: [["id", "DESC"]],
          offset: (Number(currentPage) - 1) * Number(perPage),
          limit: Number(perPage),
          include: { model: Category, required: true },
          where: { is_deleted, category_id },
        }
      : {
          order: [["id", "DESC"]],
          offset: (Number(currentPage) - 1) * Number(perPage),
          limit: Number(perPage),
          include: { model: Category, required: true },
          where: { category_id },
        };

    const result = await SubCategories.findAll(data);
    const subCategories = result?.map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
      category: {
        id: subCategory.category_id,
        name: subCategory.Category.name,
      },
      image: `http://localhost:5000/${subCategory.image}`,
      is_deleted: subCategory.is_deleted,
      created_at: subCategory.created_at,
    }));

    res.status(200).json({
      error: false,
      subCategories,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSubCateogoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await SubCategories.findByPk(id, {
      include: { model: Category, required: true },
    });

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

exports.activateOrDeActivateSubCategoryById = async (req, res, next) => {
  const { id, isDeleted } = req.params;

  try {
    const result = await SubCategories.update(
      { is_deleted: isDeleted },
      { where: { id } }
    );

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          isDeleted == 1
            ? "Sub Category Deleted Successfully"
            : "Sub Category Restored Successfully",
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
