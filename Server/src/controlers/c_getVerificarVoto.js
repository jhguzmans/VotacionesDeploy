const { Respuesta } = require("../db.js");

const c_getVerificarVoto = async (preguntaId, userId) => {
  try {
    console.log("Los datos que llegan a c_getVerificarVoto son:");
    console.log("preguntaId es: ", preguntaId);
    console.log("el tipo de preguntaId es: ", typeof preguntaId);
    console.log("userId es: ", userId);
    console.log("el tipo de userId es: ", typeof userId);
    const pregIdUserId = userId + preguntaId;

    const dataDB = await Respuesta.findAll({ where: { pregIdUserId } });
    console.log("En c_getVerificarVoto, la respuesta que se va es : ", dataDB);

    return dataDB;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_getVerificarVoto;
