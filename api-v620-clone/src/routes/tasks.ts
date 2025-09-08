import express, { Router } from 'express';
// 假設 controllers 目錄會移到 src/ 下，路徑調整為 '../controllers/...'
import * as tasksController from '../controllers/tasksController.js';

// 建立一個新的路由器實例，並明確指定其型別為 Router
const router: Router = express.Router();

// 定義 GET / 路由，由 tasksController.getTasks 處理
router.get('/', tasksController.getTasks);

// 定義 POST / 路由，由 tasksController.createTask 處理
router.post('/', tasksController.createTask);

// 使用 ES Module 語法導出路由器
export default router;

