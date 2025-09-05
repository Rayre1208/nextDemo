// api-v620-server.js (簡化後：只負責連線，不負責建表)
const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// 從環境變數讀取資料庫設定 (保持不變)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dev_wiz',
  database: process.env.DB_NAME || 'dev_db',
  password: process.env.DB_PASSWORD || 'groguss',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// 中介軟體 (Middleware)
app.use(express.json());

// --- ✨ 簡化後的資料庫初始化函式 ✨ ---
// 現在唯一的職責就是確認連線，不再建立資料表。
async function initializeDatabase() {
  // 增加重試機制 (保持不變，這在 Docker 環境中非常重要)
  for (let i = 0; i < 5; i++) {
    try {
      // 嘗試獲取一個連線並立刻釋放，只為了測試連線是否成功
      const client = await pool.connect();
      client.release();
      console.log("🐘 PostgreSQL 資料庫已成功連接！伺服器準備就緒。");
      return; // 成功連接後直接結束函式
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
}

// --- API 路由 (這部分完全不需要變動) ---
// 您的 API 路由會假設 'tasks' 資料表已經存在
app.get("/api/tasks", async (req, res) => {
  // ... 程式碼不變 ...
});

app.post("/api/tasks", async (req, res) => {
  // ... 程式碼不變 ...
});

// --- 靜態檔案服務 (保持不變) ---
app.use(express.static(path.join(__dirname, "public")));

// --- 啟動伺服器 (保持不變) ---
// 先執行資料庫連線測試，成功後再啟動 API 伺服器
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 API 伺服器成功啟動，監聽於 http://localhost:${port}`);
  });
});

