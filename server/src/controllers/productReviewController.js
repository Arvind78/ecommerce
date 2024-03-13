const productModel = require('../models/productModel');
const productReviewModel = require('../models/productReviewModel');
const error = require('../utils/error');

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
      { $match: { productId: id } },
      // {
      //     $group: {
      //         _id: "$rating",
      //         count: { $sum: 1 }
      //     }
      // },
      // {
      //     $group: {
      //         _id: null,
      //         ratings: { $push: { rating: "$_id", count: "$count" } },
      //         average: { $avg: "$_id" }
      //     }
      // }
    ]);

    // Extract ratings counts from aggregation result
    console.log(ratingStats);
    const ratingCounts = {};
    if (ratingStats[0] && ratingStats[0].ratings) {
      ratingStats[0].ratings.forEach((rating) => {
        ratingCounts[rating.rating] = rating.count;
      });
    }

    // Calculate average rating
    const averageRating = ratingStats[0]?.average || 0; // Default to 0 if no reviews exist
    res.status(200).json({
      success: true,
      reviews,
      ratingCounts,
      averageRating,
    });
  } catch (error) {
    next(error);
  }
};
