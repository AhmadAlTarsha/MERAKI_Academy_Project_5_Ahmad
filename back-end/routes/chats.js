const express = require("express");
const chatRouter = express.Router();

const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const {
  insertConversation,
  sendMessage,
  getConversationChat,
  getConversations,
} = require("../controllers/chats");

chatRouter.post(
  "/",
  authentication,
  authorization("conversation_control"),
  insertConversation
);

chatRouter.get(
  "/",
  authentication,
  authorization("conversation_control"),
  getConversations
);

chatRouter.get(
  "/:conversation_id",
  authentication,
  authorization("conversation_control"),
  getConversationChat
);

chatRouter.post(
  "/:conversation_id",
  authentication,
  authorization("conversation_control"),
  sendMessage
);

module.exports = chatRouter;
