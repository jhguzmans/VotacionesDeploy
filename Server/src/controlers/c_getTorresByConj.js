require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

const c_getTorresByConj = async (conj) => {
  console.log("En el controler el conjunto es: " + conj);
  const dataDB = await User.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("torre")), "torre"]],
    where: {
      conj: conj,
    },
  });
  const torres = dataDB.map((registro) => registro.torre);
  if (torres.length == 0)
    throw Error("No existe ninguna torres para ese conjunto.");
  return torres;
};
module.exports = c_getTorresByConj;
