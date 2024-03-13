exports.resetPasswordToken = (id) => {
  const header = Buffer.from(JSON.stringify({ alg: 'none' }))
    .toString('base64')
    .replace(/=/g, '');
  const payload = Buffer.from(
    JSON.stringify({
      id: id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    })
  )
    .toString('base64')
    .replace(/=/g, '');
  const token = header + '_' + payload;

  return token;
};

exports.verifyToken = (token) => {
  // Split the token into header and payload
  const [headerBase64, payloadBase64] = token.split('_');

  // Decode the header and payload
  const header = JSON.parse(
    Buffer.from(headerBase64, 'base64').toString('utf-8')
  );
  const payload = JSON.parse(
    Buffer.from(payloadBase64, 'base64').toString('utf-8')
  );

  // Check if token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (payload.exp && currentTime >= payload.exp) {
    throw new Error('Token has expired');
  }

  // Return the decoded header and payload
  return payload;
};
