import express from 'express';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

import {
  register,
  login,
  updateUser,
  getUser,
  deleteUser,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router
  .route('/user/:id')
  .get(getUser)
  .patch(authenticateUser, updateUser)
  .delete(deleteUser);

export default router;
