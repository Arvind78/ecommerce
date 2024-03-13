// Import required modules
const nodemailer = require('nodemailer');
const {
  MAIL_SETUP_ERROR,
  MAIL_SETUP_SUCCESS,
} = require('../../utils/mailMessages.js');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Creates a reusable transporter object using the SMTP transport protocol.
 *
 * @returns {Object} The Nodemailer transporter object configured for sending emails.
 */
const createTransporter = () => {
  // Configure the transporter object
  const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  });

  // Verify transporter connection
  mailTransporter.verify((err, success) => {
    if (err) {
      console.error(MAIL_SETUP_ERROR);
    } else {
      console.log(MAIL_SETUP_SUCCESS);
    }
  });

  // Return the transporter object
  return mailTransporter;
};

// Exports the function for use in other modules
module.exports = createTransporter;
