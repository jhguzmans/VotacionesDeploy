const { User } = require("../db");

const c_getCuorum = async () => {
  try {
    const users = await User.findAll({ where: { ingresa: true } });
    console.log("los usuarios que han ingresado son: ", users);
    sumaCoeficientes = 0;
    users.forEach((user) => {
      sumaCoeficientes += parseFloat(user.coef);
    });
    return sumaCoeficientes.toFixed(4); // Redondeamos a 4 decimales
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = c_getCuorum;
