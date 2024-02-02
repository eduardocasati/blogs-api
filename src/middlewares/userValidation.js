const validateValue = (value, minLength, pattern) =>
  !value
  || (minLength && value.length < minLength)
  || (pattern && !pattern.test(value));

const validationMiddleware = (field, config) => (req, res, next) => {
  const value = req.body[field];

  if (validateValue(value, config.minLength, config.pattern)) {
    return res.status(400).json({
      message: config.errorMessage,
    });
  }

  next();
};

const validations = {
  displayName: validationMiddleware('displayName', {
    minLength: 8,
    errorMessage: '"displayName" length must be at least 8 characters long',
  }),

  email: validationMiddleware('email', {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: '"email" must be a valid email',
  }),

  password: validationMiddleware('password', {
    minLength: 6,
    errorMessage: '"password" length must be at least 6 characters long',
  }),
};

module.exports = validations;
