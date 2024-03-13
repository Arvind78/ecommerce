const express = require('express');
const {
  createEnquiry,
  deleteEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController.js');

const enquiryRouter = express.Router();
enquiryRouter.post('/enquiry', createEnquiry);
enquiryRouter.put('/enquiry/:id', updateEnquiryStatus);
enquiryRouter.get('/enquiry', getAllEnquiries);
enquiryRouter.delete('/enquiry/:id', deleteEnquiry);
module.exports = enquiryRouter;
