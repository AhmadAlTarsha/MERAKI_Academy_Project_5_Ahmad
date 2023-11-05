const express = require("express");
const commentsRouter = express.Router();

const {
  createNewComment,
  updateCommentById,
  activateOrDeActivateCommentById,
  getCommentsByPostId,
} = require("../controllers/comments");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

commentsRouter.get(
  "/:post_id",
  authentication,
  authorization("get_comment"),
  getCommentsByPostId
);

commentsRouter.post(
  "/:id",
  authentication,
  authorization("add_comment"),
  createNewComment
);

commentsRouter.put(
  "/:id",
  authentication,
  authorization("update_comment"),
  updateCommentById
);

commentsRouter.delete(
  "/:id/:is_deleted",
  authentication,
  authorization("delete_comment"),
  activateOrDeActivateCommentById
);
module.exports = commentsRouter;
