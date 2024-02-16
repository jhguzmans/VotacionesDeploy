const axios = require("axios");
const c_saveUsers = require("../controlers/c_saveUsers");

const saveUsers = async (req, res) => {
  try {
    const data = await c_saveUsers();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = saveUsers;
