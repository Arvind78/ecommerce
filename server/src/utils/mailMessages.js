/**
 * Defines a set of mail service messages for success and error scenarios.
 */
const mailServiceMessages = {
  // Success messages
  MAIL_SETUP_SUCCESS: 'Mail service setup successfully.',
  MAIL_SETUP_ERROR: 'Error setup mail service.',
  MAIL_SENT: 'Email sent successfully.',
  VERIFICATION_EMAIL_SENT: 'Verification email sent. Please check your inbox.',
  PASSWORD_RESET_EMAIL_SENT:
    'Password reset email sent. Please check your inbox.',

  // Client error messages
  INVALID_EMAIL_FORMAT:
    'Invalid email format. Please provide a valid email address.',
  EMAIL_NOT_FOUND: 'Email address not found.',
  EMAIL_ALREADY_VERIFIED: 'Email address is already verified.',
  INVALID_VERIFICATION_CODE: 'Invalid verification code.',
  PASSWORD_RESET_EXPIRED:
    'Password reset link has expired. Please request a new one.',
  PASSWORD_RESET_CODE_MISMATCH: 'Invalid or expired password reset code.',
  PASSWORD_TOO_WEAK:
    'Password is too weak. It must be at least 8 characters long.',

  // Server error messages
  INTERNAL_ERROR: 'Internal server error. Please try again later.',
};

// Destructure specific messages for ease of use
const { MAIL_SETUP_SUCCESS, MAIL_SETUP_ERROR } = mailServiceMessages;

module.exports = {
  MAIL_SETUP_SUCCESS,
  MAIL_SETUP_ERROR,
};
