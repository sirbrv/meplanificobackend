const router = require("express").Router();
const configMvc = require("../controllers/configController");

/** ******************************************* */
/* Rutas de acceso para ingrementar modulos */
/** ******************************************* */
router.post("/:id", configMvc.createConfig);
router.put("/:id", configMvc.incrementConfig);

module.exports = router;