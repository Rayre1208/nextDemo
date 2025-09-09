import express, { Router } from 'express';
// 引入剛剛建立的 authController
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // <-- 引入中介軟體

// 建立一個新的路由器實例
const router: Router = express.Router();

// 定義 POST /login 路由，由 authController.login 處理
// 當請求送到 /api/auth/login 時，這個函式會被觸發
router.post('/login', authController.login);

// 保護路由 (需要有效的 Token)
// 在到達 authController.getMe 之前，會先經過 protect 中介軟體的驗證
router.get('/me', protect, authController.getMe); 

// 您未來可以新增其他認證相關路由，例如：
// router.post('/register', authController.register);
// router.get('/me', authController.getMe);

// 使用 ES Module 語法導出路由器
export default router;