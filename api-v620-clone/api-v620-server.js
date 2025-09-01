const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

// 設定靜態檔案服務，這是目前唯一需要的功能
// 告訴 Express，當使用者訪問網站時，去 'public' 資料夾找檔案
app.use(express.static(path.join(__dirname, 'public')));

// 啟動這個獨立的伺服器
app.listen(PORT, () => {
  console.log(`🚀 Standalone API Clone server is running on http://localhost:${PORT}`);
});