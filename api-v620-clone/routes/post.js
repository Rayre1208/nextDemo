// routes/post.js (修改後)
const express = require('express');
const router = express.Router();
// ✨ 變更點 1: 引入 postController
const postController = require('../controllers/postController');

// GET /api/post/search?query=...
// ✨ 變更點 2: 使用 postController.searchPosts
router.get('/search', postController.searchPosts);

module.exports = router;