const { Router } = require("express");

const getUsers = require("../handlers/getUsers");
const getAptosByTorre = require("../handlers/getAptosByTorre");
const postUser = require("../handlers/postUser");
const saveUsers = require("../handlers/saveUsers");
const getTorresByConj = require("../handlers/getTorresByConj");
const getConj = require("../handlers/getConj");
const loginUser = require("../controlers/loginUser");
const postPregunta = require("../handlers/postPregunta");
const getPregunta = require("../handlers/getPregunta");
const postRespuesta = require("../handlers/postRespuesta");
const getRespuestaByPregunta = require("../handlers/getRespuestaByPregunta");
// const getActivities = require("../handlers/getActivities");
// const deleteActivity = require("../handlers/deleteActivity");

const router = Router();

router.get("/users", getUsers);
router.get("/aptos/:torre", getAptosByTorre);
router.get("/torres/", getTorresByConj);
router.get("/conjs/", getConj);
router.post("/user", postUser);
router.post("/login", loginUser);
// router.get("/activities", getActivities);
router.post("/save", saveUsers);
router.post("/crearPregunta", postPregunta);
router.get("/ultimaPregunta", getPregunta);
router.post("/enviarRespuesta", postRespuesta);
router.get("/yavoto", getRespuestaByPregunta);
// router.delete("/activity/:id", deleteActivity);
module.exports = router;
