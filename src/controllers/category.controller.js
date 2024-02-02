const { categoryService } = require('../services');
const getMappedHTTPStatus = require('../utils/httpStatusMap');
const { handleInternalServerError } = require('../utils/errorHandler');

const create = async (req, res) => {
  try {
    const newCategoryData = req.body;
    const { status, data } = await categoryService.create(newCategoryData);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { status, data } = await categoryService.getAll();

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

module.exports = {
  create,
  getAll,
};
