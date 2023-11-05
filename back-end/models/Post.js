const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = require("./user");
const Category = require("./Category");
const Sub_category = require("./Sub_categories");

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    main_image: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
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

User.hasMany(Post, {
  foreignKey: "poster_id",
});
Post.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "poster_id",
});

//==========Category ======

Category.hasMany(Post, {
  foreignKey: "category_id",
});
Post.belongsTo(Category, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "category_id",
});

//==========SUB_CATEGORY ======

Sub_category.hasMany(Post, {
  foreignKey: "sub_category_id",
});
Post.belongsTo(Sub_category, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "sub_category_id",
});

module.exports = Post;
