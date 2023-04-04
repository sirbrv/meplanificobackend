const router = require("express").Router();
const ingresos = require("../controllers/ingresosController");
const gastos = require("../controllers/gassosController");
const planes = require("../controllers/planesController");
const repotr = require("../controllers/reportController");

/** ******************************************* */
/* Rutas de acceso al catálogo de gastos      */
/** ******************************************* */

router.get("/gasto/", gastos.getGastos);
router.get("/gasto/:id", gastos.getGasto);
router.post("/gasto/", gastos.createGasto);
router.put("/gasto/:id", gastos.updateGasto);
router.delete("/gasto/:id", gastos.deleteGasto);

/** ******************************************* */
/* Rutas de acceso al catálogo de ingresos      */
/** ******************************************* */

router.get("/ingreso/", ingresos.getIngresos);
router.get("/ingreso/:id", ingresos.getIngreso);
router.post("/ingreso/", ingresos.createIngreso);
router.put("/ingreso/:id", ingresos.updateIngreso);
router.delete("/ingreso/:id", ingresos.deleteIngreso);

/** ******************************************* */
/* Rutas de acceso al catálogo de ´planes      */
/** ******************************************* */

router.get("/plan/", planes.getPlanes);
router.get("/plan/:id", planes.getPlan);
router.post("/plan/", planes.createPlan);
router.put("/plan/:id", planes.updatePlan);
router.delete("/plan/:id", planes.deletePlan);

/** ******************************************* */
/* Rutas de acceso al catálogo de ´reportes      */
/** ******************************************* */

router.get("/edocta/", repotr.getEdoCta);
router.get("/plan/:id", planes.getPlan);
router.post("/plan/", planes.createPlan);
router.put("/plan/:id", planes.updatePlan);
router.delete("/plan/:id", planes.deletePlan);
module.exports = router;
