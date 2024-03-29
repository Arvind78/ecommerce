const mailTransporter = require('./mailTransporter.js');

async function sendVerificationEmail(email, name, id) {
  const mailOptions = {
    from: 'av894883@gmail.com',
    to: email,
    subject: 'Verify Your Account',
    html: `
      <p>Hello ${name},</p>
      <p>Thank you for signing up!</p>
      <p>To verify your account and activate it, please click the link below:</p>
      <div  style="color:#fff;  margin:25px 2px">
      <a href="https://shopnow-073b.onrender.com/api/user/verification/${id}" style="background-color:green;padding:10px; border-radius:5px;color:#fff; text-decoration:none; text-align:center; margin:15px 0px;">Verify Your Account</a>
      </div>
      <p>If you did not create this account, you can safely ignore this email.</p>
      <p>Thank you.</p>
    `,
  };

  try {
    const result = await mailTransporter().sendMail(mailOptions);
    console.log('Verification email sent successfully:', result.response);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

module.exports = sendVerificationEmail;
