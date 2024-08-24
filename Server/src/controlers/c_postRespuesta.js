// const { Respuesta } = require("../db.js");
// const c_postRespuesta = async (preguntaId, opcionRespuestaId, userId, coef) => {
//   try {
//     const nuevaRespuesta = await Respuesta.create({
//       preguntaId,
//       opcionRespuestaId,
//       userId,
//       coef,
//     });

//     return nuevaRespuesta;
//   } catch (error) {
//     console.error("Error al crear la respuesta:", error);
//     throw error;
//   }
// };

// module.exports = c_postRespuesta;

const { Respuesta, User } = require("../db.js");

const c_postRespuesta = async (preguntaId, opcionRespuestaId, userId, coef) => {
  console.log("lo que llega a c_postRespuesta es: ");
  console.log("preguntaId es: ", preguntaId);
  console.log("opcionRespuestaId es: ", opcionRespuestaId);
  console.log("userId es: ", userId);
  console.log("coef es: ", coef);

  try {
    // Buscar al usuario por su userId (puedes cambiarlo a conjTorreApto si es necesario)
    // Remover las comillas del userId si las tiene
    const sanitizedUserId = userId.replace(/['"]+/g, "");

    // Buscar al usuario por su conjTorreApto sin las comillas
    const usuario = await User.findOne({
      where: { conjTorreApto: sanitizedUserId },
    });

    if (!usuario) {
      console.log("Usuario no encontrado en c_postRespuesta");
      throw new Error("Usuario no encontrado");
    }

    // Extraer la información del arreglo apoderado
    const apoderadoInfo = usuario.apoderado;
    console.log("El usuario es: ", usuario);

    // Crear una nueva respuesta
    const nuevaRespuesta = await Respuesta.create({
      preguntaId,
      opcionRespuestaId,
      userId,
      coef,
    });

    console.log(
      "En c_postRespuesta lo que tiene apoderadoInfo es: ",
      apoderadoInfo
    );

    // Puedes hacer algo con apoderadoInfo si lo necesitas en este contexto

    return nuevaRespuesta;
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
    throw error;
  }
};

module.exports = c_postRespuesta;
