const userModel = require('../models/userModel.js');
const configureCloudinary = require('../services/cloudinary/cloudnary.js');
const sendUserResetPasswordMail = require('../services/mail/sendPasswordResetMail.js');
const sendResetEmail = require('../services/mail/sendPasswordResetMail.js');
const sendVerificationEmail = require('../services/mail/sendUserVerification.js');
const sendCongratulationsEmail = require('../services/mail/userRagisterMail.js');
const decryptPassword = require('../utils/decryptPassword.js');
const encryptPassword = require('../utils/encryptPassword.js');
const error = require('../utils/error.js');
const generateToken = require('../utils/generateToken.js');
const fs = require('fs');
const { verifyToken, resetPasswordToken } = require('../utils/resetToken.js');
const path = require('path');

/** 
 * Controller function to register a new user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.userRagister = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next(error(400, 'All fields are required'));
  }
  try {
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      return next(error(400, 'User already exists'));
    }
    const securePassword = await encryptPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      phone,
      password: securePassword,
    });

    const user = newUser._doc;
    user.password = undefined;
    res.status(201).json({ user, message: 'User created successfully' });
    sendCongratulationsEmail(user);
    sendVerificationEmail(user.email, user.name, user._id);
    return;
  } catch (err) {
    next(err);
  }
};

/** 
 * Controller function to handle user verification.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userVerification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkVerification = await userModel.findById(id);
    if (!checkVerification) {
      return next(error(404, 'Admin not found'));
    } else if (checkVerification.isVerified === true) {
      res.sendFile(
        path.join(
          __dirname,
          '../../',
          'public',
          'user_already_varification_success.html'
        )
      );
    } else {
      const admin = await userModel.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      );
      res.sendFile(
        path.join(
          __dirname,
          '../../',
          'public',
          'user_verification_success.html'
        )
      );
    }
  } catch (error) {
    next(error);
  }
};


/** 
 * Controller function to handle user login.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(error(400, 'All fields are required'));
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(error(400, 'User does not exist'));
    } else if (!user.isVerified) {
      next(
        error(
          400,
          'Your account is not verified. Please check your email and verify your account.'
        )
      );
      return sendVerificationEmail(user.email, user.name, user._id);
    }
    const matchPassword = await decryptPassword(password, user.password);
    if (!matchPassword) {
      return next(error(400, 'Invalid credentials'));
    }
    const token = await generateToken(user);
    user.password = undefined;
   
    return res
      .status(200)
      .json({ user, token, message: 'User login successfully' });
  } catch (err) {
    next(err);
  }
};

/** 
 * Controller function to update user details.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userDeteilsUpdate = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return next(error(400, 'User does not exist'));
    }
    user.password = undefined;
    return res.status(200).json({ user, message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
};


/** 
 * Controller function to update user profile image.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userProfileImgUpdate = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file) {
    return next(error(400, 'Image is required'));
  }

  try {
    configureCloudinary().uploader.upload(
      req.file.path,
      async (error, result) => {
        if (error) {
          // return next(error(500, 'Error uploading image'));
          res.status(500).json({ error: 'Error uploading image' });
        }
        const user = await userModel.findByIdAndUpdate(
          id,
          {
            $set: { profileImg: result?.secure_url },
          },
          { new: true }
        );

        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(err);
          }
        });
        user.password = undefined;
        return res
          .status(200)
          .json({ user, message: 'User updated successfully' });
      }
    );
  } catch (err) {
    next(err);
  }
};


/** 
 * Controller function to handle user password reset.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userPasswordReset = async (req, res, next) => {
  const { token } = req.params;

  const { password, email } = req.body;
  try {
    if (!password) {
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(error(404, 'User not found'));
      }
      const token = resetPasswordToken(user?._id);
      sendUserResetPasswordMail(user?.email, user?.name, token);
      res
        .status(200)
        .json({ message: 'Password reset link sent to your email' });
    } else {
      const decoded = verifyToken(token);
      if (decoded) {
        const securePassword = await encryptPassword(password);
        const updatePassword = await userModel.findByIdAndUpdate(
          decoded.id,
          { $set: { password: securePassword } },
          { new: true }
        );
        res.status(201).json({ message: 'Password reset successfully' });
      }
    }
  } catch (err) {
    next(err);
  }
};


/** 
 * Controller function to handle user logout.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.userLogout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    return res.status(200).json({ message: 'Logout successfully' });
  } catch (err) {
    next(err);
  }
};

/** 
 * Controller function to get user details.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(error(404, 'User not found'));
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};


/** 
 * Controller function to get all users.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    if (!user) {
      return next(error(404, 'User not found'));
    }
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

/** 
 * Controller function to delete a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return next(error(404, 'User not found'));
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
