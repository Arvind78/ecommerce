const createTransporter = require('./mailTransporter');

const sendUserResetPasswordMail = async (email, name, token) => {
  try {
    const mailOptions = {
      from: 'av894883@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `
                <p>Hello ${name},</p>
                <p>We received a request to reset your password. Please click the following link to reset your password:</p>
                <a href="http://localhost:5173/reset/${token}" 
                style="background-color:green;padding:10px; border-radius:5px;color:#fff; text-decoration:none; text-align:center; margin:15px 0px;"
                > Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
    };

    // Send email
    await createTransporter().sendMail(mailOptions);

    console.log('Reset password email sent successfully');
  } catch (error) {
    console.log('Error sending reset password email:', error);
  }
};

module.exports = sendUserResetPasswordMail;
