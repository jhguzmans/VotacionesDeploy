const { Respuesta } = require("../db.js");
const c_postRespuesta = async (preguntaId, opcionRespuestaId, userId) => {
  try {
    // Obtener la Pregunta y la OpcionRespuesta
    //  console.log("en el controler, preguntaId es: ", preguntaId);
    //  const pregunta = await Pregunta.findByPk(preguntaId);
    //  const opcionRespuesta = await OpcionRespuesta.findByPk(opcionId);
    //  console.log("en el controler, pregunta es: ", pregunta);
    //  console.log("en el controler, opcion respuesta es: ", opcionRespuesta);

    // Crear la Respuesta
    const nuevaRespuesta = await Respuesta.create({
      preguntaId,
      opcionRespuestaId,
      userId,
    });
    console.log("En el controler, la nueva respuesta es: ", nuevaRespuesta);

    // Relacionar la Respuesta con la Pregunta, la OpcionRespuesta y el User
    //  await nuevaRespuesta.setPregunta(pregunta);
    //  await nuevaRespuesta.setOpcionRespuesta(opcionRespuesta);
    //  await nuevaRespuesta.setUser(user);

    console.log("Respuesta creada:", nuevaRespuesta.toJSON());

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
