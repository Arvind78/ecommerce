const mongoose = require('mongoose');
const orderModel = require('../models/orderModel');
const error = require('../utils/error');

/**
 * Controller function to get all orders.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getAllOrders = async (req, res, next) => {
  try {
    const order = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'name phone');
    const orderCounts = await orderModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ success: true, data: order, orderCounts });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get orders by user ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getOrderByUserId = async (req, res, next) => {
  try {
    const order = await orderModel.find({ userId: req.params.id });

    if (!order) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get orders by user ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findOne({ _id: id });

    if (!order) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update an order by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete an order by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Order deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get an order by tracking ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getOrderByTrackingId = async (req, res, next) => {
  const trackingIdRegex = new RegExp(`^${req.params.id}$`, 'i');
  try {
    const order = await orderModel.findOne({
      trackingId: { $regex: trackingIdRegex },
    });
    if (!order) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get the count of user orders.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getCountUserOrder = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const order = await orderModel.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalCanceled: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
          },
          totalReturned: {
            $sum: { $cond: [{ $eq: ['$status', 'return'] }, 1, 0] },
          },
          totalDelivered: {
            $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] },
          },
        },
      },
    ]);
    // const order = await orderModel.countDocuments({userId: req.params.id});
    if (order.length === 0) {
      return next(error(404, `Order not found with id of ${req.params.id}`));
    } else {
      res.status(200).json({ success: true, data: order });
    }
  } catch (error) {
    next(error);
  }
};
