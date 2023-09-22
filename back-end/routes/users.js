const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUserById,
  BanUserById,
} = require("../controllers/users");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

usersRouter.get(
  "/",
  authentication,
  authorization("USER-CONTROL"),
  getAllUsers
);
usersRouter.get(
  "/:id",
  authentication,
  authorization("USER-CONTROL"),
  getUserById
);
usersRouter.delete(
  "/:id",
  authentication,
  authorization("USER-CONTROL"),
  deleteUserById
);
usersRouter.put(
  "/:id",
  authentication,
  authorization("USER-CONTROL"),
  BanUserById
);

module.exports = usersRouter;
