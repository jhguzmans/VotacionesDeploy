const c_getConj = require("../controlers/c_getConj");
const getConj = async (req, res) => {
  try {
    const data = await c_getConj();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getConj;
