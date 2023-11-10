const Service = require("../models/services");
const io = require("../socket");
const { throwError } = require("../middlewares/throwError");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const SubCategory = require("../models/Sub_categories");
const User = require("../models/user");
const Status = require("../models/Status");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

// ===================== ADD NEW SERVICE =====================
exports.addService = async (req, res, next) => {
  let { category_id, sub_category_id, title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  try {
    const result = await Service.create({
      title,
      description,
      provider_id: req.token.user.id,
      category_id,
      sub_category_id,
      default_image: image,
    });

    if (result._options.isNewRecord) {
      io.getIo().emit("services", { action: "create" });
      return res.status(201).json({
        error: true,
        message: "Service Created Successfully",
      });
    }
    clearImage(image);
    return throwError(404, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== UPDATE SERVICE =====================
exports.updateService = async (req, res, next) => {
  let { category_id, sub_category_id, title, description } = req.body;
  const { id } = req.params;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    const result = await Service.update(
      { title, description, category_id, sub_category_id, image },
      { where: { id } }
    );

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message: "Service Updated Successfully",
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

exports.updateServiceStatus = async (req, res, next) => {
  const { id, status } = req.params;
  let message = "";

  try {
    const result = await Service.update(
      { status_id: status },
      { where: { id } }
    );

    if (typeof result[0] === "number") {
      if (status == 2) {
        message = `Service Accepted`;
      } else if (status == 3) {
        message = `Service Rejected`;
      } else if (status == 4) {
        message = `Service Canceled`;
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

exports.getAllServices = async (req, res, next) => {
  // Service.sync({ alter: true })
  //   .then((result) => {
  //     res.json({ result });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       err,
  //     });
  //   });
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted, status_id } = req.query;

  let data = {};

  if (is_deleted && status_id) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { is_deleted, status_id },
    };
  } else if (is_deleted) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { is_deleted },
    };
  } else if (status_id) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { status_id },
    };
  } else {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
    };
  }

  try {
    const result = await Service.findAndCountAll(data);
    const services = result.rows.map((service) => {
      return {
        ...service.dataValues,
        default_image: `http://3.134.111.211:5000/${service.dataValues.default_image}`,
        user: {
          full_name: `${service.dataValues.user.dataValues.first_name} ${service.dataValues.user.dataValues.last_name}`,
          nick_name: service.dataValues.user.dataValues.nick_name,
          image: `${service.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...service.dataValues.Category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...service.dataValues.sub_category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.sub_category.dataValues.image}`,
        },
      };
    });
    res.status(200).json({
      error: false,
      services: {
        count: result.count,
        rows: services,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllServicesByUser = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted, status_id } = req.query;
  const { provider_id } = req.params;

  let data = {};

  if (is_deleted && status_id) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { is_deleted, status_id, provider_id },
    };
  } else if (is_deleted) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { is_deleted, provider_id },
    };
  } else if (status_id) {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { status_id, provider_id },
    };
  } else {
    data = {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { provider_id },
    };
  }

  try {
    const result = await Service.findAndCountAll(data);
    const services = result.rows.map((service) => {
      return {
        ...service.dataValues,
        default_image: `http://3.134.111.211:5000/${service.dataValues.default_image}`,
        user: {
          ...service.dataValues.user.dataValues,
          image: `${service.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...service.dataValues.Category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...service.dataValues.sub_category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.sub_category.dataValues.image}`,
        },
      };
    });
    res.status(200).json({
      error: false,
      services: {
        count: result.count,
        rows: services,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== GET ALL SERVICES ON CATEGORY =====================
exports.getAllServicesOnCategory = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted, status_id } = req.query;
  const { category_id } = req.params;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted, status_id, category_id },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { status_id, category_id },
      };

  try {
    const result = await Service.findAndCountAll(data);

    const services = result.rows.map((service) => {
      return {
        ...service.dataValues,
        default_image: `http://3.134.111.211:5000/${service.dataValues.default_image}`,
        user: {
          ...service.dataValues.user.dataValues,
          image: `${service.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...service.dataValues.Category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...service.dataValues.sub_category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      services: {
        count: result.count,
        rows: services,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== GET ALL SERVICES ON SUB-CATEGORY =====================
exports.getAllServicesOnSubCategory = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted, status_id } = req.query;
  const { sub_category_id } = req.params;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted, status_id, sub_category_id },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
          { model: Status, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { status_id, sub_category_id },
      };

  try {
    const result = await Service.findAndCountAll(data);

    const services = result.rows.map((service) => {
      return {
        ...service.dataValues,
        default_image: `http://3.134.111.211:5000/${service.dataValues.default_image}`,
        user: {
          ...service.dataValues.user.dataValues,
          image: `${service.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...service.dataValues.Category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...service.dataValues.sub_category.dataValues,
          image: `http://3.134.111.211:5000/${service.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      services: {
        count: result.count,
        rows: services,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== GET SERVICE BY ID =====================
exports.getServiceOnId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Service.findByPk(id, {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
        { model: Status, required: true },
      ],
    });

    if (result?.dataValues?.id) {
      return res.status(200).json({
        error: false,
        service: {
          ...result.dataValues,
          default_image: `http://3.134.111.211:5000/${result.dataValues.default_image}`,
          user: {
            ...result.dataValues.user.dataValues,
            image: `${result.dataValues.user.dataValues.image}`,
          },
          Category: {
            ...result.dataValues.Category.dataValues,
            image: `http://3.134.111.211:5000/${result.dataValues.Category.dataValues.image}`,
          },
          sub_category: {
            ...result.dataValues.sub_category.dataValues,
            image: `http://3.134.111.211:5000/${result.dataValues.sub_category.dataValues.image}`,
          },
        },
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

exports.activateOrDeActivateServiceById = async (req, res, next) => {
  const { id, is_deleted } = req.params;

  try {
    const result = await Service.update({ is_deleted }, { where: { id } });

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          is_deleted == 1
            ? "Service Deleted Successfully"
            : "Service Restored Successfully",
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
