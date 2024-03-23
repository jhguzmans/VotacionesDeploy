const { User } = require("../db");
const { Op } = require("sequelize");

const c_postIngreso = async (username) => {
  try {
    const updatedEntity = await User.update(
      { ingresa: true },
      { where: { torreApto: { [Op.like]: `%${username}%` } }, returning: true }
    );

    const [numOfAffectedRows, [updatedUser]] = updatedEntity;

    if (numOfAffectedRows > 0) {
      return updatedUser;
    } else {
      throw new Error("No se encontró ninguna entidad para actualizar");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_postIngreso;
