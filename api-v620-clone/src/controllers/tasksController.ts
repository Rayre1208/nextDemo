import { Request, Response } from 'express';
// 假設您的資料庫設定檔已改為 ts，並從中導入 pool
import { pool } from '../config/db.js';

// 定義 Task 物件的介面 (Interface)
interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
}

// 取得所有任務
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // 使用泛型 <Task> 告訴 TypeScript 查詢結果會是 Task 物件的陣列
    const result = await pool.query<Task>("SELECT * FROM tasks ORDER BY id ASC;");
    res.json({ status: "success", data: result.rows });
  } catch (err: unknown) { // 使用 unknown 捕捉錯誤
    console.error("讀取 tasks 失敗:", err);
    res.status(500).json({ status: "error", message: "無法從資料庫讀取資料。" });
  }
};

// 新增一筆任務
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // 從請求的 body 中解構出 title
    const { title } = req.body as { title: string };

    // 驗證 title 是否存在
    if (!title) {
      res.status(400).json({ status: "error", message: "請求 body 中缺少 'title' 欄位。" });
      return;
    }

    // 將新任務插入資料庫，並使用 RETURNING * 取回完整的任務物件
    const result = await pool.query<Task>(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *;",
      [title]
    );

    // 回傳 201 Created 狀態碼以及新增的任務資料
    res.status(201).json({ status: "success", message: "已成功新增任務。", data: result.rows[0] });
  } catch (err: unknown) { // 使用 unknown 捕捉錯誤
    console.error("新增 task 失敗:", err);
    res.status(500).json({ status: "error", message: "無法將資料寫入資料庫。" });
  }
};
