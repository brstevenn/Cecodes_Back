const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const SubTypeValue = sequelize.define('ValorSubTipo', {
  valorSubTipoId: {
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

module.exports = SubTypeValue;
