const createTransporter = require('./mailTransporter');

async function sendAdminVerificationEmail(email, name, id) {
  // Define the options for the email
  const mailOptions = {
    from: 'av894883@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Verify Your Admin Account', // Email subject
    html: `
      <p>Hello ${name},</p>
      <p>Thank you for creating an admin account!</p>
      <p>To verify your account and activate it, please click the link below:</p>
      <div  style="color:#fff;  margin:25px 2px">
      <a href="https://shopnow-073b.onrender.com/api/admin/verification/${id}" style="background-color:green;padding:10px; border-radius:5px;color:#fff; text-decoration:none; text-align:center; margin:15px 0px;">Verify Your Account</a>
      </div>
      <p>If you did not create this account, you can safely ignore this email.</p>
      <p>Thank you.</p>
    `,
  };

  try {
    // Send the email
    const result = await createTransporter().sendMail(mailOptions);
    console.log('Verification email sent successfully:', result.response);
    return true;
  } catch (error) {
    // Handle any errors that occur during the sending process
    console.error('Error sending verification email:', error);
    return false;
  }
}

module.exports = sendAdminVerificationEmail;
