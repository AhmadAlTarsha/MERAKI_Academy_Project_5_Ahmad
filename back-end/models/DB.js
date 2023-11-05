const mysql = require("mysql2");
require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  dialect: "mysql",
  port: process.env.PORTDB,
  host: process.env.HOST,
});

module.exports = sequelize;
