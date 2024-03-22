const axios = require("axios");
const c_saveUsers = require("../controlers/c_saveUsers");

const saveUsers = async (req, res) => {
  try {
    const { users } = req.body; // Suponiendo que el body contiene un objeto con una propiedad llamada 'users' que es un arreglo de objetos
    const data = await c_saveUsers(users);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = saveUsers;
