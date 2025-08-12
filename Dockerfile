# 使用官方 Node LTS 版本
FROM node:18-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有原始碼
COPY . .

# 編譯 Next.js 專案
RUN npm run build

# --------- Production Image ---------
FROM node:18-alpine AS runner

WORKDIR /app

# 只複製必要檔案
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

# 預設環境變數
ENV NODE_ENV=production

# 預設啟動指令
CMD ["npm", "start"]

EXPOSE 8084