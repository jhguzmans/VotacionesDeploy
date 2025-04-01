const { User, Admin } = require("../db");
const c_postUser = async (
  pass,
  torre,
  apto,
  torreApt,
  idUser,
  nameUser,
  user2,
  idUser2,
  nameUser2,
  apoderado,
  idApoderado,
  nameApoderado, conj
) => {
  try {
    const newUser = {
      conj,
      pass,
      torre,
      apto,
      torreApt,
      idUser,
      nameUser,
      user2,
      idUser2,
      nameUser2,
      apoderado,
      idApoderado,
      nameApoderado,
    };
    console.log("Lo que se envía a la base de datos es: ");
    console.log(newUser);
    
    
    const createdUser = await User.create(newUser);

    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = c_postUser;
