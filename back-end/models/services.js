const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = require("./user");
const Category = require("./Category");
const Sub_category = require("./Sub_categories");
const Status = require("./Status");

const Service = sequelize.define(
  "services",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.TEXT,
      required: true,
    },
    default_image: {
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

//==========User ======

User.hasMany(Service, {
  foreignKey: "provider_id",
});
Service.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "provider_id",
});

//==========Category ======

Category.hasMany(Service, {
  foreignKey: "category_id",
});
Service.belongsTo(Category, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "category_id",
});

//==========SUB_CATEGORY ======

Sub_category.hasMany(Service, {
  foreignKey: "sub_category_id",
});
Service.belongsTo(Sub_category, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "sub_category_id",
});

//==========Status ======

Status.hasMany(Service, {
  foreignKey: "status_id",
});
Service.belongsTo(Status, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "status_id",
});

module.exports = Service;
