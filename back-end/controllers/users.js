const { throwError } = require("../middlewares/throwError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/DB");
const salt = parseInt(process.env.SALT);
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
    password = await bcrypt.hash(password, salt);
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
        const secret = process.env.SECRET;
        token = jwt.sign(payLoad, secret, options);

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

// ------------our team this is the function to get all info for all users to shared with website Admin 
// if you wanna to remove some info lets discuss about it 
exports.getAllUsers = async(req, res) => {
  const query=`SELECT
  users.id AS user_id,
  regions.region AS user_region,
  roles.role AS user_role,
  users.first_name,
  users.last_name,
  users.nick_name,
  users.email,
  users.active,
  users.is_deleted,
  users.longitude,
  users.latitude,
  users.image,
  users.created_at
FROM
  users
INNER JOIN
  regions ON users.region_id = regions.id
INNER JOIN
  roles ON users.role_id = roles.id;
`
 try{
 const response=await pool.query(query)
console.log(response.rows);
  res.status(200).json({
    error: false,
    message: "All Users",
    Users: response.rows,
  });
 
 }catch(error){ res.status(500).json({
  success: false,
  message: "Server Error",
  error: error.message,
});}
};



//--------------------------------------------- This Function To Get User By Id
exports.getUserById =async (req, res) => {
  const {id}=req.params
  console.log(id);
  const value=[id]
  const query=`SELECT
  users.id AS user_id,
  regions.region AS user_region,
  users.first_name,
  users.last_name,
  users.nick_name,
  users.email,
  users.active,
  users.image,
  users.created_at
FROM
  users
INNER JOIN
  regions ON users.region_id = regions.id
INNER JOIN
  roles ON users.role_id = roles.id
WHERE
  users.id =$1;
`
  try{
   const response=await pool.query(query,value)
    if (response.rowCount) {
     
 
   res.status(200).json({
     success: true,
     message: `This Is The specific User`,
     User: response.rows,
   });
    }

 
  
  }catch(error){ res.status(500).json({
   success: false,
   message: "Server Error",
   error: error.message,
 });}
};

// this fun allow the user delete his account from website
// note admin cant delete the user account in my opinion this is wrong option in our project
// instead of this the admin can ban or block the user  if he breaks the laws
// as you can see in the next function
// i think we need to discuss this !
exports.deleteUserById = (req, res) => {
  const {id} = req.token;
  const query = `UPDATE users SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `your account deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting this account");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// This function allows Admin to ban the account 
exports.BanUserById = (req, res) => {
  const {id} = req.params;
  const query = `UPDATE users
  SET active = 1
  WHERE id = id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `account Blocked successfully`,
        });
      } else {
        throw new Error("Error happened while Blocked this account");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};