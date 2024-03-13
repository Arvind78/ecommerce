const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema(
  {
    // User who placed the order (referenced document in User collection)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Consider making this required
    },

    // Array of ordered items, each item being an object with details
    items: {
      type: [Object],
      required: true, // Consider making this required
    },

    // Total amount of the order (before tax and shipping)
    amount: {
      type: Number,
      required: true,
    },

    // Subtotal of the order (before tax)
    subTotal: {
      type: Number,
      required: true,
    },

    // Shipping address details (consider using dedicated sub-schemas for clarity)
    address: {
      type: Object,
      required: true, // Consider making this required
    },

    // Amount of tax applied to the order
    tax: {
      type: Number,
      required: true, // Consider making this required
    },

    // Shipping cost for the order
    shipping: {
      type: Number,
      required: true, // Consider making this required
    },

    // Current order status (default: 'not ordered')
    status: {
      type: String,
      enum: ['order placed', 'dispatched', 'cancelled', 'delivered', 'return'],
      default: 'order placed',
    },

    // Transaction ID for the payment (optional)
    transactionId: {
      type: String,
    },

    // Payment status (optional)
    paymentStatus: {
      type: String,
    },

    // Tracking ID for the shipment (optional)
    trackingId: {
      type: String,
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the Order model based on the orderSchema
const orderModel = mongoose.model('Order', orderSchema);

// Export the Order model for use in other parts of the application
module.exports = orderModel;
