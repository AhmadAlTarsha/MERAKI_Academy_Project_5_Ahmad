const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = require("./user");
const Post = require("./Post");

const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      required: true,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0,
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

User.hasMany(Comment, {
  foreignKey: "commenter_id",
});
Comment.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "commenter_id",
});

//==========Category ======

Post.hasMany(Comment, {
  foreignKey: "post_id",
});
Comment.belongsTo(Post, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "post_id",
});

module.exports = Comment;
