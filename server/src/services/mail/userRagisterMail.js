/**
 * Sends a congratulations email to the user upon successful registration.
 * @param {object} user - The user object containing user details.
 */

const mailTransporter = require('./mailTransporter.js');

const sendCongratulationsEmail = (user) => {
  console.log(user);
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
          <h1>Congratulations, ${user.firstName}!</h1>
          <p>Welcome to our ShopNow E-commerce community. We are thrilled to have you as part of our family.</p>
          <p>Your registration was successful. Now you can explore our vast selection of products, amazing deals, and connect with other shoppers.</p>
          <p>Thank you for choosing ShopNow for your online shopping needs!</p>
          <p>Best regards,</p>
          <p>The ShopNow Team</p>
          <a href="https://shopnow.com" class="button">Start Shopping</a>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.MAIL_AUTH_USER,
    to: user.email,
    subject: 'Welcome to ShopNow E-commerce!',
    html: emailContent,
  };

  // Send the email
  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendCongratulationsEmail;
