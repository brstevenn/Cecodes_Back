const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const SubTypeInferiorValue = sequelize.define('ValorSubTipoInferior', {
  valorSubTipoInferiorId: {
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

module.exports = SubTypeInferiorValue;
