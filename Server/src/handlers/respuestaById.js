const c_getRespuestaById = require("../controlers/c_getRespuestaById");
const getRespuestaById = async (req, res) => {
  try {
    const { opcionId } = req.query;
    console.log("La opcion de respuesta es: " + opcionId);
    const data = await c_getRespuestaById(opcionId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getRespuestaById;
