const express = require("express");

const {
  createPost,
  updatePostById,
  activationPostById,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
  getAllPostsByCategory,
  getAllPostsBySubCategory,
} = require("../controllers/posts");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const postsRouter = express.Router();

// Crud methods
postsRouter.get("/", getAllPosts);
postsRouter.get("/:id", getPostById);

postsRouter.get(
  "/user/:poster_id",
  authentication,
  authorization("get_post"),
  getAllPostsByUser
);

postsRouter.get(
  "/category/:category_id",
  authentication,
  authorization("get_post"),
  getAllPostsByCategory
);

postsRouter.get(
  "/sub_category/:sub_category_id",
  authentication,
  authorization("get_post"),
  getAllPostsBySubCategory
);

postsRouter.post(
  "/",
  authentication,
  authorization("add_post"),
  createPost
);

postsRouter.put(
  "/:id",
  authentication,
  authorization("edit_post"),
  updatePostById
);

postsRouter.delete(
  "/:id/:is_deleted",
  authentication,
  authorization("delete_post"),
  activationPostById
);

module.exports = postsRouter;
