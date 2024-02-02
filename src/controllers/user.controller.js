const { userService } = require('../services');
const getMappedHTTPStatus = require('../utils/httpStatusMap');
const { handleInternalServerError } = require('../utils/errorHandler');

const create = async (req, res) => {
  try {
    const newUserData = req.body;
    const { status, data } = await userService.create(newUserData);
    
    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { status, data } = await userService.getAll();

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.getById(id);

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

const deleteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, data } = await userService.deleteById(userId);

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
  deleteById,
};
