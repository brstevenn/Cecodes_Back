const Main = require('./main');
const Scope = require('./scope');
const Values = require('./values')
const Month = require('./month');

Main.hasMany(Scope, {
  foreignKey: 'principalId',
});

Main.hasMany(Values, {
  foreignKey: 'principalId',
});

Values.belongsTo(Month, {
  foreignKey: 'mesId',
  as: 'Month',
});

module.exports = {
  Main,
  Scope,
  Values,
  Month
};
