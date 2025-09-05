// server.js
const express = require('express');
const next = require('next');

// env
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || (dev ? '8084' : '3000'), 10);

console.log('--- server.js script started ---');
console.log(`--- NODE_ENV=${process.env.NODE_ENV}, dev=${dev} ---`);

// Next.js app
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  // 交給 Next
  server.all('/{*splat}', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://localhost:${port} (dev=${dev})`);
  });
})
  .catch((ex) => {
    console.error("❌ An error occurred during server setup:", ex.stack);
  });