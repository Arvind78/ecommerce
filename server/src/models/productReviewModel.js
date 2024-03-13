const mongoose = require('mongoose');

// Define the schema for the ProductReview model
const productReviewSchema = new mongoose.Schema({
  // User who wrote the review (referenced document in User collection)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  // Product being reviewed (referenced document in Product collection)
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },

  // Description of the review (optional)
  description: {
    type: String,
  },

  // Rating for the product (consider data type and validation)
  rating: {
    type: Number, // Consider using a number for ratings instead of String
    min: 1,
    max: 5,
  },
});

// Create the ProductReview model based on the productReviewSchema
const productReviewModel = mongoose.model('ProductReview', productReviewSchema);

// Export the ProductReview model for use in other parts of the application
module.exports = productReviewModel;
