const getMappedHTTPStatus = (status) => {
  const httpStatusMap = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
  };

  return httpStatusMap[status] || 500;
};

module.exports = getMappedHTTPStatus;
