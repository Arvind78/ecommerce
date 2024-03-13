const express = require('express');
const {
  adminRagister,
  adminLogin,
  getDashboard,
  adminUpdate,
  adminVerification,
  adminForgetPassword,
  adminPasswordForgetLink,
} = require('../controllers/adminController');
const { upload } = require('../middleware/fileUploader');
const adminRouter = express.Router();

adminRouter.post('/admin/ragister', adminRagister);
adminRouter.post('/admin/login', adminLogin);
adminRouter.get('/admin/verification/:id', adminVerification);
adminRouter.get('/admin/dashboad', getDashboard);
adminRouter.put('/admin/:id', upload.single('image'), adminUpdate);
adminRouter.post('/admin/reset-password', adminPasswordForgetLink);
adminRouter.put('/admin/reset-password/:token', adminForgetPassword);

module.exports = adminRouter;
