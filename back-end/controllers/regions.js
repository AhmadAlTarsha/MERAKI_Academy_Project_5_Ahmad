// const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");
const Region = require("../models/regions");

exports.getAllRegions = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;

  const data = is_deleted
    ? {
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted },
      }
    : {
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
      };

  try {
    const regions = await Region.findAndCountAll(data);

    res.status(200).json({
      error: false,
      regions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addNewRegions = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newRegion = await Region.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });

    if (!newRegion[0]._options.isNewRecord) {
      return res.status(401).json({
        error: true,
        message: "Regions Already Exist",
      });
    }
    return res.status(200).json({
      error: false,
      user: newRegion[0],
      message: "Region Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteRegionsById = async (req, res, next) => {
  const { id, is_deleted } = req.params;

  try {
    const isDeleted = await Region.update({ is_deleted }, { where: { id } });
    if (typeof isDeleted[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          is_deleted == 1
            ? "Region Deleted Successfully"
            : "Region Restored Successfully",
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
