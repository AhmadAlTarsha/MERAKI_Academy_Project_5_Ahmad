const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

exports.getAllRegions = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const isDeleted = Number(req.query.is_deleted);

  let query = `SELECT * FROM regions`;
  let data = [];

  if (perPage && currentPage && isDeleted) {
    query += ` WHERE is_deleted = $1 LIMIT $2 OFFSET $3`;
    data = [isDeleted, perPage, (currentPage - 1) * perPage];
  }

  if (perPage && currentPage) {
    query += ` LIMIT $1 OFFSET $2`;
    data = [perPage, (currentPage - 1) * perPage];
  }

  if (!perPage && !currentPage) {
    query += ` WHERE is_deleted = 0`;
  }

  try {
    const response = await pool.query(query, data);

    res.status(200).json({
      error: false,
      regions: response.rows,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addNewRegions = async (req, res, next) => {
  const { region } = req.body;
  const value = [region];
  const query = `INSERT INTO regions (region) VALUES ($1)`;
  try {
    const response = await pool.query(query, value);
    res.status(200).json({
      error: false,
      message: "regions added ",
      regions: response.rows,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteRegionsById = async (req, res, next) => {
  const { id } = req.params;
  const value = [id];
  const query = `UPDATE regions SET is_deleted = 1 WHERE id=$1`;

  try {
    const response = await pool.query(query, value);
    res.status(200).json({
      error: false,
      message: "regions deleted ",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
