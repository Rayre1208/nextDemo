// controllers/tasksController.js
const db = require('../config/db');

exports.getTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC;");
    res.json({ status: "success", data: result.rows });
  } catch (err) {
    console.error("讀取 tasks 失敗:", err);
    res.status(500).json({ status: "error", message: "無法從資料庫讀取資料。" });
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ status: "error", message: "請求 body 中缺少 'title' 欄位。" });
  }
  try {
    const result = await db.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *;", [title]);
    res.status(201).json({ status: "success", message: "已成功新增任務。", data: result.rows[0] });
  } catch (err) {
    console.error("新增 task 失敗:", err);
    res.status(500).json({ status: "error", message: "無法將資料寫入資料庫。" });
  }
};