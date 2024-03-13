const returnOrderModel = require('../models/returnOrderModel');
const mongoose = require('mongoose');
const error = require('../utils/error');

/**
 * Controller function to get all return orders.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getAllReturnOrders = async (req, res, next) => {
  try {
    const returnOrder = await returnOrderModel.find().sort({ createdAt: -1 });
    res.status(201).json({ returnOrder });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get return orders by user ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getReturnOrderByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const returnOrder = await returnOrderModel
      .find({ userId })
      .sort({ createdAt: -1 });
    if (!returnOrder) {
      return next(error('No return order found', 404));
    } else {
      res.status(200).json({
        success: true,
        returnOrder,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to get a return order by its ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getReturnOrderById = async (req, res, next) => {
  const { orderId, userId, returnId } = req.query;
  try {
    const returnOrder = await returnOrderModel
      .findById(returnId)
      .populate(userId, 'username email phone')
      .populate(orderId, 'orderNumber amount items paymentStatus')
      .exec();
    res.status(200).json(returnOrders);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to create a new return order request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.createReturnOrder = async (req, res, next) => {
  const { userId, orderId, reason } = req.body;
  console.log(req.body);

  try {
    const checkOrder = await returnOrderModel.findOne({
      orderId: new mongoose.Types.ObjectId(orderId),
    });
    if (checkOrder) {
      return next(error(400, 'Return order already exist'));
    } else {
      const returnOrder = await returnOrderModel.create({
        userId,
        orderId,
        reason,
      });
      res.status(201).json({
        success: true,
        returnOrder,
        message: 'Return order request created successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update a return order request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.updateReturnOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const returnOrder = await returnOrderModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      returnOrder,
      message: 'Return order request updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a return order request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteReturnOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const returnOrder = await returnOrderModel.findByIdAndDelete(id);
    if (!returnOrder) {
      return next(error(404, 'Return order not found'));
    } else {
      res.status(200).json({
        success: true,
        message: 'Return order deleted successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};
