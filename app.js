var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
//var logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const paginate = require("express-paginate");

var app = express();
// para linitar accesos
/*
var corOptions = {
    origin: 'https://localhost'
}
app.use(cors());
app.use(cors(corOptions))
*/

var corOptions = {
  origin: "http://localhost:4000",
  origin: "https://git.heroku.com/meplanificoserver.git",
};
//app.use(logger("dev"));
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());

app.use("/apie/img", express.static(path.join(__dirname, "/public/images")));
app.get("/api/img/:id", function (req, res) {
  console.log("Nombre de la image..;,", req.params);
  console.log(__dirname + `/public/images/${req.params.id}`);
  res.send(__dirname + `/public/images/${req.params.id}`);
});
// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(paginate.middleware(10, 50));
// Assign Routes
app.use("/", require("./routes/index"));
app.use("/api/admin", require("./src/routes/adminRouter"));
app.use("/api/gestion", require("./src/routes/gestionRouter"));
//app.use("/api/config", require("./src/routes/config"));

module.exports = app;
