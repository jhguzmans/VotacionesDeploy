const c_postIngreso = require("../controlers/c_postIngreso");
//const axios = require("axios");
const postIngreso = async (req, res) => {
  try {
    const data = req.body; // Aquí está el cambio
    console.log("En el handler llega la data: ", data);
    
    const usuarioquellega = await c_postIngreso(data);
    return res.status(200).json(usuarioquellega);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = postIngreso;
