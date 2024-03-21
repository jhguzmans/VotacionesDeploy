const { Respuesta } = require("../db.js");
const c_postRespuesta = async (preguntaId, opcionRespuestaId, userId, coef) => {
  console.log("el tipo de coef es: ", typeof coef);

  try {
    const nuevaRespuesta = await Respuesta.create({
      preguntaId,
      opcionRespuestaId,
      userId,
      coef,
    });

    console.log("En el controler, la nueva respuesta es: ", nuevaRespuesta);

    // Relacionar la Respuesta con la Pregunta, la OpcionRespuesta y el User
    //  await nuevaRespuesta.setPregunta(pregunta);
    //  await nuevaRespuesta.setOpcionRespuesta(opcionRespuesta);
    //  await nuevaRespuesta.setUser(user);

    return nuevaRespuesta;
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
    throw error;
  }
};

module.exports = c_postRespuesta;
// const { Respuesta, Pregunta, OpcionRespuesta, User } = require("../db");

// const c_postRespuesta = async (preguntaId, opcionId, user) => {
//   try {
//     // Obtener la Pregunta y la OpcionRespuesta
//     const pregunta = await Pregunta.findByPk(preguntaId);
//     const opcionRespuesta = await OpcionRespuesta.findByPk(opcionId);

//     // Crear la Respuesta y establecer la relación con Pregunta
//     const nuevaRespuesta = await Respuesta.create({ preguntaId });

//     // Establecer la relación con OpcionRespuesta y User
//     await nuevaRespuesta.setOpcionRespuesta(opcionRespuesta);
//     await nuevaRespuesta.setUser(user);

//     console.log("Respuesta creada:", nuevaRespuesta.toJSON());

//     return nuevaRespuesta;
//   } catch (error) {
//     console.error("Error al crear la respuesta:", error);
//     throw error;
//   }
// };

// module.exports = c_postRespuesta;
