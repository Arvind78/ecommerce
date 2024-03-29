const express = require('express');
const { upload } = require('../middleware/fileUploader.js');
const {
  deleteUser,
  getAllUser,
  getUser,
  userDeteilsUpdate,
  userLogout,
  userPasswordReset,
  userProfileImgUpdate,
  userRagister,
  userlogin,
  userVerification,
} = require('../controllers/userController.js');
const authenticateToken = require('../middleware/verifyToken.js');

const userRouter = express.Router();

userRouter.post('/user/ragister', userRagister);
userRouter.post('/user/login', userlogin);
userRouter.get('/user/:id', getUser);
userRouter.get('/user', getAllUser);
userRouter.put('/user/:id', userDeteilsUpdate);
userRouter.put(
  '/user/profile/:id',
  upload.single('avatar'),
  userProfileImgUpdate
);
userRouter.post('/user/reset/:token', userPasswordReset);
userRouter.post('/user/reset', userPasswordReset);
userRouter.post('/user/logout', userLogout);
userRouter.get('/user/verification/:id', userVerification);

userRouter.delete('/user/:id', deleteUser);

module.exports = userRouter;
