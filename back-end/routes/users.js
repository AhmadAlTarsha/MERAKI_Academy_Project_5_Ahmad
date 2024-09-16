const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteOrNotDeleteUserById,
} = require("../controllers/users");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.get("/", authentication, authorization("get_users"), getAllUsers);

usersRouter.get(
  "/:id",
  authentication,
  authorization("get_users"),
  getUserById
);

usersRouter.delete(
  "/:id/:isDelete",
  authentication,
  authorization("delete_user"),
  deleteOrNotDeleteUserById
);

usersRouter.put(
  "/:id",
  authentication,
  authorization("update_user"),
  updateUserById
);

module.exports = usersRouter;
