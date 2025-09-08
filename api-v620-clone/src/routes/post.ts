import express, { Router } from 'express';

import * as postController from '../controllers/postController.js';

const router: Router = express.Router();

// 這裡的用法和您原本的 JS 程式碼完全一樣，不需要改動
router.get('/search', postController.searchPosts);

export default router;

