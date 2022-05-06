import express from 'express';
const router = express.Router();
import authenticateUser from '../middleware/auth.js';

import {
  postThread,
  updateThread,
  getThreads,
} from '../controllers/threadController.js';

import paginate from '../middleware/paginateMiddleware.js';

router.route('/').post(authenticateUser, postThread);
router.route('/:id').get(paginate, getThreads).patch(updateThread);

export default router;
