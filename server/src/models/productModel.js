const mongoose = require('mongoose');

// Define the schema for the Product model
const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: true,
    },

    // Product price (consider using a numeric data type like Number or Decimal)
    price: {
      type: String, // Consider using Number or Decimal for precise price handling
      required: true,
    },

    // URL of the product image (optional)
    image: {
      type: String,
    },

    // Detailed description of the product (optional)
    description: {
      type: String,
    },

    // Product category (required)
    category: {
      type: String,
      required: true,
    },

    // Product subcategory (optional)
    subCategory: {
      type: String,
    },

    // Product brand name (optional)
    brand: {
      type: String,
    },

    // Available product colors (optional)
    color: {
      type: [String],
    },

    // Available product sizes (array of strings)
    productSize: {
      type: [String],
    },

    // Indicates if the product is currently available (default: true)
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Average product rating (default: 0)
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    // Automatically add timestamps for created and updated at fields
    timestamps: true,
  }
);

// Create the Product model based on the productSchema
const productModel = mongoose.model('Product', productSchema);

// Export the Product model for use in other parts of the application
module.exports = productModel;
