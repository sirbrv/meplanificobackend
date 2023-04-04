const configSchema = require("../models/configModel");

exports.configController = async (req, res) => {
  const options = {
    offset: req.query.offset ? req.query.offset : 0,
    limit: req.query.limit ? req.query.limit : 10,
  };
  if (options.offset <= 0) {
    options.offset = 1;
  }
  try {
    const config = await configSchema.paginate(
      {},
      options,
      function (err, result) {
        if (err) {
          return err;
        }
        return result;
      }
    );
    if (config.docs.length > 0) {
      res.json({
        status: "200",
        msg: "config Registrados..",
        data: config,
      });
    } else {
      res.json({
        status: "409",
        msg: "No hay Información Registrada",
      });
    }
  } catch (error) {
    res.json({
      status: "400",
      msg: error.message,
    });
  }
};

exports.config = async (req, res) => {
  let { id } = req.params;

  if (existeConfig != null) {
    if (existeConfig) {
    } else {
      existeConfig = new ConfigFile();
      existeConfig.seq = 1;
    }
  }
  try {
    await existeConfig.save();
    res.json({
      status: "200",
      msg: "El registro fué Creado",
      data: existeConfig,
    });
  } catch (error) {
    res.json({
      status: "409",
      msg: error.message,
    });
  }
};

exports.getConfig = async (req, res) => {
  let { id } = req.params;
  const existeConfig = await configSchema.findOne({ _id: id });
  if (!existeConfig) {
    return res.json({
      status: "404",
      msg: "El ID no está registrado",
    });
  }
  res.json({
    status: "200",
    data: existeConfig,
  });
};

exports.createConfig = async (req, res) => {
  let { id } = req.params;
  const existeConfig = await configSchema.findOne({
    modulo: id,
  });
  if (existeConfig != null) {
    return res.json({
      status: "400",
      msg: "El Config ya está registrado",
    });
  }

  const newConfig = new configSchema();
  (newConfig.seq = 1), (newConfig.modulo = id);
  try {
    await newConfig.save();
    res.json({
      status: "201",
      msg: "El registro fué Creado",
      data: newConfig,
    });
  } catch (error) {
    res.json({
      status: "409",
      msg: error.message,
    });
  }
};

exports.incrementConfig = async (req, res) => {
  let { id } = req.params;
  try {
    const existeConfig = await configSchema.findOne({
      modulo: id,
    });
    let valor = existeConfig.seq;
    existeConfig.seq = valor + 1;
    await existeConfig.save();
    return res.json({
      status: "200",
      msg: "Actualización realizada exitosamente",
      data: existeConfig,
    });
  } catch (error) {
    res.json({
      status: "400",
      msg: error.message,
    });
  }
};

exports.deleteConfig = async (req, res, next) => {
  const id = req.params.id;
  try {
    await configSchema.deleteOne({ _id: id });
    return res.json({
      status: "200",
      msg: "Registro Eliminado.",
    });
  } catch (error) {
    res.json({
      status: "400",
      msg: error,
    });
  }
};
