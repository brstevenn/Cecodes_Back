const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Main = sequelize.define('Principal', {
  principalId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  año: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Main;
