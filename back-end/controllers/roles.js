// const pool = require("../models/DB");

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

exports.getAllRole=async(req,res,next)=>{
  const query=`SELECT * FROM roles`
  try {
    const response= await pool.query(query)
    res.status(201).json({
      error: false,
      message: "all roles",
      roles:response.rows
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
