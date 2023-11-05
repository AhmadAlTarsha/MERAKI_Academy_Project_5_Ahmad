const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./DB');

const UserType = require("./user_type");

const Permission = sequelize.define(
  "permissions",
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

UserType.hasMany(Permission, {
  foreignKey: "user_type_id",
});
Permission.belongsTo(UserType, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "user_type_id",
});

module.exports = Permission;
