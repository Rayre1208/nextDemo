import express, { Router } from 'express';
// 假設 controllers 目錄會移到 src/ 下，路徑調整為 '../controllers/...'

// 建立一個新的路由器實例，並明確指定其型別為 Router
const router: Router = express.Router();

import { getPaginatedProducts } from '../controllers/paginationController.js';

router.get('/', getPaginatedProducts);

// 使用 ES Module 語法導出路由器
export default router;

