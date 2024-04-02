const productModel = require('../models/productModel');
const productReviewModel = require('../models/productReviewModel');
const error = require('../utils/error');
const mongoose = require('mongoose');

/**
 * Controller function to create a new product review.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.createProductReview = async (req, res, next) => {
  const { userId, productId, reviewContent, rating } = req.body;
  console.log(req.body);
  try {
    const review = await productReviewModel.create({
      userId,
      productId,
      rating,
      description: reviewContent,
    });
    const reviews = await productReviewModel.find({ productId });
    console.log(reviews);
    const totalRatings = reviews.reduce(
      (acc, review) => acc + parseInt(review.rating),
      0
    );
    console.log(totalRatings);
    const avgRating = (totalRatings / reviews.length).toFixed(1);
    console.log(avgRating);

    const newData = await productModel.findByIdAndUpdate(
      productId,
      { rating: avgRating },
      { new: true }
    );
    console.log(newData);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get all product reviews.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getAllProductReview = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Get reviews and populate user information
    const reviews = await productReviewModel
      .find({ productId: id })
      .populate('userId', 'name profileImg');

  // Aggregate to count ratings and calculate average rating
  const ratingStats = await productReviewModel.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 },
      },
    },
  ]);
  
  let totalRatings = 0;
  let totalCount = 0;
  for (const stat of ratingStats) {
    totalRatings += stat._id * stat.count;
    totalCount += stat.count;
  }
  
  const avgRatingOutOf5 = totalCount > 0 ? (totalRatings / totalCount) : 0;
  
  console.log("Average Rating (Out of 5):", avgRatingOutOf5.toFixed(2));
  
  console.log("Rating Counts:");
  const ratingCounts = {};
  for (const stat of ratingStats) {
    console.log(`Rating ${stat._id}: ${stat.count}`);
    ratingCounts[stat._id] = stat.count;
  }
  
    res.status(200).json({
      success: true,
      reviews,
      ratingCounts,
      avgRating:avgRatingOutOf5 
    });
  } catch (error) {
    next(error);
  }
};
