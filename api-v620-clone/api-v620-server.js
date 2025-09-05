// api-v620-server.js (最終版：從環境變數讀取設定並加入重試機制)
const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// --- ✨ 變更點 #1：從環境變數讀取資料庫設定 ---
// 這樣做可以讓程式碼與設定分離，更具彈性且安全。
// 我們也為每個變數提供了預設值，方便在非 Docker 環境下單獨測試。
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dev_wiz',
  database: process.env.DB_NAME || 'dev_db',
  password: process.env.DB_PASSWORD || 'groguss',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// --- 中介軟體 (Middleware) ---
app.use(express.json());


// --- ✨ 變更點 #2：資料庫初始化函式 (加入重試機制) ---
// 這個關鍵函式會在伺服器啟動前執行，確保一切就緒。
async function initializeDatabase() {
  let client;
  // 增加重試機制，因為 API 容器可能比 DB 完全準備好還要早啟動。
  for (let i = 0; i < 5; i++) {
    try {
      client = await pool.connect();
      console.log("🐘 PostgreSQL 資料庫已成功連接！");
      break; // 成功連接後跳出迴圈
    } catch (err) {
      console.log(`... 資料庫連接失敗，5 秒後重試 (${i + 1}/5)`);
      if (i === 4) {
        // 重試 5 次後仍然失敗，則印出詳細錯誤並退出。
        console.error("❌ 無法連接到資料庫，請檢查 docker-compose.yml 的環境變數與網路設定:", err.stack);
        process.exit(1);
      }
      // 等待 5 秒
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  // 連線成功後，繼續檢查並建立資料表。
  try {
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
    console.error("❌ 資料表初始化失敗:", err.stack);
    process.exit(1);
  } finally {
    // 釋放客戶端連線
    if (client) {
      client.release();
    }
  }
}

// --- API 路由 (這部分完全不需要變動) ---
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC;");
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    console.error("讀取 tasks 失敗:", err);
    res.status(500).json({ status: "error", message: "無法從資料庫讀取資料。" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ status: "error", message: "請求 body 中缺少 'title' 欄位。" });
  }
  try {
    const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *;", [title]);
    res.status(201).json({ status: "success", message: "已成功新增任務。", data: result.rows[0] });
  } catch (err) {
    console.error("新增 task 失敗:", err);
    res.status(500).json({ status: "error", message: "無法將資料寫入資料庫。" });
  }
});

// 通用 API Handler
app.use("/api", async (req, res) => {
  const method = req.method;               // GET / POST / PUT ...
  const path = req.path;                   // e.g. /post/details
  const params = req.query;                // e.g. { title: "post01" }

  try {
    const result = await pool.query(
      `SELECT response 
       FROM api_mock 
       WHERE method = $1 
         AND path = $2 
         AND params @> $3::jsonb
       LIMIT 1`,
      [method, "/api" + path, JSON.stringify(params)]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0].response);
    } else {
      res.status(404).json({ error: "Mock not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// --- 靜態檔案服務 (保持不變) ---
app.use(express.static(path.join(__dirname, "public")));


// --- 啟動伺服器 (保持不變) ---
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 API 伺服器成功啟動，監聽於 http://localhost:${port}`);
  });
});

