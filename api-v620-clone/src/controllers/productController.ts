import { Request, Response } from 'express';
// 假設您的資料庫設定檔已改為 ts，並從中導入 pool
import { pool } from '../config/db.js';

// 定義單一產品的介面 (Interface)
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  // ... 其他可能的產品屬性
}

// 定義從 api_mock 資料庫取回的 response 欄位的結構
interface MockApiResponse {
  products: Product[];
}

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. 從請求中獲取查詢關鍵字，並斷言其型別為 string
    const query = req.query.query as string;

    // 如果沒有提供查詢關鍵字，返回空結果
    if (!query) {
      res.json({ results: [] });
      return;
    }

    // 2. 從資料庫中撈出完整的產品列表
    //    使用泛型 <{ response: MockApiResponse }> 來指定查詢結果的型別
    const fullProductListResult = await pool.query<{ response: MockApiResponse }>(
      `SELECT response FROM api_mock WHERE path = '/api/product/list' AND method = 'GET' LIMIT 1`
    );

    if (fullProductListResult.rows.length === 0) {
      res.status(404).json({ error: 'Master product list not found in database.' });
      return;
    }

    // 3. 取得產品陣列
    //    TypeScript 現在知道 response 裡有 products 屬性，且其型別為 Product[]
    const allProducts: Product[] = fullProductListResult.rows[0].response.products;

    // 4. 在 Node.js 中進行過濾 (filter)
    const searchTerm = query.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
      // TypeScript 知道 product 物件有 name 屬性
      product.name.toLowerCase().includes(searchTerm)
    );

    // 5. 將過濾後的結果用 "results" 這個 key 包裝起來並回傳
    res.json({ results: filteredProducts });

  } catch (err: unknown) { // 使用 unknown 捕捉錯誤更安全
    console.error("搜尋產品失敗:", err);
    res.status(500).json({ error: "Server error while searching products." });
  }
};
