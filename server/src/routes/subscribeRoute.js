const express = require('express');
const {
  createSubscribe,
  getSubscribes,
} = require('../controllers/subscribeController.js');
const authenticateToken = require('../middleware/verifyToken.js');

const subscriberRouter = express.Router();
subscriberRouter.post('/subscribe', authenticateToken, createSubscribe);
subscriberRouter.get('/subscribe', getSubscribes);

module.exports = subscriberRouter;
