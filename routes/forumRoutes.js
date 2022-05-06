import express from 'express';
const router = express.Router();

import {
  getForums,
  updateForumPosts,
  updateForumThreads,
  getThreadCount,
} from '../controllers/forumController.js';

router.route('/').get(getForums);
router.route('/threads/').get(getThreadCount);

router.route('/post/:sport').patch(updateForumPosts);
router.route('/thread/:sport').patch(updateForumThreads);

export default router;
