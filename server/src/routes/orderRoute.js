const express = require('express');
const authenticateToken = require('../middleware/verifyToken');
const {
  getCountUserOrder,
  getAllOrders,
  updateOrder,
  getOrderByTrackingId,
  getOrderByUserId,
  getOrderById,
  deleteOrder,
} = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.put('/order/:id', updateOrder);
orderRouter.get('/order/:id', getOrderById);
orderRouter.get('/order', getAllOrders);
orderRouter.get('/order/track/:id', getOrderByTrackingId);
orderRouter.get('/order/user/:id', getCountUserOrder);
orderRouter.get('/order/users/:id', getOrderByUserId);
orderRouter.delete('/order/:id', deleteOrder);

module.exports = orderRouter;
