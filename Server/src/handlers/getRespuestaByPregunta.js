const c_getRespuestaByPregunta = require("../controlers/c_getRespuestaByPregunta");
const getRespuestaByPregunta = async (req, res) => {
  const { preguntaId, user } = req.query;
  try {
    const data = await c_getRespuestaByPregunta(preguntaId, user);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = getRespuestaByPregunta;
