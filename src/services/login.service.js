const { User } = require('../models');
const generateJWT = require('../utils/generateJWT');

const authenticateUser = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const token = generateJWT(user.dataValues);

  return { status: 'SUCCESS', data: { token } };
};

module.exports = {
  authenticateUser,
};
