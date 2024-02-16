const { Pregunta, OpcionRespuesta } = require("../db");

const c_getPregunta = async () => {
  try {
    const ultimaPregunta = await Pregunta.findOne({
      include: OpcionRespuesta,
      order: [["createdAt", "DESC"]],
    });

    if (ultimaPregunta) {
      console.log("Última pregunta creada:", ultimaPregunta.toJSON());
      return ultimaPregunta;
    } else {
      console.log("No hay preguntas creadas aún.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la última pregunta creada:", error);
    throw error;
  }
};

module.exports = c_getPregunta;
