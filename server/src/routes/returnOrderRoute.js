const express = require('express');
const {
  deleteReturnOrder,
  updateReturnOrder,
  createReturnOrder,
  getReturnOrderByUserId,
  getAllReturnOrders,
  getReturnOrderById,
} = require('../controllers/returnOrderController');
const returnOrderRouter = express.Router();

returnOrderRouter.post('/return/order', createReturnOrder);
returnOrderRouter.get('/return/orders', getAllReturnOrders);
returnOrderRouter.get('/return/order', getReturnOrderById);
returnOrderRouter.get('/return/order/:userId', getReturnOrderByUserId);
returnOrderRouter.put('/return/order/:id', updateReturnOrder);
returnOrderRouter.delete('/return/order/:id', deleteReturnOrder);

module.exports = returnOrderRouter;
