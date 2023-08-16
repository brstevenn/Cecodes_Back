const { Sequelize } = require('sequelize');

const { MYSQL_DATABASE_NAME, MYSQL_DATABASE_USER_NAME, MYSQL_DATABASE_USER_PASSWORD, MYSQL_DATABASE_HOST } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE_NAME, MYSQL_DATABASE_USER_NAME, MYSQL_DATABASE_USER_PASSWORD, {
  host: MYSQL_DATABASE_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Conexión a MySQL establecida correctamente al host: ${MYSQL_DATABASE_HOST}`);
  })
  .catch((error) => {
    console.error('Error al conectar a MySQL:', error);
    process.exit(1);
  });

module.exports = sequelize;
