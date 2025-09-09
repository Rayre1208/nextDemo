import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 為 Express 的 Request 物件擴充一個 user 屬性
// 這樣 TypeScript 才知道 req.user 的存在
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 從 'Bearer TOKEN' 中取出 TOKEN
      token = req.headers.authorization.split(' ')[1];

      // 驗證 Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };

      // 將解碼後的使用者資訊附加到 req 物件上
      req.user = decoded;

      next(); // 驗證通過，進入下一個中介軟體或控制器
    } catch (error) {
      res.status(401).json({ status: 'error', message: 'Token is not valid' });
    }
  }

  if (!token) {
    res.status(401).json({ status: 'error', message: 'Authorization token missing' });
  }
};