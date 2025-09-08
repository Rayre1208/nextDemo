# --- 第 1 階段：建置階段 (Builder) ---
# 使用包含完整建置工具的 Node.js 版本，並將此階段命名為 "builder"
FROM node:18 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝所有依賴，包含建置需要的 devDependencies
RUN npm install

# 複製所有剩餘的專案檔案 (包含 src, public, tsconfig.json 等)
COPY . .

# 執行 TypeScript 編譯指令，產生 dist 資料夾
RUN npm run build


# --- 第 2 階段：正式運行階段 (Production) ---
# 使用一個輕量的 slim 版本，縮小最終映像檔體積
FROM node:18-slim

WORKDIR /app

# 從第一階段複製 package.json 和 package-lock.json
COPY package*.json ./

# 只安裝正式環境需要的依賴，忽略 devDependencies
RUN npm install --omit=dev

# 從名為 "builder" 的第一階段中，複製編譯好的 dist 資料夾過來
COPY --from=builder /app/dist ./dist

# 同樣從第一階段，複製 public 資料夾過來
COPY --from=builder /app/public ./public

# 開放容器的 5000 埠
EXPOSE 5000

# 執行 dist 資料夾中編譯好的 JS 檔案來啟動伺服器
CMD [ "node", "dist/api-v620-server.js" ]