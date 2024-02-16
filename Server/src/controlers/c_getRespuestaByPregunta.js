const { Respuesta } = require("../db");

const c_getRespuestaByPregunta = async (preguntaId, user) => {
  try {
    console.log("En el controler, el ultimaPreguntaId es: ", preguntaId);
    console.log("en el controler, preguntaId es de tipo: ", typeof preguntaId);
    const respuesta = await Respuesta.findOne({
      where: {
        preguntaId: preguntaId,
        userId: user,
      },
    });
    if (respuesta) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "Error al obtener la respuesta anterior des este usuario: ",
      error
    );
    throw error;
  }
};

module.exports = c_getRespuestaByPregunta;
