const { throwError } = require("./throwError");

exports.authorization = (string) => {
  return (req, res, next) => {
    if (!req.token.user.permissions.includes(string)) {
      return throwError(403, "Unauthorized");
    }

    return next();
  };
};
