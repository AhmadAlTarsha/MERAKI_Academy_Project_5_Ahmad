// const pool = require("../models/DB");
const UserTypes = require("../models/user_type");

exports.createRoles = (req, res, next) => {
  const { role } = req.body;
  pool
    .query(`INSERT INTO roles (role) VALUES ($1)`, [role])
    .then((result) => {
      if (result.command === "INSERT") {
        res.status(201).json({
          error: false,
          message: "Added Success",
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

exports.getAllRole = async (req, res, next) => {
  try {
    const types = await UserTypes.findAll();

    res.status(200).json({
      error: false,
      roles: types,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
