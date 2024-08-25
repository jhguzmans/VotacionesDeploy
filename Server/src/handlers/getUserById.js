const c_getUserById = require("../controlers/c_getUserById");
const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await c_getUserById(userId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = getUserById;
