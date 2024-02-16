const axios = require("axios");
const c_deleteActivity = require("../controlers/c_deleteActivity");

const saveCountries = async (req, res) => {
  const { id } = req.params;
  console.log("El id para borrar es: ", id);
  try {
    const data = await c_deleteActivity(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = saveCountries;
