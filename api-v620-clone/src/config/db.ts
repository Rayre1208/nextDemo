import { Pool } from 'pg';
import dotenv from 'dotenv';

// 執行 dotenv.config() 來載入 .env 檔案中的環境變數
// 建議將這行放在應用程式的最頂層，以確保所有地方都能讀取到
dotenv.config();

// 建立一個新的 Pool 實例
// Pool 的建構子參數會被 TypeScript 自動檢查型別
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dev_wiz',
  database: process.env.DB_NAME || 'dev_db',
  password: process.env.DB_PASSWORD || 'groguss',
  // process.env.DB_PORT 是字串，需要用 parseInt 轉換為數字
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// 直接導出 pool 實例。
// 在其他檔案中，可以直接 import { pool } from './config/db'
// 然後使用 pool.query(...) 或 await pool.connect()
export { pool };

