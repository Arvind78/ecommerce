const mongoose = require('mongoose');

// Define the schema for the Subscribe model
const subscribeSchema = new mongoose.Schema(
  {
    // User email address for subscription
    email: {
      type: String,
      required: true,
      trim: true, // Remove leading and trailing whitespace
      unique: true, // Ensure no duplicate email subscriptions (consider if necessary)
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the Subscribe model based on the subscribeSchema
const subscribeModel = mongoose.model('subscribeEmail', subscribeSchema);

// Export the Subscribe model for use in other parts of the application
module.exports = subscribeModel;
