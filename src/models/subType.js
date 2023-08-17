const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const SubType = sequelize.define('SubTipo', {
  subTipoId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = SubType;
