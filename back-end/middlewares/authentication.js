const jwt = require("jsonwebtoken");
const { throwError } = require("./throwError");

exports.authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return throwError(403, "Forbidden");
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "tintin", (err, result) => {
      if (err) {
        return throwError(403, "The token is invalid or expired");
      }
      req.token = result;
      next();
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
