// controllers/paginationController.js (最終修正版)
const db = require('../config/db');

exports.getPaginatedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const perPage = parseInt(req.query.perPage || '10', 10);

    if (isNaN(page) || page < 1 || isNaN(perPage) || perPage < 1) {
      return res.status(400).json({ error: 'Page and perPage must be positive integers.' });
    }

    const limit = perPage;
    const offset = (page - 1) * perPage;

    const [
      totalItemsResult,
      categoryOptionsResult,
      productsResult
    ] = await Promise.all([
      db.query('SELECT COUNT(*) FROM products'),
      // ✨ 修正 #3: 將 CASE 語句同時放入 SELECT 和 ORDER BY 中
      db.query(`
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
      db.query(`
        SELECT * FROM products
        ORDER BY CAST(substring(id from 'id-(\\d+)') AS INTEGER)
        LIMIT $1 OFFSET $2
      `, [limit, offset])
    ]);

    const totalItems = parseInt(totalItemsResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalItems / perPage);
    const categoryOptions = categoryOptionsResult.rows.map(row => row.category);
    const products = productsResult.rows;

    res.json({
      products,
      totalPages,
      totalItems,
      categoryOptions
    });

  } catch (err) {
    console.error("讀取分頁產品失敗:", err);
    res.status(500).json({ error: "Server error while fetching paginated products." });
  }
};