require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Respuesta } = require("../db.js");
const { Sequelize } = require("sequelize");

const c_getRespuestaById = async (opcionId) => {
  console.log(opcionId);
  const dataDB = await Respuesta.findAll({
    where: {
      opcionRespuestaId: opcionId,
    },
  });
  //const aptos = dataDB.map((registro) => registro.apto);

  //   if (aptos.length == 0)
  //     throw Error("No existe ningun apartamento para esa torre.");
  return dataDB;
};
module.exports = c_getRespuestaById;
