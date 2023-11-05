const pool = require("../models/DB");
const io = require("../socket");
const Conversation = require("../models/Chat_Conversation");
const Chat = require("../models/Chat");
const User = require("../models/user");
const { throwError } = require("../middlewares/throwError");

exports.insertConversation = async (req, res, next) => {
  const { customer_id, provider_id } = req.body;

  try {
    const result = await Conversation.findOrCreate({
      where: { customer_id, provider_id },
      defaults: { customer_id, provider_id },
    });

    if (!result[0]._options.isNewRecord) {
      return res.status(200).json({
        error: false,
        id: result[0].dataValues.id,
        message: "Conversation exist",
      });
    }

    console.log(result);

    return res.status(201).json({
      error: false,
      message: "New Conversation created succefully",
      conversation_id: result[0].dataValues.id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getConversations = (req, res, next) => {
  Conversation.findAndCountAll({
    include: [
      { model: User, required: true, as: "customerChat" },
      { model: User, required: true, as: "providerChat" },
    ],
    order: [["id", "DESC"]],
  })
    .then((result) => {
      const conversations = result.rows.map((conversation) => ({
        id: conversation.id,
        customer: {
          id: conversation.customerChat.id,
          full_name: `${conversation.customerChat.first_name} ${conversation.customerChat.last_name}`,
          image: `http://localhost:5000/images/${conversation.customerChat.image}`,
        },
        provider: {
          id: conversation.providerChat.id,
          full_name: `${conversation.providerChat.first_name} ${conversation.providerChat.last_name}`,
          image: `http://localhost:5000/images/${conversation.providerChat.image}`,
        },
      }));

      return res.status(200).json({
        error: false,
        conversations: {
          count: result.count,
          rows: conversations,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.sendMessage = async (req, res, next) => {
  const { conversation_id } = req.params;
  const { reciver_id, message } = req.body;

  try {
    const result = await Chat.create({
      conversation_id,
      reciver_id,
      message,
      sender_id: req?.token?.user?.id,
    });

    if (result._options.isNewRecord) {
      io.getIo().emit("message", { action: "send" });
      return res.status(200).json({
        error: false,
        message: "Message Sent",
      });
    }
    return throwError(400, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getConversationChat = async (req, res, next) => {
  const { conversation_id } = req.params;

  try {
    const messages = await Chat.findAll({
      where: { conversation_id },
      include: [
        { model: User, required: true, as: "senderMsg" },
        { model: User, required: true, as: "resiverMsg" },
      ],
      order: [["id", "ASC"]],
    });

    const allMessages = messages.map((message) => ({
      id: message.id,
      message: message.message,
      sender: {
        id: message.senderMsg.id,
        nick_name: message.senderMsg.nick_name,
        image: `http://localhost:5000/images/${message.senderMsg.image}`,
      },
      reciver: {
        id: message.resiverMsg.id,
        nick_name: message.resiverMsg.nick_name,
        image: `http://localhost:5000/images/${message.resiverMsg.image}`,
      },
    }));

    return res.status(200).json({
      error: false,
      messages: allMessages,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getChat = (req, res, next) => {};
