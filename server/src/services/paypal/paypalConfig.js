/**
 * Configures the PayPal REST API SDK for use in the application.
 *
 * This function initializes the `paypal-rest-sdk` with the provided environment and credentials.
 * It's recommended to use environment variables (`process.env`) to store sensitive information
 * like client ID and secret key for security reasons.
 *
 * @returns {Object} The configured `paypal-rest-sdk` instance.
 */

const paypal = require('paypal-rest-sdk');

const configurePaypalGateway = () => {
  paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY,
  });
  return paypal;
};

module.exports = configurePaypalGateway;
