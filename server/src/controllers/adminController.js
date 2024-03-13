const adminModel = require('../models/adminModel.js');
const productModel = require('../models/productModel.js');
const orderModel = require('../models/orderModel.js');
const error = require('../utils/error.js');
const encryptPassword = require('../utils/encryptPassword.js');
const decryptPassword = require('../utils/decryptPassword.js');
const generateToken = require('../utils/generateToken.js');
const configureCloudinary = require('../services/cloudinary/cloudnary.js');
const fs = require('fs');
const sendResetEmail = require('../services/mail/sendPasswordResetMail.js');
const sendAdminVerificationEmail = require('../services/mail/sendAdminVerification.js');
const path = require('path');
const sendAdminResentMail = require('../services/mail/sendAdminResetPassword.js');
const jwt = require('jsonwebtoken');
const { verifyToken, resetPasswordToken } = require('./../utils/resetToken');
const sendAdminResetPasswordMail = require('../services/mail/sendAdminResetPassword.js');


/**
 * Controller function to register a new admin.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */

exports.adminRagister = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const checkUser = await adminModel.findOne({ email });
    if (checkUser) {
      return next(error(400, 'Email already exist'));
    } else {
      const hashPassward = await encryptPassword(password);
      const admin = await adminModel.create({
        name,
        email,
        password: hashPassward,
      });
      sendAdminVerificationEmail(admin.email, admin.name, admin._id);
      res.status(201).json({
        success: true,
        message:
          'The admin account has been created successfully. Please ask them to check their email and click the verification link to activate their account.',
        data: admin,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to handle admin login.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return next(error(400, 'Invalid email or password'));
    } else if (!admin.isVerified) {
      next(
        error(
          400,
          'Your account is not verified. Please check your email and verify your account.'
        )
      );
      return sendAdminVerificationEmail(admin.email, admin.name, admin._id);
    } else {
      const checkPassward = await decryptPassword(password, admin.password);
      if (!checkPassward) {
        return next(error(400, 'Invalid email or password'));
      } else {
        const token = await generateToken(admin._id);
        res.cookie({ adminToken: token });
        res.status(200).json({
          success: true,
          message: 'Admin login successfully',
          admin,
          token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to retrieve dashboard data for the admin.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response containing dashboard data
 */

exports.getDashboard = async (req, res, next) => {
  try {
    const totalSales = await orderModel.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
        }, // Filter orders with status "completed"
      },
      {
        $unwind: '$items', // Unwind the items array quantity
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' },
          totalTaxs: { $sum: '$tax' },
          totalShipping: { $sum: '$shipping' },
          totalUnits: { $sum: '$items.quantity' }, // Calculate total units
        },
      },
    ]);

    const monthlySales = await orderModel.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
        },
      },
      {
        $group: {
          _id: { $month: { $toDate: '$createdAt' } },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          month: {
            $arrayElemAt: [
              [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              '$_id',
            ],
          },
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    const salesByCategory = await orderModel.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
        },
      },
      {
        $unwind: '$items', // Unwind the items array
      },
      {
        $group: {
          _id: '$items.category',
          totalAmount: { $sum: '$amount' }, // Assuming "price" field is used for amount
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          amount: '$totalAmount',
        },
      },
    ]);

    const orderCounts = await orderModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    const quarterlySales = await orderModel.aggregate([
      // Match orders with "paid" status (optional, adjust as needed)
      {
        $match: {
          paymentStatus: 'paid',
        },
      },
      // Group by quarter
      {
        $group: {
          _id: {
            $floor: { $divide: [{ $month: '$createdAt' }, 3] }, // Calculate quarter (0-based)
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      // Project quarter names and total sales
      {
        $project: {
          quarter: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id', 0] }, then: 'Q1' },
                { case: { $eq: ['$_id', 1] }, then: 'Q2' },
                { case: { $eq: ['$_id', 2] }, then: 'Q3' },
                { case: { $eq: ['$_id', 3] }, then: 'Q4' },
              ],
              default: 'Invalid Quarter',
            },
          },
          totalAmount: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      totalSales: totalSales[0]?.totalSales,
      totalTaxs: totalSales[0]?.totalTaxs,
      totalShipping: totalSales[0]?.totalShipping,
      totalUnits: totalSales[0]?.totalUnits,
      monthlySales,
      salesByCategory,
      quarterlySales,
      orderCounts,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to update admin profile.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */

exports.adminUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      const admin = await adminModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: 'Admin updated successfully', data: admin });
    } else {
      configureCloudinary().uploader.upload(
        req.file.path,
        async (error, result) => {
          if (error) {
            return next(error);
          } else {
            const admin = await adminModel.findByIdAndUpdate(
              id,
              {
                ...req.body,
                profileImg: result?.secure_url,
              },
              { new: true }
            );
            fs.unlinkSync(req.file.path);
            res
              .status(200)
              .json({ message: 'Admin updated successfully', data: admin });
          }
        }
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to handle admin email verification.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - HTML response indicating email verification success or failure
 */ 

exports.adminVerification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkVerification = await adminModel.findById(id);
    if (!checkVerification) {
      return next(error(404, 'Admin not found'));
    } else if (checkVerification.isVerified === true) {
      res.sendFile(
        path.join(
          __dirname,
          '../../',
          'public',
          'already_varification_success.html'
        )
      );
    } else {
      const admin = await adminModel.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      );
      res.sendFile(
        path.join(__dirname, '../../', 'public', 'verification_success.html')
      );
    }
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to send a password forget link to the admin's email.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or failure
 */


exports.adminPasswordForgetLink = async (req, res, next) => {
  const { email } = req.body;
  try {
    const checkAdmin = await adminModel.findOne({ email });
    if (!checkAdmin) {
      return next(error(404, 'Admin not found'));
    } else {
      const token = resetPasswordToken(checkAdmin._id);
      if (checkAdmin.isVerified === false) {
        sendAdminVerificationEmail(
          checkAdmin.email,
          checkAdmin.name,
          checkAdmin._id
        );
        return next(
          error(
            400,
            'Please verify your email. We have sent you a verification email. Please check your inbox and follow the instructions to complete the verification process.'
          )
        );
      }
      sendAdminResetPasswordMail(checkAdmin?.email, checkAdmin?.name, token);
      return res.status(200).json({
        status: 'success',
        message: 'Password reset link sent to your email',
      });
    }
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to handle admin forget password functionality.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating password reset success or failure
 */

exports.adminForgetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = verifyToken(token);
    console.log('token', decoded.id);
    const checkAdmin = await adminModel.findById(decoded.id);
    if (!checkAdmin) {
      return next(error(404, 'Admin not found'));
    } else {
      const hashPassward = await encryptPassword(password);
      await adminModel.findByIdAndUpdate(
        checkAdmin._id,
        { password: hashPassward },
        { new: true }
      );
      return res.status(200).json({
        status: 'success',
        message: 'Password reset successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};
