const express = require("express");

const commentsRouter = express.Router();

const {
  createNewComment,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
  
} = require("../controllers/comments");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

commentsRouter.get("/:id",authentication,authorization("COMMENT-CONTROL"),getCommentsByPostId)

commentsRouter.post("/",authentication,authorization("COMMENT-CONTROL"),createNewComment)

commentsRouter.put("/:id",authentication,authorization("COMMENT-CONTROL"),updateCommentById)

commentsRouter.delete("/:id",authentication,authorization("COMMENT-CONTROL"),deleteCommentById)
module.exports = commentsRouter;