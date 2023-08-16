const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const TypeValue = sequelize.define('ValorTipo', {
  valorTipoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = TypeValue;
