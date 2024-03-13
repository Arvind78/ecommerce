const bcrypt = require('bcryptjs');

/**
 * Hashes a plain password using bcrypt.
 * @param {string} password - The plain password to hash.
 * @returns {string} - The hashed password.
 * @throws {Error} - Throws an error if hashing fails.
 */

const encryptPassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    throw err;
  }
};

module.exports = encryptPassword;
