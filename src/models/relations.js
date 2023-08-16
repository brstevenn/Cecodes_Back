const Main = require('./main');
const Scope = require('./scope');
const SubTypeInferior = require('./subTypeInferior');
const Type = require('./type');
const SubType = require('./subType');
const Month = require('./month');
const MonthLog = require('./monthLog');
const TypeValue = require('./typeValue');
const SubTypeValue = require('./subTypeValue');
const SubTypeInferiorValue = require('./subTypeInferiorValue');

Main.hasMany(Scope, {
  foreignKey: 'principalId',
});


Scope.hasMany(Type, {
  foreignKey: 'alcanceId',
});


Type.hasMany(SubType, {
  foreignKey: 'tipoId',
});

Type.hasMany(TypeValue, {
  foreignKey: 'tipoId'
})


SubType.hasMany(SubTypeInferior, {
  foreignKey: 'subTipoId',
});

SubType.hasMany(SubTypeValue, {
  foreignKey: 'subTipoId'
})


SubTypeInferior.hasMany(SubTypeInferiorValue, {
  foreignKey: 'subTipoInferiorId'
})

module.exports = {
  Main,
  Scope,
  SubTypeInferior,
  Type,
  SubType,
  Month,
  MonthLog,
};
