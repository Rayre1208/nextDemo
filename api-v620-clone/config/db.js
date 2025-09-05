// config/db.js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dev_wiz',
  database: process.env.DB_NAME || 'dev_db',
  password: process.env.DB_PASSWORD || 'groguss',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// 也可以將 initializeDatabase 邏輯移到這裡
// ...

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // 匯出 pool 供 initializeDatabase 使用
};