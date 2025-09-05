// routes/index.js (主路由器)
const express = require('express');
const router = express.Router();
const tasksRouter = require('./tasks');
const mockApiController = require('../controllers/mockApiController');

// 將所有 /api/tasks 的請求交給 tasks.js 處理
router.use('/tasks', tasksRouter);

// 未來新增 /users 路由時，只要加一行
// const usersRouter = require('./users');
// router.use('/users', usersRouter);

// --- 通用 Mock API 處理 ---
// 注意：這個應該放在所有具體路由的後面，作為一個「備用」或「接殺」的路由
router.use(mockApiController.handleGenericApi);

module.exports = router;