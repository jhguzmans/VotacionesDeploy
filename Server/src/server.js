const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(
  cors({
    origin: "*", // Permitir solicitudes solo desde este dominio
    methods: "GET, POST, PUT, DELETE, PATCH ", // Opcional: Especificar los métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Opcional: Especificar los encabezados permitidos }));
  })
);
server.use(router);

module.exports = server;
