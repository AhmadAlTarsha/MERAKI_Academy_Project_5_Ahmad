const pool = require("../models/DB");

exports.createPermssions = (req, res, next) => {
  const { roleId, permisson } = req.body;
  pool
    .query(`INSERT INTO permissions (role_id, permission) VALUES ($1, $2)`, [
      roleId,
      permisson,
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
