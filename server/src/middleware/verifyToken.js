const jwt = require('jsonwebtoken');

/* Middleware to authenticate JWT token in the request cookies. */

const authenticateToken = (req, res, next) => {
  // Retrieve the access token from the cookies
  const accessToken = req.cookies.accessToken;
console.log("Cookies", accessToken)
  // Check if an access token is present
  if (!accessToken) {
    // Respond with unauthorized status and message if no token found
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  // Attempt to verify the access token using the secret key
  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Attach the decoded token data to the request object as 'user'
    req.user = decodedToken;

    // If verification is successful, continue to the next middleware
    next();
  } catch (err) {
    // If verification fails, respond with forbidden status and message
    return res.status(403).json({ message: 'Token is not valid!' });
  }
};

module.exports = authenticateToken;
