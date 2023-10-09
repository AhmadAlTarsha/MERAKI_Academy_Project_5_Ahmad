const pool = require("../models/DB");
const io = require("../socket");
const { throwError } = require("../middlewares/throwError");

exports.insertConversation = (req, res, next) => {
  const { customerId, providerId } = req.body;
  let values = [];

  pool
    .query(
      "select id from chat_conversations where customer = $1 AND provider = $2",
      [customerId, providerId]
    )
    .then((result1) => {
      if (result1.rows.length !== 0) {
        return Promise.resolve({
          status: 200,
          message: "Conversation exist",
          conversation_id: result1.rows[0].id,
        });
      }
      return pool.query(
        `INSERT INTO chat_conversations (customer, provider) VALUES ($1, $2) RETURNING *`,
        [customerId, providerId]
      );
    })
    .then((result2) => {
      if (result2.status === 200) {
        return res.status(200).json({
          error: false,
          message: result2.message,
          conversation_id: result2.conversation_id,
        });
      }

      if (result2.rowCount !== 0) {
        return res.status(201).json({
          error: false,
          message: "New Conversation created succefully",
          conversation_id: result2.rows[0].id,
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getConversations = (req, res, next) => {
  pool
    .query(
      `SELECT chat_conversations.id, users.id AS userId, users.first_name, users.last_name, users.image
      FROM chat_conversations
      INNER JOIN users ON users.id = chat_conversations.customer 
      WHERE provider = $1 ORDER BY id ASC`,
      [req.token.user.id]
    )
    .then((result) => {
      const conversations = result.rows.map((conversation) => ({
        id: conversation.id,
        customer: {
          id: conversation.userid,
          full_name: `${conversation.first_name} ${conversation.last_name}`,
          image: `http://localhost:5000/images/${conversation.image}`,
        },
      }));
      res.status(200).json({
        error: false,
        conversations,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.sendMessage = (req, res, next) => {
  const { conversation_id } = req.params;
  const { reciverId, message } = req.body;

  pool
    .query(
      `INSERT INTO chat_messages (conversation_id, sender_id, receiver_id, message) VALUES ($1, $2, $3, $4)`,
      [conversation_id, req?.token?.user?.id, reciverId, message]
    )
    .then((result) => {
      io.getIo().emit("message", { action: "send" });
      if (result.rowCount !== 0) {
        res.status(201).json({
          error: false,
          message: "Message sent",
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getConversationChat = (req, res, next) => {
  const { conversationId } = req.params;

  pool
    .query(
      `SELECT chat_messages.id, chat_messages.sender_id, chat_messages.receiver_id, chat_messages.message, chat_messages.timestamp,
      senders.first_name AS sender_first_name, recivers.first_name AS reciver_first_name
      FROM chat_messages
      INNER JOIN users senders ON senders.id = chat_messages.sender_id
      INNER JOIN users recivers ON recivers.id = chat_messages.receiver_id
      WHERE chat_messages.conversation_id = $1`,
      [conversationId]
    )
    .then((result) => {
      const chats = result.rows.map((chat) => ({
        id: chat.id,
        sender: {
          id: chat.sender_id,
          name: chat.sender_first_name,
          message: chat.message,
        },
        reciver: {
          id: chat.receiver_id,
          name: chat.reciver_first_name,
        },
        created_at: chat.timestamp,
      }));
      res.status(200).json({
        error: false,
        chats,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getChat = (req, res, next) => {};
