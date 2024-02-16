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
  nameApoderado
) => {
  try {
    const newUser = {
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
    const createdUser = await User.create(newUser);

    return createdUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = c_postUser;
