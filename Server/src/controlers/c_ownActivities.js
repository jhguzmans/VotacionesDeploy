const axios = require("axios");

const activities = [
  {
    name: "Futbol",
    dificult: "5",
    duration: "2",
    season: "Verano",
    countriesName: ["Bolivia", "Chile", "Venezuela", "Colombia", "Spain"],
  },
  {
    name: "Sky",
    dificult: "2",
    duration: "6",
    season: "Invierno",
    countriesName: ["Romania", "Monaco", "Portugal", "Spain"],
  },
  {
    name: "qlear",
    dificult: "2",
    duration: "6",
    season: "Verano",
    countriesName: ["Bolivia", "Chile", "Venezuela"],
  },
];

const URL = "http://localhost:3001/activities";

const c_ownActivities = async () => {
  try {
    const postPromises = activities.map(async (activity) => {
      await axios.post(URL, activity);
      console.log("Se guardó la actividad", activity.name);
    });

    await Promise.all(postPromises);
  } catch (error) {
    console.error("Ocurrió un error al guardar las actividades:", error);
  }
};

module.exports = c_ownActivities;
