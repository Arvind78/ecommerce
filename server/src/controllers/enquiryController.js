const error = require('../utils/error.js');
const enquiryModel = require('./../models/enquiryModel.js');

/**
 * Controller function to create a new enquiry.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createEnquiry = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !subject || !message) {
    return next(error(400, 'Please fill all the fields'));
  }
  try {
    const existingEnquiry = await enquiryModel.findOne({ email });
    if (existingEnquiry) {
      return next(error(400, 'Enquiry already exists'));
    } else {
      const newEnquiry = await enquiryModel.create({
        name,
        email,
        phone,
        subject,
        message,
      });

      res.status(201).json({
        success: true,
        message:
          'enquiry was successfully submitted and informs the user that they can expect a reply within 24 hours.',
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update the status of an enquiry.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.updateEnquiryStatus = async (req, res, next) => {
  const enquiryId = req.params.id;

  try {
    const enquiry = await enquiryModel.findByIdAndUpdate(enquiryId, req.body, {
      new: true,
    });
    if (!enquiry) {
      return next(error(404, 'Enquiry not found'));
    }
    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to get all enquiries with their statistics.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

exports.getAllEnquiries = async (req, res, next) => {
  const today = new Date();
  const enquiryStats = await enquiryModel.find();
  today.setHours(0, 0, 0, 0);

  try {
    const enquiryStats = await enquiryModel.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          allEnquiries: { $push: '$$ROOT' },
          totalEnquiry: { $sum: 1 },
          totalSuccessEnquiry: {
            $sum: {
              $cond: [{ $eq: ['$status', 'success'] }, 1, 0],
            },
          },
          totalPadddingEnquiry: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0],
            },
          },
          todayEnquiry: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    {
                      $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    today.toISOString().substring(0, 10),
                  ],
                },
                1,
                0,
              ],
            },
          },
          todaySucessEnquiry: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: [
                        {
                          $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                          },
                        },
                        today.toISOString().substring(0, 10),
                      ],
                    },
                    { $eq: ['$status', 'success'] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          todayPendingEnquiry: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: [
                        {
                          $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                          },
                        },
                        today.toISOString().substring(0, 10),
                      ],
                    },
                    { $eq: ['$status', 'pending'] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);
    const { allEnquiries, ...other } = enquiryStats[0];
    res.status(200).json({
      success: true,
      message: 'Enquiry data',
      data: allEnquiries,
      other,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to delete an enquiry by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteEnquiry = async (req, res, next) => {
  const enquiryId = req.params.id;
  try {
    const enquiry = await enquiryModel.findByIdAndDelete(enquiryId);
    if (!enquiry) {
      return next(error(404, 'Enquiry not found'));
    } else {
      res.status(200).json({
        success: true,
        message: 'Enquiry deleted successfully',
        data: enquiry,
      });
    }
  } catch (err) {
    next(err);
  }
};
