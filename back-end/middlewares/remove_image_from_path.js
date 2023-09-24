const fs = require("fs");
const { throwError } = require("./throwError");

exports.clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      throwError(400, err);
    }
  });
};
