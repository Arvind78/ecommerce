const reviewModel = require('../models/reviewModel');
const configureCloudinary = require('../services/cloudinary/cloudnary');
const error = require('../utils/error');
const fs = require('fs');


/**
 * Controller function to create a new review.
 * This function uploads an image to Cloudinary if it's included in the request,
 * then creates a new review in the database.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */
exports.createReview = async (req, res, next) => {
  const { name, description, designation } = req.body;

  if (!name || !description || !designation) {
    return next(error(400, 'Please fill all the fields'));
  }

  try {
    if (req.file) {
      configureCloudinary().uploader.upload(
        req.file.path,
        async (err, result) => {
          if (err) {
            return next(error(500, 'Something went wrong'));
          } else {
            const review = await reviewModel.create({
              name,
              description,
              designation,
              image: result.secure_url,
            });

            fs.unlinkSync(req.file.path);
            return res
              .status(201)
              .json({ review, message: 'Review created successfully' });
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to update an existing review.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */

exports.updateReview = async (req, res, next) => {
  try {
    const review = await reviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!review) {
      return next(error(404, 'No review found with that ID'));
    }
    res.status(200).json({
      status: 'success',
      message: 'Review updated',
    });
  } catch (error) {}
};


/**
 * Controller function to delete an existing review.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await reviewModel.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(error(404, 'No review found with that ID'));
    }
    res.status(204).json({
      status: 'success',
      message: 'Review deleted',
    });
  } catch (error) {
    next(error);
  }
};



/**
 * Controller function to retrieve all reviews.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response containing all reviews
 */

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
