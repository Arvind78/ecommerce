const express = require('express');
const {
  cancelPayment,
  createPayment,
  executePayment,
} = require('../controllers/paymentController.js');
const authenticateToken = require('../middleware/verifyToken.js');

const paymentRouter = express.Router();

paymentRouter.post('/pay', authenticateToken, createPayment);
paymentRouter.get('/success', executePayment);
paymentRouter.get('/cancel', cancelPayment);

module.exports = paymentRouter;
