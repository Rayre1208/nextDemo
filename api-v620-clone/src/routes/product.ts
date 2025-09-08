import express, { Router } from 'express';

import * as productController from '../controllers/productController.js';

const router: Router = express.Router();

// 定義 GET /search 路由
// 當請求路徑為 /api/product/search?query=... 時，
// 由 productController.searchProducts 函式處理
router.get('/search', productController.searchProducts);

// 使用 ES Module 語法導出路由器
export default router;

