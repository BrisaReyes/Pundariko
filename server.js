
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY =
  process.env.FREEASTROAPI_API_KEY ||
  process.env.FREE_ASTRO_API_KEY;

app.use(express.static(__dirname));

app.get("/api/horoscopo", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: "Falta configurar FREEASTROAPI_API_KEY en Render"
      });
    }

    const url =
      "https://api.freeastroapi.com/api/v1/horoscope/daily/bulk";

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY
      }
    });

    const resultado = await respuesta.text();

    if (!respuesta.ok) {
      return res.status(respuesta.status).send(resultado);
    }

    res.type("application/json").send(resultado);

  } catch (error) {
    console.error("Error de horóscopo:", error);

    res.status(500).json({
      error: "No se pudo obtener el horóscopo"
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("UNIVERSO PUNDARIKO funcionando en puerto " + PORT);
});
