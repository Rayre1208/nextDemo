import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../config/db.js';

// 建立一個介面來描述產品物件的結構，有助於型別檢查
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  // ...您可以根據資料庫欄位添加更多屬性
}

// 導出 getPaginatedProducts 函式
export const getPaginatedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.query 的值可能是 string | string[] | ParsedQs | ParsedQs[]
    // 我們預期它是 string，所以進行型別斷言 (as string)
    const pageString = (req.query.page as string) || '1';
    const perPageString = (req.query.perPage as string) || '10';

    const page = parseInt(pageString, 10);
    const perPage = parseInt(perPageString, 10);

    // 檢查轉換後的數字是否合法
    if (isNaN(page) || page < 1 || isNaN(perPage) || perPage < 1) {
      res.status(400).json({ error: 'Page and perPage must be positive integers.' });
      return; // 明確返回，終止函式
    }

    const limit = perPage;
    const offset = (page - 1) * perPage;

    // 使用 Promise.all 平行執行所有資料庫查詢
    // 並使用泛型為每個查詢結果指定型別
    const [
      totalItemsResult,
      categoryOptionsResult,
      productsResult
    ] = await Promise.all([
      pool.query<{ count: string }>('SELECT COUNT(*) FROM products'),
      pool.query<{ category: string }>(`
        SELECT DISTINCT category,
          CASE
            WHEN category = 'Clothing' THEN 1
            WHEN category = 'Accessories' THEN 2
            WHEN category = 'Shoes' THEN 3
            ELSE 4
          END as sort_order
        FROM products
        ORDER BY sort_order
      `),
      pool.query<Product>(`
        SELECT * FROM products
        ORDER BY CAST(substring(id from 'id-(\\d+)') AS INTEGER)
        LIMIT $1 OFFSET $2
      `, [limit, offset])
    ]);

    // 從查詢結果中提取資料
    const totalItems = parseInt(totalItemsResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalItems / perPage);
    // 因為上面指定了型別，所以 row.category 會有自動完成提示
    const categoryOptions = categoryOptionsResult.rows.map(row => row.category);
    // productsResult.rows 的型別現在是 Product[]
    const products = productsResult.rows;

    // 回傳最終的 JSON 物件
    res.json({
      products,
      totalPages,
      totalItems,
      categoryOptions
    });

  } catch (err: unknown) { // 使用 unknown 型別來捕捉錯誤
    console.error("讀取分頁產品失敗:", err);
    res.status(500).json({ error: "Server error while fetching paginated products." });
  }
};
