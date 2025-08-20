// server.js
const express = require('express');
const next = require('next');
const path = require('path');

// env
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || (dev ? '8084' : '3000'), 10);

console.log('--- server.js script started ---');
console.log(`--- NODE_ENV=${process.env.NODE_ENV}, dev=${dev} ---`);

// Next.js app
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

console.log('--- Preparing Next.js app... ---');


app.prepare().then(() => {
     console.log('--- Next.js app prepared. Setting up Express server... ---');
  const server = express();

  // 基本中介層
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // === 將 ExpressServer 的資料檔搬到 nextDemo 根目錄後，這樣引入 ===
  // e.g. nextDemo/mockData/products.js
  const responseproducts = require('./mockData/products');
  const responserdmUser20 = require('./mockData/randomUser20');

  // 建一個 API Router，路徑「不含 /api」以相容 Nginx 會去掉 /api 的設定
  const api = express.Router();

  // /products（可接受 ?query=xxx）
  api.get('/products', (req, res) => {
    const query = req.query.query?.toLowerCase();
    const filtered = query
      ? responseproducts.products.filter(p =>
          p.randomtutors.name.full.toLowerCase().includes(query)
        )
      : responseproducts.products;

    res.json({ products: filtered });
  });

  // /randomUser20
  api.get('/randomUser20', (req, res) => {
    res.json(responserdmUser20);
  });

  // /tests（在 monolithic 下通常同源，不太需要 CORS；保留以便你測）
  api.get('/tests', (req, res) => {
    // 若確實跨源才加，或以環境變數控制
    if (process.env.ALLOW_DEV_CORS === '1') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8084');
    }
    res.json({ products: 'test7' });
  });

  // --- 掛載 Router ---
  // A 方案：同時支援「直打 Node」和「經 Nginx 去掉 /api」：
  server.use('/', api);       // 直打：/products
  server.use('/api', api);    // 前端一律打：/api/products

  // B 方案（想全面正規化成 /api/... 時，改用這個，並把上面兩行改成只留這一行）：
  // if (process.env.API_PREFIX === '/api') {
  //   server.use('/api', api);
  // } else {
  //   server.use('/', api);
  // }

  // 其餘交給 Next
  server.all('/{*splat}', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://localhost:${port} (dev=${dev})`);
  });
})
// 👇 從這裡開始修改 👇
.catch((ex) => {
  // 這個 catch 區塊會捕捉到 app.prepare() 或 then() 內部發生的任何錯誤
  console.error("❌ An error occurred during server setup:", ex.stack);
  process.exit(1); // 以錯誤碼 1 退出，表示啟動失敗
});