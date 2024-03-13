const subscribeModel = require('../models/subscribeModel.js');
const error = require('../utils/error.js');

/** 
 * Controller function to subscrib a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createSubscribe = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    const isExist = await subscribeModel.findOne({ email });
    if (isExist) {
      return next(error(400, 'This email is already subscribed'));
    }
    const newSubscribe = await subscribeModel.create({ email });
    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      newSubscribe,
    });
  } catch (err) {
    return next(err);
  }
};

/** 
 * Controller function to get subscriber user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getSubscribes = async (req, res, next) => {
  try {
    const subscribes = await subscribeModel.find();
    res.status(200).json({
      success: true,
      subscribes,
    });
  } catch (err) {
    return next(err);
  }
};
