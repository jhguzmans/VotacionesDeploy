const c_getTorresByConj = require("../controlers/c_getTorresByConj");
const getTorresByConj = async (req, res) => {
  try {
    const { conj } = req.query;
    console.log("El conjunto en el handler es: " + conj);
    const data = await c_getTorresByConj(conj);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = getTorresByConj;
