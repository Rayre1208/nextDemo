import { Request, Response } from 'express';
// 假設您的資料庫設定檔已改為 ts，並從中導入 pool
import { pool } from '../config/db.js'; 



// 使用 export const 導出函式，並為 req 和 res 加上型別
export const handleGenericApi = async (req: Request, res: Response): Promise<void> => {
  const method: string = req.method;
  const path: string = req.path;
  
  // req.query 的型別是 ParsedQs，這裡直接使用
  const params = req.query;

  try {
    // 使用 pool.query 進行資料庫查詢
    const result = await pool.query(
      // SQL 查詢語句不變
      `SELECT response FROM api_mock WHERE method = $1 AND path = $2 AND params @> $3::jsonb LIMIT 1`,
      // 傳遞給 SQL 的參數，確保 params 被轉換為 JSON 字串
      [method, "/api" + path, JSON.stringify(params)]
    );

    if (result.rows.length > 0) {
      // 成功找到 mock 資料，回傳 response 欄位的內容
      // result.rows[0].response 的型別會被推斷，通常是 any 或 object
      res.json(result.rows[0].response);
    } else {
      // 找不到對應的 mock 資料，回傳 404
      res.status(404).json({ error: "Mock not found" });
    }
  } catch (err: unknown) { // 將錯誤型別標註為 unknown，更安全
    // 在伺服器端印出詳細錯誤
    console.error("Database query error in handleGenericApi:", err);
    // 回傳通用的 500 伺服器錯誤訊息
    res.status(500).json({ error: "Internal server error" });
  }
};
