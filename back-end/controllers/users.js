// const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserTypes = require("../models/user_type");
const Permissions = require("../models/permission");
// const salt = parseInt(process.env.SALT);

exports.register = async (req, res, next) => {
  let {
    region_id,
    user_type_id,
    first_name,
    last_name,
    nick_name,
    email,
    password,
    phone,
  } = req.body;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    password = await bcrypt.hash(password, 10);
    const result = await User.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: {
        email: email.toLowerCase(),
        region_id,
        user_type_id,
        first_name,
        last_name,
        nick_name,
        password,
        image,
        phone,
      },
    });

    if (!result[0]._options.isNewRecord) {
      return res.status(401).json({
        error: true,
        message: "Account Already Exist",
      });
    }
    return res.status(200).json({
      error: false,
      user: result[0],
      message: "Account Created Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  let token = "";
  let user = {};

  let { email, password } = req.body;

  try {
    const result = await User.findOne({
      where: { email: email.toLowerCase() },
      include: UserTypes,
    });

    if (result?.dataValues?.id) {
      const isValid = await bcrypt.compare(
        password,
        result?.dataValues?.password
      );
      if (!isValid) {
        return throwError(404, "Email or Password is incorrect");
      }

      user = result.dataValues;
      const permissionsResult = await Permissions.findAll({
        where: { user_type_id: result?.user_type_id },
      });
      user.permissions = permissionsResult.map((permisson) => permisson?.name);

      const payLoad = {
        user,
      };
      const options = {
        expiresIn: "7d",
      };

      token = jwt.sign(payLoad, "tintin", options);

      return res.status(200).json({
        error: false,
        message: "Login Successfully",
        id: user.id,
        token,
      });
    }
    return throwError(404, "Email or Password is incorrect");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const currentPage = Number(req.query.offset);
  const perPage = Number(req.query.limit);
  const isDeleted = req.query.is_deleted;

  try {
    const data = isDeleted
      ? {
          include: { model: UserTypes, required: true },
          order: [["id", "DESC"]],
          offset: (currentPage - 1) * perPage,
          limit: perPage,
          where: { is_deleted: isDeleted },
        }
      : {
          include: { model: UserTypes, required: true },
          order: [["id", "DESC"]],
          offset: (currentPage - 1) * perPage,
          limit: perPage,
        };

    const result = await User.findAndCountAll(data);
    res.status(200).json({
      error: false,
      users: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findByPk(id);
    res.status(200).json({
      error: false,
      user: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteOrNotDeleteUserById = async (req, res, next) => {
  const { id, isDelete } = req.params;

  try {
    const result = await User.update(
      { is_deleted: isDelete },
      { where: { id } }
    );

    if (result[0] === 0) {
      return res.status(200).json({
        error: false,
        message:
          isDelete == 1
            ? "Account Deleted Successfully"
            : "Account Restored Successfully",
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

exports.updateUserById = async (req, res, next) => {
  try {
    const { first_name, last_name, nick_name, email } = req.body;
    const { id } = req.params;

    let image;

    if (req.file) {
      image = req.file.path.replace("\\", "/");
    }

    const result = await User.update(
      { first_name, last_name, nick_name, email, image },
      { where: { id } }
    );

    if (result[0]) {
      return res.status(200).json({
        error: false,
        message: "Account updated successfully",
      });
    }
    return throwError(400, "something went wrong");
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
