import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

// 根據您的 users 資料表結構定義 User 介面
// 注意：password 是可選的，因為我們在回傳前會刪除它
interface User {
  id: string; // UUID 是字串
  displayName: string;
  email: string;
  password?: string;
  photoURL?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  about?: string | null;
  role: string;
  isPublic: boolean;
  created_at: Date;
  updated_at: Date;
}

// 處理使用者登入
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. 從請求 body 中獲取 email 和 password
    const { email, password } = req.body as { email: string; password: string };

    // 2. 驗證輸入是否存在
    if (!email || !password) {
      res.status(400).json({ status: "error", message: "請求 body 中缺少 'email' 或 'password' 欄位。" });
      return;
    }

    // 3. 從資料庫中尋找使用者
    const userResult = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      // 為了安全，使用模糊的錯誤訊息
      res.status(401).json({ status: "error", message: '無效的帳號或密碼。' });
      return;
    }
    const user = userResult.rows[0];

    // 4. 比對密碼雜湊值
    const isPasswordMatch = await bcrypt.compare(password, user.password!);

    if (!isPasswordMatch) {
      res.status(401).json({ status: "error", message: '無效的帳號或密碼。' });
      return;
    }

    // 5. 產生 JWT (JSON Web Token)
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token 有效期 1 小時
    );

    // 6. 從回傳的 user 物件中移除密碼，確保安全
    delete user.password;

    // 7. 回傳與前端約定好的格式
    res.status(200).json({
      // 為了符合您既有的格式，也為了滿足前端需求，我們將 accessToken 和 user 包在 data 裡
      status: "success",
      message: "登入成功。",
      data: {
        accessToken,
        user
      }
    });

  } catch (err: unknown) {
    console.error("登入失敗:", err);
    res.status(500).json({ status: "error", message: "伺服器內部錯誤。" });
  }
};

// 取得當前登入使用者的資訊
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // 因為 protect 中介軟體已經驗證過 Token 並將 user 附加到 req
    // 我們可以從 req.user 中安全地取得 userId
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ status: 'error', message: 'User not found in token' });
      return;
    }
    
    // 從資料庫中查詢使用者，但不包含密碼
    const result = await pool.query(
      'SELECT id, "displayName", email, "photoURL", "phoneNumber", country, address, state, city, "zipCode", about, role, "isPublic", created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    // 回傳符合前端期望的格式
    res.status(200).json({
      status: 'success',
      user: result.rows[0]
    });

  } catch (err: unknown) {
    console.error("Get me 失敗:", err);
    res.status(500).json({ status: "error", message: "伺服器內部錯誤。" });
  }
};