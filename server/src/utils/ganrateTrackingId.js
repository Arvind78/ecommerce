/**
 * Generates a random tracking ID consisting of alphanumeric characters.
 * @returns {string} - The generated tracking ID.
 */

function generateTrackingId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let trackingId = '';
  for (let i = 0; i < 14; i++) {
    trackingId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return trackingId;
}

module.exports = generateTrackingId;
