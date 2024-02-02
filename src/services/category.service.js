const { Category } = require('../models');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

const create = async (newCategoryData) => {
  const { name } = newCategoryData;

  const categoryExists = await Category.findOne({
    where: { name },
  });

  if (categoryExists) {
    return formatErrorResponse('CONFLICT', 'Category already registered');
  }

  const createdCategory = await Category.create({ name });

  return { status: 'CREATED', data: createdCategory };
};

const getAll = async () => {
  const categoryList = await Category.findAll();

  return formatSuccessResponse(categoryList);
};

module.exports = {
  create,
  getAll,
};
