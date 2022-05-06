import express from 'express';
const router = express.Router();
import paginate from '../middleware/paginateMiddleware.js';
import authenticateUser from '../middleware/auth.js';

import {
  getPosts,
  postReply,
  updatePost,
  updateUserPosts,
} from '../controllers/postController.js';

router.route('/').post(authenticateUser, postReply);
router.route('/user/:id').patch(updateUserPosts);
router.route('/:id').get(paginate, getPosts).patch(updatePost);

export default router;
