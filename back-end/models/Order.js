const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = require("./user");
const Status = require("./Status");
const Service = require("./services");
const Sub_Categories = require("./Sub_categories");

const Order = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    review: {
      type: DataTypes.TEXT,
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

User.hasMany(Order, {
  foreignKey: "customer_id",
  as: "customer",
});
Order.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "customer_id",
  as: "customer",
});

Service.hasMany(Order, {
  foreignKey: "service_id",
});
Order.belongsTo(Service, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "service_id",
});

User.hasMany(Order, {
  foreignKey: "provider_id",
  as: "provider",
});
Order.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "provider_id",
  as: "provider",
});

//==========Category ======

Status.hasMany(Order, {
  foreignKey: "status_id",
});
Order.belongsTo(Status, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "status_id",
});

Sub_Categories.hasMany(Order, {
  foreignKey: "sub_category_id",
});
Order.belongsTo(Sub_Categories, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "sub_category_id",
});

module.exports = Order;
