// routes/index.js (修改後)
const express = require('express');
const router = express.Router();
const tasksRouter = require('./tasks');
const paginationRouter = require('./pagination');
const productRouter = require('./product');
const postRouter = require('./post'); // <--- 1. 引入新的路由
const mockApiController = require('../controllers/mockApiController');

router.use('/tasks', tasksRouter);
router.use('/pagination', paginationRouter);
router.use('/product', productRouter);

// ✨ 將 /api/post 的請求交給 post.js 處理
router.use('/post', postRouter); // <--- 2. 掛載新的路由

// --- 通用 Mock API 處理 ---
router.use(mockApiController.handleGenericApi);

module.exports = router;