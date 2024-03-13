const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // User name
    name: {
      type: String,
      required: true,
      trim: true, // Remove leading and trailing whitespace
    },

    // User email address
    email: {
      type: String,
      required: true,
      unique: true, // No duplicate email addresses allowed
      trim: true, // Remove leading and trailing whitespace
    },

    // User password (hashed and stored securely)
    password: {
      type: String,
      required: true,
    },

    // User address (optional)
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    // User phone number (optional)
    phone: {
      type: String,
      trim: true, // Remove leading and trailing whitespace
    },

    // User profile image URL (optional)
    profileImg: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the User model based on the userSchema
const userModel = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = userModel;
