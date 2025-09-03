const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// --- 資料庫連線設定 (來自您的 API 伺服器) ---
const pool = new Pool({
  user: "wistorian",
  host: "localhost",
  database: "my_project_db",
  password: "gragess", // 請記得換成您的資料庫密碼
  port: 5432,
});

// --- 兼容點 1: 首先定義 API 路由 ---
// 處理所有 /api 開頭的請求
app.use("/api", async (req, res) => {
  const method = req.method;        // GET / POST / PUT ...
  const requestPath = req.path;     // e.g. /post/details
  const params = req.query;         // e.g. { title: "post01" }

  console.log(`[API] Received: ${method} ${req.originalUrl}`);

  try {
    const result = await pool.query(
      `SELECT response 
       FROM api_mock 
       WHERE method = $1 
         AND path = $2 
         AND params @> $3::jsonb
       LIMIT 1`,
      // 在資料庫中儲存的路徑應包含 /api，例如 /api/post/details
      [method, "/api" + requestPath, JSON.stringify(params)]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0].response);
    } else {
      res.status(404).json({ error: "Mock not found for the given method, path, and params" });
    }
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- 兼容點 2: 接著定義靜態檔案服務 ---
// 如果請求路徑不是 /api/*，Express 會繼續往下找
// 這裡它會嘗試從 'public' 資料夾中尋找匹配的檔案
app.use(express.static(path.join(__dirname, 'public')));

// 處理所有其他路由，可以返回前端應用的主頁
// 這對於使用 React Router 或 Vue Router 的單頁應用 (SPA) 特別有用
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// --- 啟動合併後的伺服器 ---
app.listen(port, () => {
  console.log(`🚀 Unified server is running on http://localhost:${port}`);
  console.log(`- API mock requests are handled at /api/*`);
  console.log(`- Static files are served from the 'public' directory`);
});
