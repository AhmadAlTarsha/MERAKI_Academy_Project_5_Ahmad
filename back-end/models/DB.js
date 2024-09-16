const mysql = require("mysql2");
require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERDATABSE, process.env.PASSWORDDABATSE, {
  dialect: "mysql",
  port: process.env.PORTDB,
  host: process.env.HOSTDB,
});

module.exports = sequelize;
