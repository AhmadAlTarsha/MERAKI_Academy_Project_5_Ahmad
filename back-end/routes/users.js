const express = require("express");

const { register, login,getAllUsers,getUserById,deleteUserById,BanUserById } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/delete/:id",deleteUserById);
usersRouter.post("/blok/:id",BanUserById);

module.exports = usersRouter;
