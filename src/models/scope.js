const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Scope = sequelize.define('Alcance', {
  alcanceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Scope;
