const express = require("express");

const {
  createPost,
  updatePostById,
  deletePostById,
  getAllPosts,
} = require("../controllers/posts");

const postsRouter = express.Router();

// Crud methods
postsRouter.get("/", getAllPosts);
postsRouter.post("/", createPost);
postsRouter.put("/:id", updatePostById);
postsRouter.delete("/delete/:id", deletePostById);

module.exports = postsRouter;
