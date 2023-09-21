const { throwError } = require("../middlewares/throwError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/DB");

exports.register = async (req, res, next) => {
  let {
    region_id,
    role_id,
    firt_name,
    last_name,
    nick_name,
    email,
    password,
    image,
  } = req.body;

  try {
    password = await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }

  const query = `INSERT INTO users (region_id, role_id, firt_name, last_name, nick_name, email, password, image ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const data = [
    region_id,
    role_id,
    firt_name,
    last_name,
    nick_name,
    email.toLowerCase(),
    password,
    image,
  ];
  pool
    .query(query, data)
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: true,
          message: "Account created successfully",
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

exports.login = (req, res, next) => {
  let { email, password } = req.body;

  const query1 = `SELECT users.id, users.region_id, users.role_id, users.firt_name, users.last_name, users.nick_name, users.email, users.password,
   users.active, users.is_deleted, users.longtitude, users.longtitude, users.image, users.created_at,

  regions.region
  FROM users
  
  INNER JOIN regions ON regions.id = users.region_id

  WHERE email = $1`;

  const data = [email.toLowerCase()];
  let user = {};
  let token = "";
  pool
    .query(query1, data)
    .then(async (result) => {
      if (result.rows.length !== 0) {
        try {
          const isValid = await bcrypt.compare(
            password,
            result.rows[0].password
          );
          if (!isValid) {
            return throwError(404, "Email or Password is incorrect");
          }
        } catch (error) {
          throw error;
        }
        user = result.rows[0];
        return pool.query(
          `SELECT permission FROM permissions WHERE role_id = $1`,
          [result.rows[0].role_id]
        );
      }
      return throwError(404, "Email or Password is incorrect");
    })
    .then((result2) => {
      if (result2.command === "SELECT") {
        user.permissions = result2.rows.map(
          (permission) => permission.permission
        );

        const payLoad = {
          user,
        };

        const options = {
          expiresIn: "7d",
        };

        token = jwt.sign(payLoad, "tintin", options);

        return res.status(200).json({
          error: false,
          token,
          user,
        });
      }
      return throwError(404, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
