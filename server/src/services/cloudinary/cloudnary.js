/**
 * Configures the Cloudinary client with the provided credentials.
 * Uses environment variables for Cloudinary cloud name, API key, and API secret.
 * @returns {object} Cloudinary client instance configured with the provided credentials.
 */

const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv').config();

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  });
  return cloudinary;
};

module.exports = configureCloudinary;
