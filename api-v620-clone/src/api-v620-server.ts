import express, { Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { PoolClient } from 'pg'; // 引入 pg 的型別
import { pool } from './config/db.js'; // 引入 pool (假設 db.ts 存在)
import apiRoutes from './routes/index.js'; // 引入主路由器


// ✨ 型別註記：將 app 宣告為 Express 的 Application 型別
const app: Application = express();
const port: string | number = process.env.PORT || 5000;

// --- 中介軟體 (Middleware) ---
app.use(express.json());

// --- 靜態檔案服務 ---
// 讓使用者訪問根目錄時能看到 public/index.html
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// --- 掛載主 API 路由器 ---
// 所有 /api 開頭的請求都會進入 routes/index.js 進行處理
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api", apiRoutes);

// --- 資料庫初始化 ---
// ✨ 型別註記：函式回傳一個 Promise<void>
async function initializeDatabase(): Promise<void> {
  let client: PoolClient | undefined; // ✨ 型別註記：宣告 client 的型別
  for (let i = 0; i < 5; i++) {
    try {
      client = await pool.connect();
      console.log("🐘 PostgreSQL 資料庫已成功連接！");
      break;
    } catch (err: any) { // ✨ 型別註記：為錯誤物件加上型別
      console.log(`... 資料庫連接失敗，5 秒後重試 (${i + 1}/5)`);
      if (i === 4) {
        console.error("❌ 無法連接到資料庫:", err.stack);
        process.exit(1); // 結束進程
      }
      // 使用 Promise 進行非同步等待
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  // ... (此處應有建立資料表的邏輯)
  // ...

  // 確保 client 存在再釋放
  if (client) {
    client.release();
  }
}

// --- 啟動伺服器 ---
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 API 伺服器成功啟動，監聽於 http://localhost:${port}`);
  });
});
