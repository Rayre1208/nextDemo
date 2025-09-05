// api-v620-server.js (重構後)
const express = require("express");
const path = require('path');
const { pool } = require('./config/db'); // 引入 pool
const apiRoutes = require('./routes/index'); // 引入主路由器

const app = express();
const port = process.env.PORT || 5000;

// --- 中介軟體 (Middleware) ---
app.use(express.json());

// --- ✨ 新增回來：靜態檔案服務 ---
// 讓使用者訪問根目錄時能看到 public/index.html
// 建議放在 API 路由之前
app.use(express.static(path.join(__dirname, "public")));

// --- 掛載主 API 路由器 ---
// 所有 /api 開頭的請求都會進入 routes/index.js 進行處理
app.use("/api", apiRoutes);

// --- 資料庫初始化 ---
// (這段 initializeDatabase 函式保持不變或可以移到 config/db.js 中)
async function initializeDatabase() {
  let client;
  for (let i = 0; i < 5; i++) {
    try {
      client = await pool.connect();
      console.log("🐘 PostgreSQL 資料庫已成功連接！");
      break;
    } catch (err) {
      console.log(`... 資料庫連接失敗，5 秒後重試 (${i + 1}/5)`);
      if (i === 4) {
        console.error("❌ 無法連接到資料庫:", err.stack);
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  // ... (建立資料表的邏輯不變)
  // ...
  if (client) client.release();
}


// --- 啟動伺服器 ---
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 API 伺服器成功啟動，監聽於 http://localhost:${port}`);
  });
});