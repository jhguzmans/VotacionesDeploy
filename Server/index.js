// const axios = require("axios");
// const server = require("./src/server");
// const { conn } = require("./src/db.js");
// require("dotenv").config();

// const { PORT } = process.env;
// conn
//   .sync()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.error(error));

  



  const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();

const { PORT } = process.env;

async function startServer() {
  try {

    await conn.sync();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {

    console.log("Database not ready, retrying in 5 seconds...");
    console.error(error.message);

    setTimeout(startServer, 5000);

  }
}

startServer();