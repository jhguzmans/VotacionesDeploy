require("dotenv").config();
const { Op } = require("sequelize");
const { User, Admin } = require("../db.js");

const c_getUsers = async () => {
  dataDB = await User.findAll();
  return dataDB;
};
module.exports = c_getUsers;
