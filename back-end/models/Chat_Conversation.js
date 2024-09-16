const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = require("./user");

const Conversation = sequelize.define(
  "chat_conversation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Conversation, {
  foreignKey: "customer_id",
  as: "customerChat",
});
Conversation.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "customer_id",
  as: "customerChat",
});

User.hasMany(Conversation, {
  foreignKey: "provider_id",
  as: "providerChat",
});
Conversation.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "provider_id",
  as: "providerChat",
});

module.exports = Conversation;
