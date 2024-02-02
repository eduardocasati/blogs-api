const route = require('express').Router();
const { blogPostController } = require('../controllers');
const { createPostValidation, updatePostValidation } = require('../middlewares/blogPostValidation');
const tokenValidation = require('../middlewares/jwtValidation');

route.post('/', tokenValidation, createPostValidation, blogPostController.create);
route.get('/', tokenValidation, blogPostController.getAll);
route.get('/:id', tokenValidation, blogPostController.getById);
route.put('/:id', tokenValidation, updatePostValidation, blogPostController.update);
route.delete('/:id', tokenValidation, blogPostController.deleteById);

module.exports = route;
