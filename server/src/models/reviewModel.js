const mongoose = require('mongoose');

// Define the schema for the Review model
const reviewSchema = new mongoose.Schema({
  // Name of the person who left the review (optional)
  name: {
    type: String,
  },

  // Description of the review
  description: {
    type: String,
    required: true, // Consider making this required if it's essential
  },

  // URL of the reviewer's profile image (optional)
  image: {
    type: String,
  },

  // URL of the reviewer's designation profile (optional)
  designation: {
    type: String,
  },
});

// Create the Review model based on the reviewSchema
const reviewModel = mongoose.model('Review', reviewSchema);

// Export the Review model for use in other parts of the application
module.exports = reviewModel;
