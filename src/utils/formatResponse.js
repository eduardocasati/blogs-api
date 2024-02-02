const formatSuccessResponse = (data) => ({ status: 'SUCCESS', data });

const formatErrorResponse = (status, message) => ({ status, data: { message } });

module.exports = {
  formatSuccessResponse,
  formatErrorResponse,
};
