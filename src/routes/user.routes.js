const route = require('express').Router();
const { userController } = require('../controllers');
const validations = require('../middlewares/userValidation');
const tokenValidation = require('../middlewares/jwtValidation');

route.post(
  '/',
  validations.displayName,
  validations.email,
  validations.password,
  userController.create,
);
route.get('/', tokenValidation, userController.getAll);
route.get('/:id', tokenValidation, userController.getById);
route.delete('/me', tokenValidation, userController.deleteById);

module.exports = route;
