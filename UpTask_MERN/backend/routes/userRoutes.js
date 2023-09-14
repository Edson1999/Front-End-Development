import express from 'express';
const router = express.Router();

import {
  register,
  auth,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
} from '../controllers/userController.js';

import checkAuth from '../middleware/checkAuth.js';

// users - Auth, register and confirmation
router.post('/', register); // Create a new user
// users - Login
router.post('/login', auth);
// users - confirm account
router.get('/confirm/:token', confirm);
// users - forgot password
router.post('/forgot-password', forgotPassword);
// users - forgot password *check token *
// users - forgot password *update password *
router.route('/forgot-password/:token').get(checkToken).post(newPassword);

router.get('/profile', checkAuth, profile);

export default router;
