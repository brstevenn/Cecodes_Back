var express = require('express');
var router = express.Router();

const mysqlDataController = require('../controllers/mysqlDataController');

router.route('/mysql').get(mysqlDataController.getAll).post(mysqlDataController.newData);
router.route('/mysql/create-tables').post(mysqlDataController.createTables); // Nueva ruta para crear las tablas

module.exports = router;
