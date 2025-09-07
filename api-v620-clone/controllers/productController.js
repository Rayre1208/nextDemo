// controllers/productController.js
const db = require('../config/db');

exports.searchProducts = async (req, res) => {
  try {
    // 1. 從請求中獲取查詢關鍵字
    const { query } = req.query;

    // 如果沒有提供查詢關鍵字，返回空結果
    if (!query) {
      return res.json({ results: [] });
    }

    // 2. 從資料庫中撈出完整的產品列表
    //    我們直接查找之前存入的 /api/product/list 的靜態回應
    const fullProductListResult = await db.query(
      `SELECT response FROM api_mock WHERE path = '/api/product/list' AND method = 'GET' LIMIT 1`
    );

    if (fullProductListResult.rows.length === 0) {
      return res.status(404).json({ error: 'Master product list not found in database.' });
    }

    // 3. 取得產品陣列
    const allProducts = fullProductListResult.rows[0].response.products;

    // 4. 在 Node.js 中進行過濾 (filter)
    //    這裡我們使用 toLowerCase() 來進行不分大小寫的比對
    const searchTerm = query.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );

    // 5. 將過濾後的結果用 "results" 這個 key 包裝起來並回傳
    res.json({ results: filteredProducts });

  } catch (err) {
    console.error("搜尋產品失敗:", err);
    res.status(500).json({ error: "Server error while searching products." });
  }
};