const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const sendOrderTrackingEmail = require('../services/mail/sendOrderDeteilsMail');
const configurePaypalGateway = require('../services/paypal/paypalConfig');
const generateTrackingId = require('../utils/ganrateTrackingId');
const path = require('path');
// Configure PayPal gateway
const paypal = configurePaypalGateway();

/**
 * Controller function to initiate a PayPal payment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

let concelId;
exports.createPayment = (req, res, next) => {
  const { userId, orderItem, subTotal, tax, shipping, total, deliveryAddress } =
    req.body;
  console.log(req.body);
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'https://shopnow-073b.onrender.com/api/success',
      cancel_url: 'https://shopnow-073b.onrender.com/api/cancel',
    },
    transactions: [
      {
        amount: {
          total: total,
          currency: 'USD',
        },
      },
    ],
  };

  paypal.payment.create(paymentData, async (error, payment) => {
    if (error) {
      console.error('Error creating PayPal payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      concelId = payment.id;
      const executeUrl = payment.links.find(
        (link) => link.rel === 'approval_url'
      ).href;
      res.send(executeUrl);

      const createOrder = await orderModel.create({
        userId: userId,
        items: [...orderItem],
        amount: total,
        subTotal: subTotal,
        tax: tax,
        shipping: shipping,
        address: {
          ...deliveryAddress,
        },
        status: 'order placed',
        transactionId: payment.id,
        paymentStatus: 'pending',
        trackingId: generateTrackingId(),
      });
    }
  });
};

/**
 * Controller function to execute a PayPal payment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.executePayment = (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const user = req.user;
  const executePaymentData = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    executePaymentData,
    async (error, payment) => {
      if (error) {
        console.error('Error executing PayPal payment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const order = await orderModel.findOneAndUpdate(
          { transactionId: paymentId },
          {
            paymentStatus: 'paid',
          },
          { new: true }
        );
        console.log('new order', order);
        const user = await userModel.findById(order.userId);
        sendOrderTrackingEmail(user, order);
        res.sendFile(
          path.join(__dirname, '../../', 'public', 'order_success.html')
        );
      }
    }
  );
};

/**
 * Controller function to cancel a PayPal payment.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.cancelPayment = async (req, res) => {
  if (concelId) {
    const order = await orderModel.findOneAndDelete({
      transactionId: concelId,
    });
    return res.sendFile(
      path.join(__dirname, '../../', 'public', 'order_cancel.html')
    );
  }
};
