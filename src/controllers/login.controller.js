const { loginService } = require('../services');
const getMappedHTTPStatus = require('../utils/httpStatusMap');
const handleError = require('../utils/errorHandler');

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, data } = await loginService.authenticateUser(
      email,
      password,
    );

    const statusCode = getMappedHTTPStatus(status);
    return res.status(statusCode).json(data);
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  handleLogin,
};
