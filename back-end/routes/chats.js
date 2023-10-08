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
  //   authentication,
  //   authorization("CATEGORY_CONTROL"),
  insertConversation
);

chatRouter.get(
  "/",
  authentication,
  authorization("ORDER_CONTROL"),
  getConversations
);

chatRouter.get(
  "/:conversationId",
  authentication,
  authorization("ORDER_CONTROL"),
  getConversationChat
);

chatRouter.post(
  "/:conversation_id",
  authentication,
  authorization("ORDER_CONTROL"),
  sendMessage
);

module.exports = chatRouter;
