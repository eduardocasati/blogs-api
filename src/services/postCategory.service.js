const { PostCategory } = require('../models');

const bulkCreate = async (postsCategories) => {
  const newPostCategories = await PostCategory.bulkCreate(postsCategories);

  return { status: 'CREATED', data: newPostCategories };
};

module.exports = {
  bulkCreate,
};
