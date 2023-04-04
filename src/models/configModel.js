let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var ConfigSchema = Schema({
  modulo: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date, default: Date.now },
  seq: { type: Number, default: 0 },
});

var config = mongoose.model("config", ConfigSchema);
module.exports = config;
