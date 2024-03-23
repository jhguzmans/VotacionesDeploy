const { User } = require("../db");

const c_postIngreso = async (username) => {
  try {
    await User.update(
      { ingresa: true },
      { where: { torreApto: this.toString(username) } }
    );
    return "Entidad modificada correctamente";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
