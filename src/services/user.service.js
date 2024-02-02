const { BlogPost, PostCategory, User } = require('../models');
const generateJWT = require('../utils/generateJWT');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

const create = async (newUserData) => {
  const { displayName, email, password, image } = newUserData;

  const userExists = await User.findOne({
    where: { email },
  });

  if (userExists) {
    return formatErrorResponse('CONFLICT', 'User already registered');
  }

  await User.create({ displayName, email, password, image });

  const authenticationToken = generateJWT({ displayName, email, image });

  return { status: 'CREATED', data: { token: authenticationToken } };
};

const getAll = async () => {
  const userList = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return formatSuccessResponse(userList);
};

const getById = async (id) => {
  const foundUser = await User.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!foundUser) {
    return formatErrorResponse('NOT_FOUND', 'User does not exist');
  }

  return formatSuccessResponse(foundUser);
};

const deleteById = async (userId) => {
  const userPosts = await BlogPost.findAll({
    attributes: ['id'],
    where: { userId },
  });

  const postIds = userPosts.map((post) => post.id);

  await PostCategory.destroy({
    where: { postId: postIds },
  });

  await BlogPost.destroy({
    where: { userId },
  });

  await User.destroy({
    where: { id: userId },
  });

  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
