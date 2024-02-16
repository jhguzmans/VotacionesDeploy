const c_getUsers = require("../controlers/c_getUsers");
const getUsers = async (req, res) => {
  try {
    const data = await c_getUsers();
    console.log("La data es: " + data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = getUsers;
