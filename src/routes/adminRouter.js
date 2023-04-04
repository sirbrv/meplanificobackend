const router = require("express").Router();
const userController = require("../controllers/usersController");
const tipoIngresoController = require("../controllers/tipoIngresosController");
const tipoGastoController = require("../controllers/tipoGastosController");
const condicionesController = require("../controllers/condicionesController");
const contactoController = require("../controllers/contactosController");

/*
const servicioMvc = require("../controllers/serviciosController");
const estacMvc = require("../controllers/estacController");
const costoMvc = require("../controllers/costoController");
const peajeMvc = require("../controllers/peajesController");


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

/** ************************************** */
/* Rutas de acceso al catálogo de servicio */
/** ************************************** */
/*
router.get("/servicio/", servicioMvc.serviciosController);
router.get("/servicio/:id", servicioMvc.getServicio);
router.post("/servicio/", servicioMvc.createServicio);
router.put("/servicio/:id", servicioMvc.updateServicio);
router.delete("/servicio/:id", servicioMvc.deleteServicio);

/** ************************************** */
/* Rutas de acceso al catálogo de peaje */
/** ************************************** */
/*
router.get("/peaje/", peajeMvc.peajesController);
router.get("/peaje/:id", peajeMvc.getPeaje);
router.post("/peaje/", peajeMvc.createPeaje);
router.put("/peaje/:id", peajeMvc.updatePeaje);
router.delete("/peaje/:id", peajeMvc.deletePeaje);

/** ************************************** */
/* Rutas de acceso al catálogo de costo */
/** ************************************** */
/*
router.get("/costo/", costoMvc.costoController);
router.get("/costo/:id", costoMvc.getCosto);
router.get("/origen/", costoMvc.getCostoOrigen);
router.get("/destino/:id", costoMvc.getCostoDestino);
router.post("/costo/", costoMvc.createCosto);
router.put("/costo/:id", costoMvc.updateCosto);
router.delete("/costo/:id", costoMvc.deleteCosto);


*/
module.exports = router;
