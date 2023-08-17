const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const SubTypeInferior = sequelize.define('SubTipoInferior', {
  subTipoInferiorId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = SubTypeInferior;
