const c_getAptosByTorre = require("../controlers/c_getAptosByTorre");
const getAptosByTorre = async (req, res) => {
  try {
    const { torre } = req.params;
    console.log("La torre es: " + torre);
    const data = await c_getAptosByTorre(torre);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getAptosByTorre;
