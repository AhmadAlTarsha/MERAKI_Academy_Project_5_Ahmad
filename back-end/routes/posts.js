const express = require("express");

const {
  createPost,
  updatePostById,
  activationPostById,
  getAllPosts,
  getAllPostsByUser,
} = require("../controllers/posts");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const postsRouter = express.Router();

// Crud methods
postsRouter.get("/post/:active", getAllPosts);
postsRouter.get(
  "/:posterId",
  authentication,
  authorization("POST-CONTROL"),
  getAllPostsByUser
);

postsRouter.post(
  "/",
  authentication,
  authorization("POST-CONTROL"),
  createPost
);

postsRouter.put(
  "/:id",
  authentication,
  authorization("POST-CONTROL"),
  updatePostById
);

postsRouter.delete(
  "/delete/:id",
  authentication,
  authorization("POST-CONTROL"),
  activationPostById
);

module.exports = postsRouter;
