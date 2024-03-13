/**
 * Generates a JWT token using the provided user ID and the access token secret from environment variables.
 * @param {Object} user - The user object containing the user ID.
 * @returns {string} - The generated JWT token.
 */

const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user) => {
  return Jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
