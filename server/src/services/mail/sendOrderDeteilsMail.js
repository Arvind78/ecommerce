const createTransporter = require('./mailTransporter.js');

/**
 * Sends an email to the user with their order tracking information.
 *
 * @param {Object} user - The user object containing their email address and name.
 * @param {Object} order - The order object containing the order ID and tracking ID.
 *
 * @throws {Error} - Throws an error if user, order, or tracking ID is missing.
 */

const sendOrderTrackingEmail = async (user, order) => {
  console.log('Sending order tracking email...', user);
  try {
    // Validate user and order data (add validation for security)
    if (!user || !order || !order.trackingId) {
      throw new Error('Missing user or order information or tracking ID.');
    }

    const emailContent = `
        <html>
          <head>
            <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
  
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
  
              h1 {
                color: #333;
              }
  
              p {
                color: #666;
              }
  
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4caf50;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
              }
              </style>
          </head>
          <body>
            <div class="container">
              <h1>Hi ${user.name},</h1>
              <p>Your recent order from ShopNow (Order #${order._id}) is on its way!</p>
              <p>You can track your order's progress using the following tracking ID:</p>
              <p><b>Tracking ID: ${order.trackingId}</b></p>
              <p>Click the link below to view your order details and track its progress:</p>
              <a href="http://localhost:5173/myaccount?trackingId=${order.trackingId}">Track Your Order</a>
              <p>We appreciate your business and look forward to serving you again soon!</p>
              <p>Best regards,</p>
              <p>The ShopNow Team</p>
            </div>
          </body>
        </html>
      `;

    const mailOptions = {
      from: process.env.MAIL_AUTH_USER,
      to: user.email,
      subject: `ShopNow Order Tracking (Order #${order._id})`,
      html: emailContent,
    };

    await createTransporter().sendMail(mailOptions); // Use await for proper error handling
    console.log('Order tracking email sent:', mailOptions.to);
  } catch (error) {
    console.error('Error sending order tracking email:', error);
    // Handle errors appropriately, e.g., log, notify admin, etc.
  }
};

module.exports = sendOrderTrackingEmail;
