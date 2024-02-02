const route = require('express').Router();
const { categoryController } = require('../controllers');
const { categoryValidation } = require('../middlewares/categoryValidation');
const tokenValidation = require('../middlewares/jwtValidation');

route.post('/', tokenValidation, categoryValidation, categoryController.create);
route.get('/', tokenValidation, categoryController.getAll);

module.exports = route;
