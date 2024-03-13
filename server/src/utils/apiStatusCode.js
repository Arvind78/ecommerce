const apiStatusCodes = {
  // Success codes
  OK: { CODE: 200, MESSAGE: 'OK' },
  CREATED: { CODE: 201, MESSAGE: 'Created account created successfully' },
  ACCEPTED: { CODE: 202, MESSAGE: 'Accepted' },
  NO_CONTENT: { CODE: 204, MESSAGE: 'No Content' },

  BAD_REQUEST: { CODE: 400, MESSAGE: 'Bad Request' },
  UNAUTHORIZED: { CODE: 401, MESSAGE: 'Unauthorized' },
  FORBIDDEN: { CODE: 403, MESSAGE: 'Forbidden' },
  NOT_FOUND: { CODE: 404, MESSAGE: 'Not Found' },
  METHOD_NOT_ALLOWED: { CODE: 405, MESSAGE: 'Method Not Allowed' },
  CONFLICT: { CODE: 409, MESSAGE: 'Conflict' },
  UNPROCESSABLE_ENTITY: { CODE: 422, MESSAGE: 'Unprocessable Entity' },

  // Server error codes
  INTERNAL_SERVER_ERROR: { CODE: 500, MESSAGE: 'Internal Server Error' },
  NOT_IMPLEMENTED: { CODE: 501, MESSAGE: 'Not Implemented' },
  SERVICE_UNAVAILABLE: { CODE: 503, MESSAGE: 'Service Unavailable' },
};

const { INTERNAL_SERVER_ERROR } = apiStatusCodes;

module.exports = { INTERNAL_SERVER_ERROR };
