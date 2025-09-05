// controllers/mockApiController.js
const db = require('../config/db');

exports.handleGenericApi = async (req, res) => {
  const method = req.method;
  const path = req.path;
  const params = req.query;
  try {
    const result = await db.query(
      `SELECT response FROM api_mock WHERE method = $1 AND path = $2 AND params @> $3::jsonb LIMIT 1`,
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
};