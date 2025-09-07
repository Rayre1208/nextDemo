// controllers/postController.js (修改後)
const db = require('../config/db');

// ✨ 變更點 1: 函式名稱改為 searchPosts
exports.searchPosts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json({ results: [] });
    }

    // ✨ 變更點 2: 查詢的路徑改為 '/api/post/list'
    const fullPostListResult = await db.query(
      `SELECT response FROM api_mock WHERE path = '/api/post/list' AND method = 'GET' LIMIT 1`
    );

    if (fullPostListResult.rows.length === 0) {
      return res.status(404).json({ error: 'Master post list not found in database.' });
    }

    // ✨ 變更點 3: 取得 posts 陣列
    const allPosts = fullPostListResult.rows[0].response.posts;

    const searchTerm = query.toLowerCase();

    // ✨ 變更點 4: 過濾條件改為 post.title
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm)
    );

    res.json({ results: filteredPosts });

  } catch (err) {
    console.error("搜尋文章失敗:", err);
    res.status(500).json({ error: "Server error while searching posts." });
  }
};