const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const MonthLog = sequelize.define('RegistroMes', {
  registroMesId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = MonthLog;
