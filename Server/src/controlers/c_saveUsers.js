const { User } = require("../db");
// const bcrypt = require("bcrypt");

const c_saveUsers = async (userData) => {
  if (!userData || !Array.isArray(userData)) {
    throw new Error("Los datos de usuario no son válidos");
  }

  const failedInserts = [];

  for (let i = 0; i < userData.length; i++) {
    const rowData = userData[i];
    try {
      // const hashedPassword = bcrypt.hashSync(String(rowData.pass), 10);
      // rowData.pass = hashedPassword;
      await User.create(rowData);
    } catch (error) {
      console.error("Error creando entidad:", error);
      failedInserts.push(rowData);
    }
  }

  return { failedInserts };
};

module.exports = c_saveUsers;
