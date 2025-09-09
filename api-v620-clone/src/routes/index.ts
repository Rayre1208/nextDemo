import express, { Router } from 'express';

// 引入各個子路由模組
import tasksRouter from './tasks.js';
import paginationRouter from './pagination.js';
import productRouter from './product.js';
import postRouter from './post.js';
import authRouter from './auth.js'; // <-- 新增：引入 auth 路由

import * as mockApiController from '../controllers/mockApiController.js';

const router: Router = express.Router();

// --- 掛載具體的業務邏輯路由 ---

// 將 /auth 路徑的請求導向到 authRouter  <-- 新增：掛載 auth 路由
router.use('/auth', authRouter);

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
// 確保這個路由在所有具體路由之後
router.use(mockApiController.handleGenericApi);

export default router;