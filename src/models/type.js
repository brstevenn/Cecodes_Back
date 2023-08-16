const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Type = sequelize.define('Tipo', {
  tipoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Type;
