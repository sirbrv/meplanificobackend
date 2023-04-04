// Patches
const { inject, errorHandler } = require("express-custom-error");
inject(); // Patch express in order to use async / await syntax
//const logger = require("./src/util/logger");

// Load .env Enviroment Variables to process.env
require("dotenv").config();
const PORT = process.env.PORT || "4000";

// open database
const db = require("./src/configDB/configDB.js");

// Instantiate an Express Application
var app = require("./app");
var debug = require("debug")("server:server");
var http = require("http");

// Handle errors

app.use(errorHandler());
app.get("/:img", function (req, res) {
  res.sendFile(__dirname + `/imagenes/${img}`);
});
// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));
