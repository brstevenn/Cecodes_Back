var express = require('express');
var router = express.Router();

const dataController = require('../controllers/dataController');

router.route('/').get(dataController.getAll).post(dataController.newData);

module.exports = router;
