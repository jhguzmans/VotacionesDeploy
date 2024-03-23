const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (username) => {
  try {
    await User.update(
      { ingresa: true },
      { where: { torreApto: { [Op.like]: `%${username}%` } } }
    );
    return "Entidad modificada correctamente";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
