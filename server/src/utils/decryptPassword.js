const bcrypt = require('bcryptjs');

/**
 * Compares a plain password with a hashed password to check for a match.
 * @param {string} password - The plain password to compare.
 * @param {string} hashPassword - The hashed password to compare against.
 * @returns {boolean} - Returns true if the passwords match, false otherwise.
 */

const decryptPassword = async (password, hashPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashPassword);
    return passwordMatch;
  } catch (err) {
    throw err;
  }
};

module.exports = decryptPassword;
