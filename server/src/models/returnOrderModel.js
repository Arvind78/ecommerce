const mongoose = require('mongoose');

// Define the schema for the ReturnOrder model
const returnOrderSchema = new mongoose.Schema(
  {
    // User who initiated the return request (referenced document in User collection)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // Order associated with the return request (referenced document in Order collection)
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },

    // Reason for the return (e.g., damaged product, wrong size, etc.)
    reason: {
      type: String,
      required: true,
    },

    // Status of the refund payment (pending, paid, refunded)
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },

    // Status of the return process (pending, in_progress, completed, canceled)
    orderStatus: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the ReturnOrder model based on the returnOrderSchema
const returnOrderModel = mongoose.model('ReturnOrder', returnOrderSchema);

// Export the ReturnOrder model for use in other parts of the application
module.exports = returnOrderModel;
