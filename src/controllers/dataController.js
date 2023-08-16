const Data = require('../models/data');

const getAll = async (req, res) => {
  const code = await Data.find();
  res.json(code);
};

const newData = async (req, res) => {
  const base = new Data(req.body);
  console.log(base)
  try {
    const baseAlmacenada = await base.save();
    res.json(baseAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, newData };
