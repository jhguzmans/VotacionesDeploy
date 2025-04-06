const { Respuesta, User } = require("../db.js");

const c_postRespuesta = async (preguntaId, opcionRespuestaId, userId, coef) => {
  let coefApod = 0;
  try {
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
    let apoderadoInfo = usuario.apoderado;
    console.log("el apoderadoInfo es: ", apoderadoInfo);
    console.log("el tipo de apoderadoInfo es: ", typeof apoderadoInfo);

    // Crear una respuesta para el usuario principal
    const respuestas = [];
    respuestas.push(
      await Respuesta.create({
        preguntaId,
        opcionRespuestaId,
        userId: sanitizedUserId,
        coef,
        pregIdUserId: sanitizedUserId + preguntaId,
      })
    );

    // Verificar si apoderadoInfo es un string, y si es así, parsearlo

    apoderadoInfo = JSON.parse(apoderadoInfo);

    console.log("el apoderadoInfo es: ", apoderadoInfo);
    console.log("el tipo de apoderadoInfo es: ", typeof apoderadoInfo);

    // Crear una respuesta por cada apoderado
    // if (Array.isArray(apoderadoInfo) && apoderadoInfo.length > 0) {
    //   for (const apoderado of apoderadoInfo) {
    //     const apoderadoUserId = `LA CASTELLANA PH-${apoderado.selectedTorre}-${apoderado.selectedApto}`;
    //     coefApod = await User.findOne({
    //       where: { conjTorreApto: apoderadoUserId },
    //       attributes: ["coef"],
    //       raw: true,
    //     });

    //     // Verifica y convierte el valor a cadena si no lo es
    //     const coefValue = coefApod ? String(coefApod.coef) : null;
    //     respuestas.push(
    //       await Respuesta.create({
    //         preguntaId,
    //         opcionRespuestaId,
    //         userId: apoderadoUserId,
    //         coef: coefValue,
    //         pregIdUserId: apoderadoUserId + preguntaId,
    //       })
    //     );
    //   }
    // }
    if (Array.isArray(apoderadoInfo) && apoderadoInfo.length > 0) {
      for (const apoderado of apoderadoInfo) {
        // Validación: si falta torre o apto, saltar
        if (!apoderado.selectedTorre || !apoderado.selectedApto) {
          console.warn("Apoderado con datos incompletos, se omite:", apoderado);
          continue;
        }
    
        const apoderadoUserId = `Fiorento-${apoderado.selectedTorre}-${apoderado.selectedApto}`;
        //const apoderadoUserId = `LA CASTELLANA PH-${apoderado.selectedTorre}-${apoderado.selectedApto}`;
        
        const coefApod = await User.findOne({
          where: { conjTorreApto: apoderadoUserId },
          attributes: ["coef"],
          raw: true,
        });
    
        const coefValue = coefApod ? String(coefApod.coef) : null;
    
        respuestas.push(
          await Respuesta.create({
            preguntaId,
            opcionRespuestaId,
            userId: apoderadoUserId,
            coef: coefValue,
            pregIdUserId: apoderadoUserId + preguntaId,
          })
        );
      }
    }
    

    return respuestas;
  } catch (error) {
    console.error("Error al crear la respuesta:", error);
    throw error;
  }
};

module.exports = c_postRespuesta;
