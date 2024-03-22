const axios = require("axios");
const { User } = require("../db");
const Sequelize = require("sequelize");
const xlsx = require("xlsx");
//const bcrypt = require("bcrypt");

const c_saveUsers = async () => {
  const workbook = xlsx.readFile(
    "D:/Escritorio/baseDeDatosPruebaConjuntos.xlsx"
  );
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  if (!data) throw new Error("Error al guardar los datos en la DB");

  data.forEach(async (rowData) => {
    try {
      // const hashedPassword = bcrypt.hashSync(String(rowData.pass), 10);
      // rowData.pass = hashedPassword;
      await User.create(rowData);
    } catch (error) {
      console.log(rowData);
      console.error("Error creando entidad:", error);
    }
  });
};

module.exports = c_saveUsers;
