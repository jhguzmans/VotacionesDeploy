const c_getCuorum = require("../controlers/c_getCuorum");
const getCuorum = async (req, res) => {
  try {
    const data = await c_getCuorum();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getCuorum;
