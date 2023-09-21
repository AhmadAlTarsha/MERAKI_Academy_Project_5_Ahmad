const pool = require("../models/DB");

exports.createRoles = (req, res, next) => {
  const { role } = req.body;
  pool
    .query(`INSERT INTO roles (role) VALUES ($1)`, [
        role,
    ])
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
