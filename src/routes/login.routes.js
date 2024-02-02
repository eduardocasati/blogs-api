const route = require('express').Router();
const { loginController } = require('../controllers');
const loginValidation = require('../middlewares/loginValidation');

route.post('/', loginValidation, loginController.handleLogin);

module.exports = route;
