const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const UserType = require("./user_type");
const region = require("./regions");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "defaultUser.png",
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

UserType.hasMany(User, {
  foreignKey: "user_type_id",
});
User.belongsTo(UserType, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "user_type_id",
});

region.hasMany(User, {
  foreignKey: "region_id",
});
User.belongsTo(region, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "region_id",
});

module.exports = User;
