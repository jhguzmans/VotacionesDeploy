const c_postRespuesta = require("../controlers/c_postRespuesta");
const axios = require("axios");
const postRespuesta = async (req, res) => {
  try {
    const { preguntaId, opcionId, user, coef } = req.body;
    console.log(
      "lo que llega al post respuesta es: ",
      preguntaId,
      opcionId,
      user,
      coef
    );
    const createdRespuesta = await c_postRespuesta(
      preguntaId,
      opcionId,
      user,
      coef
    );
    return res.status(200).json(createdRespuesta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postRespuesta;
