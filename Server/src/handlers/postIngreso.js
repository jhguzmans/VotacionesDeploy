const c_postIngreso = require("../controlers/c_postIngreso");
//const axios = require("axios");
const postIngreso = async (req, res) => {
  try {
    const { username } = req.params; // Aquí está el cambio
    console.log("El username en el postIngreso es: ", username);
    const usuarioquellega = await c_postIngreso(username);
    return res.status(200).json(usuarioquellega);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postIngreso;
