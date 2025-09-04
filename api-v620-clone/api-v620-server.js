// api-v620-server.js (合併後版本)
const express = require("express");
const path = require("path");
const { Pool } = require("pg"); // <--- 重新啟用 node-postgres

const app = express();
const port = process.env.PORT || 5000;

// --- 資料庫連線設定 ---
// 使用您在 DBeaver 中為開發建立的獨立帳號與資料庫
// 請務必更新 '...' 的部分以符合您的真實設定
const pool = new Pool({
  user: 'dev_wiz',             // 您建立的開發者帳號
  host: 'host.docker.internal',            // 資料庫主機
  database: 'dev_db',           // 您建立的開發資料庫
  password: 'groguss', // 您的密碼
  port: 5432,                   // PostgreSQL 預設 Port
});

// --- 中介軟體 (Middleware) ---
// 啟用 express.json()，這樣我們的 API 才能解析 POST 請求中的 JSON body
app.use(express.json());


// --- 資料庫初始化函式 ---
// 這個關鍵函式會在伺服器啟動前執行，確保一切就緒
async function initializeDatabase() {
  let client;
  try {
    client = await pool.connect();
    console.log("🐘 PostgreSQL 資料庫已成功連接！");

    // 關鍵步驟：建立一個名為 "tasks" 的資料表，但前提是它不存在 (IF NOT EXISTS)
    // 這樣可以保證每次啟動伺服器時，資料表都處於可用狀態，避免錯誤
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        is_done BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await client.query(createTableQuery);
    console.log("✅ 'tasks' 資料表已確認存在，伺服器準備就緒。");

  } catch (err) {
    console.error("❌ 資料庫初始化失敗，請檢查連線設定:", err.stack);
    // 如果資料庫設定錯誤，伺服器將無法啟動，避免後續產生更多問題
    process.exit(1);
  } finally {
    // 釋放客戶端連線
    if (client) {
      client.release();
    }
  }
}

// --- API 路由 (取代舊的模擬路由) ---

// [GET] /api/tasks - 從資料庫取得所有任務
app.get("/api/tasks", async (req, res) => {
  try {
    // 從連線池執行查詢
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC;");
    // 將查詢結果以 JSON 格式回傳
    res.json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error("讀取 tasks 失敗:", err);
    res.status(500).json({ status: "error", message: "無法從資料庫讀取資料。" });
  }
});

// [POST] /api/tasks - 在資料庫中新增一筆任務
app.post("/api/tasks", async (req, res) => {
  const { title } = req.body; // 從請求的 body 中取得 'title'

  if (!title) {
    return res.status(400).json({ status: "error", message: "請求 body 中缺少 'title' 欄位。" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *;",
      [title]
    );
    res.status(201).json({
      status: "success",
      message: "已成功新增任務。",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("新增 task 失敗:", err);
    res.status(500).json({ status: "error", message: "無法將資料寫入資料庫。" });
  }
});


// --- 靜態檔案服務 (保持不變) ---
app.use(express.static(path.join(__dirname, "public")));


// --- 啟動伺服器 (更新後的啟動流程) ---
// 1. 先執行資料庫初始化
// 2. 成功後，再啟動 Express 伺服器監聽請求
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 API 伺服器成功啟動，監聽於 http://localhost:${port}`);
    console.log("➡️  現在可以測試 API: GET http://localhost:5000/api/tasks");
  });
});

