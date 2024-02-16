const { Pregunta, OpcionRespuesta } = require("../db");
const c_postPregunta = async (enunciado, opcionRespuestas) => {
  try {
    Pregunta.create(
      {
        enunciado: enunciado,
        OpcionRespuesta: opcionRespuestas,
      },
      { include: OpcionRespuesta }
    )
      .then((pregunta) => {
        console.log("Pregunta creada:", pregunta.toJSON());
      })
      .catch((error) => {
        console.error("Error al crear la pregunta:", error);
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = c_postPregunta;
