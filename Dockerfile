# 使用官方 Node LTS 版本
FROM node:18 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci

# 複製所有原始碼
COPY . .

# 編譯 Next.js 專案
RUN npm run build

# ---- Runner ----
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# 只帶上跑步期需要的檔案

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# 只複製必要檔案
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/mockData ./mockData
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src
# 如有其它後端檔案（response.js…）也一起 COPY

# 預設環境變數
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "server.js"]