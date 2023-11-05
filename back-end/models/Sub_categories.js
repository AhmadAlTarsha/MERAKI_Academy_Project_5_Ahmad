const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const Category = require("./Category");

const Sub_Category = sequelize.define(
  "sub_categories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
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

Category.hasMany(Sub_Category, {
  foreignKey: "category_id",
});
Sub_Category.belongsTo(Category, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "category_id",
});

module.exports = Sub_Category;
