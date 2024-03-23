const c_postIngreso = require("../controlers/c_postIngreso");
const axios = require("axios");
const postIngreso = async (req, res) => {
  try {
    const { username } = req.body;
    const createdPregunta = await c_postIngreso(username);
    return res.status(200).json(createdPregunta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postIngreso;
