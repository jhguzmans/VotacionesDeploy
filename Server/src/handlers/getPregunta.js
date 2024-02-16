const c_getPregunta = require("../controlers/c_getPregunta");
const getPregunta = async (req, res) => {
  try {
    const data = await c_getPregunta();
    console.log("La data es: " + data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = getPregunta;
