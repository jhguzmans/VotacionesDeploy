const { User } = require("../db");

const c_postIngreso = async (username) => {
  try {
    await User.update({ ingreso: true }, { where: { torreApto: username } });
    return "Entidad modificada correctamente";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
