const express = require('express');
const { upload } = require('../middleware/fileUploader');
const {
  createReview,
  updateReview,
  getAllReviews,
  deleteReview,
} = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter.post('/review', upload.single('profileImg'), createReview);
reviewRouter.get('/review', getAllReviews);
reviewRouter.put('/review/:id', updateReview);
reviewRouter.delete('/review/:id', deleteReview);

module.exports = reviewRouter;
