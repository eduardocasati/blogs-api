const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secretJWT';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const jwtToken = jwt.sign(payload, JWT_SECRET_KEY, JWT_CONFIG);
  return jwtToken;
};

module.exports = generateJWT;
