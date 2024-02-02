const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secretJWT';

function extractToken(bearerToken) {
  const tokenParts = bearerToken.split(' ');
  return tokenParts.length === 2 ? tokenParts[1] : bearerToken;
}

const tokenValidation = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const jwtToken = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;
