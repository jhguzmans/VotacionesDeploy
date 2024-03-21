require("dotenv").config();
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

const c_getConj = async () => {
  const dataDB = await User.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("conj")), "conj"]],
  });
  const conjs = dataDB.map((registro) => registro.conj);
  //const conjs = ["amarilo", "verde", "azul"];
  if (conjs.length == 0)
    throw Error("No existe ningun apartamento para esa torre.");
  return conjs;
};
module.exports = c_getConj;
