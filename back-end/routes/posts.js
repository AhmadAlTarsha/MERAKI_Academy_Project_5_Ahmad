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
postsRouter.get("/post/", getAllPosts);
postsRouter.post(
  "/:posterId",
  authentication,
  authorization("POST_CONTROL"),
  getAllPostsByUser
);

postsRouter.post(
  "/",
  authentication,
  authorization("POST_CONTROL"),
  createPost
);

postsRouter.put(
  "/:id",
  authentication,
  authorization("POST_CONTROL"),
  updatePostById
);

postsRouter.delete(
  "/delete/:id",
  authentication,
  authorization("POST_CONTROL"),
  activationPostById
);

module.exports = postsRouter;
