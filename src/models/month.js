const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Month = sequelize.define('Mese', {
  mesId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Month;
