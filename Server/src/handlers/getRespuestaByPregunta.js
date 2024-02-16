const c_getRespuestaByPregunta = require("../controlers/c_getRespuestaByPregunta");
const getRespuestaByPregunta = async (req, res) => {
  const { preguntaId, user } = req.query;
  console.log(
    "en el handler, la preguntaId es: ",
    preguntaId,
    "El usuario es: ",
    user
  );
  try {
    const data = await c_getRespuestaByPregunta(preguntaId, user);
    console.log("En el handler de getRespuestaByPregunta, La data es: " + data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = getRespuestaByPregunta;
