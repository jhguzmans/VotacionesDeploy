const { User } = require("../db");

const c_getCuorum = async () => {
  try {
    const users = await User.findAll({ where: { ingreso: true } });
    let sumaCoeficientes = 0;
    users.forEach((user) => {
      sumaCoeficientes += user.coef;
    });
    return sumaCoeficientes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_getCuorum;
