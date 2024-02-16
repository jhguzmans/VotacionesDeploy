const c_postRespuesta = require("../controlers/c_postRespuesta");
const axios = require("axios");
const postRespuesta = async (req, res) => {
  try {
    const { preguntaId, opcionId, user } = req.body;
    console.log(
      "lo que llega al post respuesta es: ",
      preguntaId,
      opcionId,
      user
    );
    console.log(
      "los datos que se envían en el handler de la respuesta son: ",
      "pregunta id ",
      preguntaId,
      "respuestaId ",
      opcionId,
      "usuario",
      user
    );
    const createdRespuesta = await c_postRespuesta(preguntaId, opcionId, user);
    return res.status(200).json(createdRespuesta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postRespuesta;
