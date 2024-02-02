const { BlogPost, Category, PostCategory, User } = require('../models');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

const create = async (newPostData) => {
  const newPost = await BlogPost.create(newPostData);

  return { status: 'CREATED', data: newPost };
};

const getAll = async () => {
  const postList = await BlogPost.findAll({
    include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
  });

  return formatSuccessResponse(postList);
};

const getById = async (id) => {
  const foundPost = await BlogPost.findOne({
    where: { id },
    include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
  });

  if (!foundPost) {
    return formatErrorResponse('NOT_FOUND', 'Post does not exist');
  }

  return formatSuccessResponse(foundPost);
};

const update = async (id, title, content) => {
  const updatedPost = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  return formatSuccessResponse(updatedPost);
};

const deleteById = async (postId, userId) => {
  const postToDelete = await BlogPost.findOne({
    where: { id: postId },
  });

  if (!postToDelete) {
    return formatErrorResponse('NOT_FOUND', 'Post does not exist');
  }

  if (postToDelete.userId !== userId) {
    return formatErrorResponse('UNAUTHORIZED', 'Unauthorized user');
  }

  await PostCategory.destroy({ where: { postId } });

  await BlogPost.destroy({ where: { id: postId } });

  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
