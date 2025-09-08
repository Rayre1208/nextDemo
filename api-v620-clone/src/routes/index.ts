import express, { Router } from 'express';

// 引入各個子路由模組
import tasksRouter from './tasks.js';
import paginationRouter from './pagination.js';
import productRouter from './product.js';
import postRouter from './post.js';
// 假設 controllers 目錄會移到 src/ 下，路徑調整為 '../controllers/...'
import * as mockApiController from '../controllers/mockApiController.js';

// 建立一個新的路由器實例，並明確指定其型別為 Router
const router: Router = express.Router();

// 將 /tasks 路徑的請求導向到 tasksRouter
router.use('/tasks', tasksRouter);

// 將 /pagination 路徑的請求導向到 paginationRouter
router.use('/pagination', paginationRouter);

// 將 /product 路徑的請求導向到 productRouter
router.use('/product', productRouter);

// 將 /post 路徑的請求導向到 postRouter
router.use('/post', postRouter);

// --- 通用 Mock API 處理 ---
// 這個路由會處理所有在上面沒有被匹配到的 /api/... 請求
router.use(mockApiController.handleGenericApi);

// 使用 ES Module 語法導出路由器
export default router;

