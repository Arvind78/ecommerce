const mongoose = require('mongoose');

// Define the schema for the Admin model
const adminSchema = new mongoose.Schema(
  {
    // Administrator's name
    name: {
      type: String,
      required: true, // Consider making this required
    },

    // Administrator's email address (unique and required for login)
    email: {
      type: String,
      required: true,
      unique: true, // Enforces unique email addresses for admins
    },

    // URL of the administrator's profile image (optional)
    profileImg: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/teacher-with-full-shirt-vector-illustration_969863-21714.jpg?size=626&ext=jpg&ga=GA1.1.1379862804.1703939755&semt=ais',
    },

    // Administrator's password (hashed and stored securely)
    password: {
      type: String,
      required: true,
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

// Create the Admin model based on the adminSchema
const adminModel = mongoose.model('Admin', adminSchema);

// Export the Admin model for use in other parts of the application
module.exports = adminModel;
