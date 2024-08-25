const c_getVerificarVoto = require("../controlers/c_getVerificarVoto");

const getVerificarVoto = async (req, res) => {
  try {
    const { preguntaId, userId } = req.query;

    const data = await c_getVerificarVoto(preguntaId, userId);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getVerificarVoto;
