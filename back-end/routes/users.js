const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUserById,
  BanUserById,
  updateUserById
} = require("../controllers/users");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.get(
  "/",
  authentication,
  authorization("USER_CONTROL"),
  getAllUsers
);
usersRouter.get(
  "/:id",
  authentication,
  authorization("USER_CONTROL"),
  getUserById
);
usersRouter.delete(
  "/:id",
  authentication,
  authorization("USER_CONTROL"),
  deleteUserById
);
usersRouter.put(
  "/:id",
  authentication,
  authorization("USER_CONTROL"),
  BanUserById
);
usersRouter.put(
  "/updateAccount/:id",
  authentication,
  authorization("USER_CONTROL"),
  updateUserById
);

module.exports = usersRouter;
