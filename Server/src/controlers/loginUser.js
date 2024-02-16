const { User } = require("../db");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { conjTorreApto: username } });
    if (user && bcrypt.compareSync(password, user.pass)) {
      res.json({ user });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error de inicio de sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
module.exports = loginUser;
