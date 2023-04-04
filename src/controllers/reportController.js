const { planes } = require("../configDB/configDB");
const { gastos } = require("../configDB/configDB");
const { ingresos } = require("../configDB/configDB");
const db = require("../configDB/configDB");
const Planes = db.planes;
const Gastos = db.gastos;
const Ingresos = db.ingresos;
const Op = db.Sequelize.Op;
let inputRt = new Array();
let dataPlanes = [];
let dataGastos = [];
let dataIngresos = [];
exports.getEdoCta = async (req, res) => {
 /* console.log("************************************************");
  console.log("Requerimiento....:", req.query);
  console.log("************************************************"); */
  let page = 0;
  let limit = 100;
  const offset = page * limit;
  await Planes.findAndCountAll({
    where: {
      email: { [Op.like]: `%${req.query.email}%` },
      year: { [Op.like]: `%${req.query.shYear}%` },
      mes: { [Op.like]: `%${req.query.shMes}%` },
    },
    limit,
    offset,
  }).then((data) => {
    const { count: totalItems, rows: datos } = data;
    //   const response = getPagingData(data, page, limit);
    dataPlanes = datos;
    ///  console.log("dataPlanes.....:", dataPlanes);
  });
 // console.log("Sali de planes....");
  /***************************************************** */
  let startFecha = fnStartFecha(req.query.shMes, req.query.shYear);
  let endFecha = fnEndFecha(req.query.shMes, req.query.shYear);
 // console.log(startFecha, endFecha);
  await Ingresos.findAndCountAll({
    where: {
      fecha: {
        [Op.between]: [startFecha, endFecha],
      },
      email: { [Op.like]: `%${req.query.email}%` },
    },
    limit,
    offset,
  }).then((data) => {
    const { count: totalItems, rows: datos } = data;
    dataIngresos = datos;
    // console.log(response);
  });
  /*****************************************************/
  await Gastos.findAndCountAll({
    where: {
      fecha: {
        [Op.between]: [startFecha, endFecha],
      },
      email: { [Op.like]: `%${req.query.email}%` },
    },
    limit,
    offset,
  }).then((data) => {
    const { count: totalItems, rows: datos } = data;
    dataGastos = datos;
    // console.log(response);
  });

  await gastoControl(dataIngresos, dataPlanes, dataGastos);
  /*  console.log( dataPlanes);
    console.log( dataGastos);
    console.log( dataIngresos); */
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: datos } = data;
  const currentPage = page > 0 ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { datos, totalItems, totalPages, currentPage };
};

const fnStartFecha = (month, year) => {
  month < 10 ? (month = "0" + month) : month;
  const date = year + "-" + month + "-01";
  //  console.log(date);
  return date;
};

const fnEndFecha = (month, year) => {
  month < 10 ? (month = "0" + month) : month;
  let date = year + "-" + month + "-31";
  if (month == 2) {
    date = year + "-" + month + "-29";
  }
  //  console.log(date);
  return date;
};

const gastoControl = (ingresos, planes, gastos) => {
  let idem = 0;
  console.log("Entre....", planes);
  /*    console.log("Entre....", planes);
    console.log("Entre....", gastos); */
  // ingresos.map((item) => (totalIngreso = totalIngreso + item.monto));

  planes.map((plan) => {
    subTotalGasto = 0;
    let cta = 0;
    let descripcion = "";
   // console.log("plan.id...:", plan.id);
    gastos.map((gasto) => {
    /*  console.log(
        "gasto.id...:",
        gasto.id,
        "**",
        gasto.tipoGasto,
        "==",
        plan.tipoGasto
      ); */
      if (gasto.tipoGasto == plan.tipoGasto) {
        subTotalGasto = subTotalGasto + gasto.monto;
        idem = idem + 1;
        inputRt.push({
          id: idem,
          fecha: gasto.fecha,
          descripcion: gasto.descripcion,
          tipo: cta == 0 ? gasto.tipoGastoDescripcion : "",
          monto: gasto.monto,
          dt: 1,
        });
        cta = cta + 1;
        descripcion = gasto.tipoGastoDescripcion;
      }
    });
    if (cta > 1) {
      idem = idem + 1;
      inputRt.push({
        id: idem,
        descripcion: "Sub total " + descripcion,
        monto: subTotalGasto,
        dt: 2,
      });
    }
   // console.log("Salida...:", inputRt);
    totalGasto = totalGasto + subTotalGasto;
  });

  idem = idem + 1;
  inputRt.push({
    id: idem,
    descripcion: "Total de Gastos...",
    monto: totalGasto,
    dt: 3,
  });
 // console.log(inputRt);
};
