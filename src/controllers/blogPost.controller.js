const { categoryService, blogPostService, postCategoryService } = require('../services');
const getMappedHTTPStatus = require('../utils/httpStatusMap');
const { handleInternalServerError } = require('../utils/errorHandler');

const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content, categoryIds } = req.body;

    const categoriesList = await categoryService.getAll();
    const existingCategoryIds = categoriesList.data.map((category) => category.dataValues.id);
    const areAllCategoryIdsValid = categoryIds.every((id) => existingCategoryIds.includes(id));

    if (!areAllCategoryIdsValid) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const { status, data } = await blogPostService.create({ title, content, userId });
    const postId = data.dataValues.id;
    const postCategoryRelations = categoryIds.map((categoryId) => ({ postId, categoryId }));

    await postCategoryService.bulkCreate(postCategoryRelations);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) { 
    return handleInternalServerError(res, error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { status, data } = await blogPostService.getAll();

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await blogPostService.getById(id);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const postId = +req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    if (postId !== userId) {
      return res.status(401).json({
        message: 'Unauthorized user',
      });
    }

    await blogPostService.update(postId, title, content);

    const { status, data } = await blogPostService.getById(postId);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const deleteById = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const { status, data } = await blogPostService.deleteById(postId, userId);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
