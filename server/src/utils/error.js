/**
 * Creates a new error object with the specified status and message.
 * @param {number} status - The HTTP status code of the error.
 * @param {string} message - The error message.
 * @returns {Error} - The error object.
 */

const error = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

module.exports = error;
