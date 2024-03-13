/**
 * Main entry point for the application.
 * Sets up the Express server, middleware, routes, and error handling.
 * Connects to the database and starts the server.
 * @module index
 */

const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const { xss } = require('express-xss-sanitizer');
const dbConnection = require('./config/connection/dbConnection.js');
const { INTERNAL_SERVER_ERROR } = require('./utils/apiStatusCode.js');
const userRouter = require('./routes/userRoute.js');
const enquiryRouter = require('./routes/enquiryRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');
const subscriberRouter = require('./routes/subscribeRoute.js');
const productRouter = require('./routes/productRouter.js');
const orderRouter = require('./routes/orderRoute.js');
const returnOrderRouter = require('./routes/returnOrderRoute.js');
const adminRouter = require('./routes/adminRoute.js');
const productReviewRouter = require('./routes/productReviewRoute.js');
const reviewRouter = require('./routes/reviewRoute.js');

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(xss());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('public/')));
app.use(express.static(path.resolve('public/uploads/')));

// Route setup
app.use('/api', userRouter);
app.use('/api', enquiryRouter);
app.use('/api', paymentRouter);
app.use('/api', productRouter);
app.use('/api', subscriberRouter);
app.use('/api', orderRouter);
app.use('/api', returnOrderRouter);
app.use('/api', adminRouter);
app.use('/api', productReviewRouter);
app.use('/api', reviewRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || INTERNAL_SERVER_ERROR.CODE;
  const message = err.message || INTERNAL_SERVER_ERROR.MESSAGE;
  return res.status(status).json({ message });
});

// Start server
app.listen(process.env.PORT, () => {
  dbConnection(); // Connect to the database
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
