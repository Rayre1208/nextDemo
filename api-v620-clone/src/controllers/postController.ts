import { Request, Response } from 'express';
// 假設您的資料庫設定檔已改為 ts，並從中導入 pool
import { pool } from '../config/db.js';

// 定義單篇文章的介面 (Interface)，描述其基本結構
interface Post {
  id: number;
  title: string;
  content: string;
  // ... 其他可能的文章屬性
}

// 定義從 api_mock 資料庫取回的 response 欄位的結構
interface MockApiResponse {
  posts: Post[];
}

// ✨ 函式名稱為 searchPosts
export const searchPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    // 從查詢參數中取得 query，並斷言其型別為 string
    const query = req.query.query as string;

    // 如果沒有查詢字串，直接回傳空陣列
    if (!query) {
      res.json({ results: [] });
      return;
    }

    // ✨ 查詢的路徑為 '/api/post/list'
    // 使用泛型 <{ response: MockApiResponse }> 來指定查詢結果的型別
    const fullPostListResult = await pool.query<{ response: MockApiResponse }>(
      `SELECT response FROM api_mock WHERE path = '/api/post/list' AND method = 'GET' LIMIT 1`
    );

    // 如果在資料庫中找不到對應的 mock 資料
    if (fullPostListResult.rows.length === 0) {
      res.status(404).json({ error: 'Master post list not found in database.' });
      return;
    }

    // ✨ 取得 posts 陣列
    // 因為上面已指定型別，所以 TypeScript 知道 response 裡面有 posts 屬性
    const allPosts: Post[] = fullPostListResult.rows[0].response.posts;

    // 將搜尋詞轉為小寫以便比對
    const searchTerm = query.toLowerCase();

    // ✨ 過濾條件為 post.title
    // TypeScript 也知道 post 物件有 title 屬性
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm)
    );

    // 回傳過濾後的結果
    res.json({ results: filteredPosts });

  } catch (err: unknown) { // 使用 unknown 捕捉錯誤更安全
    console.error("搜尋文章失敗:", err);
    res.status(500).json({ error: "Server error while searching posts." });
  }
};
