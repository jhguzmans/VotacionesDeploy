const c_postPregunta = require("../controlers/c_postPregunta");
const axios = require("axios");
const postUser = async (req, res) => {
  try {
    const { enunciado, opcionesRespuesta } = req.body;
    console.log("los datos que se envían en el handler son:");
    console.log(enunciado, opcionesRespuesta);
    const createdPregunta = await c_postPregunta(enunciado, opcionesRespuesta);
    return res.status(200).json(createdPregunta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postUser;
