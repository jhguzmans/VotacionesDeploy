require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

const c_getAptosByTorre = async (torre) => {
  console.log(torre);
  const dataDB = await User.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("apto")), "apto"]],
    where: {
      torre: torre,
    },
  });
  const aptos = dataDB.map((registro) => registro.apto);

  if (aptos.length == 0)
    throw Error("No existe ningun apartamento para esa torre.");
  return aptos;
};
module.exports = c_getAptosByTorre;
