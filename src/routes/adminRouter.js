const router = require("express").Router();
const userController = require("../controllers/usersController");
const tipoIngresoController = require("../controllers/tipoIngresosController");
const tipoGastoController = require("../controllers/tipoGastosController");
const condicionesController = require("../controllers/condicionesController");
const contactoController = require("../controllers/contactosController");

/** ************************************* */
/* Rutas de acceso al catálogo de Usuarios */
/** ************************************* */

router.get("/user/", userController.usersController);
router.post("/user/", userController.createUsers);
router.post("/user/login", userController.loginUser);
router.get("/user/:id", userController.getUsers);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/user/cambio", userController.cambioClaveUser);

/** ******************************************* */
/* Rutas de acceso al catálogo de Condiciones       */
/** ******************************************* */

router.get("/Condicion/", condicionesController.getCondiciones);
router.get("/Condicion/:id", condicionesController.getCondicion);
router.post("/Condicion/", condicionesController.createCondicion);
router.put("/Condicion/:id", condicionesController.updateCondicion);
router.delete("/Condicion/:id", condicionesController.deleteCondicion);

/** ************************************** */
/* Rutas de acceso al catálogo de tipoIngresoes */
/** ************************************** */

router.get("/tipoIngreso/", tipoIngresoController.getTipoIngresos);
router.get("/tipoIngreso/:id", tipoIngresoController.getTipoIngreso);
router.post("/tipoIngreso/", tipoIngresoController.createTipoIngreso);
router.put("/tipoIngreso/:id", tipoIngresoController.updateTipoIngreso);
router.delete("/tipoIngreso/:id", tipoIngresoController.deleteTipoIngreso);

/** ************************************** */
/* Rutas de acceso al catálogo de contactos */
/** ************************************** */

router.get("/contact/", contactoController.getContactos);
router.get("/contact/:id", contactoController.getContacto);
router.post("/contact/", contactoController.createContacto);
router.put("/contact/:id", contactoController.updateContacto);
router.delete("/contact/:id", contactoController.deleteContacto);
router.get("/contact/:apellido", contactoController.getContactos);

/** ************************************** */
/* Rutas de acceso al catálogo de tipo Gastos */
/** ************************************** */

router.get("/tipoGasto/", tipoGastoController.getTipoGastos);
router.get("/tipoGasto/:id", tipoGastoController.getTipoGasto);
router.post("/tipoGasto/", tipoGastoController.createTipoGasto);
router.put("/tipoGasto/:id", tipoGastoController.updateTipoGasto);
router.delete("/tipoGasto/:id", tipoGastoController.deleteTipoGasto);

module.exports = router;
