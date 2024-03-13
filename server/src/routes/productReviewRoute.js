const express = require('express');
const authenticateToken = require('../middleware/verifyToken');
const {
  createProductReview,
  getAllProductReview,
} = require('../controllers/productReviewController');
const productReviewRouter = express.Router();

productReviewRouter.post(
  '/product/review',
  authenticateToken,
  createProductReview
);
productReviewRouter.get('/product/review/:id', getAllProductReview);
// productReviewRouter.put("/product/review/:id",updateProductReview);
// productReviewRouter.delete("/product/review/:id",deleteProductReview);

module.exports = productReviewRouter;
