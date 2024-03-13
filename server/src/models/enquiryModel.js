const mongoose = require('mongoose');

// Define the schema for the Enquiry model
const enquirySchema = new mongoose.Schema(
  {
    // Name of the person making the enquiry (optional)
    name: {
      type: String,
    },

    // Email address of the person making the enquiry (required)
    email: {
      type: String,
      required: true,
    },

    // Phone number of the person making the enquiry (optional)
    phone: {
      type: String,
    },

    // Subject of the enquiry (optional)
    subject: {
      type: String,
    },

    // Content of the enquiry message
    message: {
      type: String,
      required: true,
    },

    // Status of the enquiry (default: 'pending')
    status: {
      type: String,
      enum: ['pending', 'answered', 'closed'], // Consider adding relevant options
      default: 'pending',
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the Enquiry model based on the enquirySchema
const enquiryModel = mongoose.model('enquiry', enquirySchema);

// Export the Enquiry model for use in other parts of the application
module.exports = enquiryModel;
