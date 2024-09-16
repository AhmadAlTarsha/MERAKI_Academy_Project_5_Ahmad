const pool = require("../models/DB");
const Permissions = require("../models/permission");

exports.createPermssions = (req, res, next) => {
  Permissions.bulkCreate([
    { name: "get_region", user_type_id: 3 },
    { name: "get_category", user_type_id: 3 },
    { name: "get_post", user_type_id: 3 },
    { name: "add_post", user_type_id: 3 },
    { name: "edit_post", user_type_id: 3 },
    { name: "delete_post", user_type_id: 3 },
    { name: "get_orders", user_type_id: 3 },
    { name: "add_orders", user_type_id: 3 },
    { name: "cancel_orders", user_type_id: 3 },
    { name: "get_service", user_type_id: 3 },
  ])
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
