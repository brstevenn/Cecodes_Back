const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Values = sequelize.define('Value', {
  valueId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Values;
