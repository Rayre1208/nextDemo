# 使用一個輕量的 Node.js 官方映像檔
FROM node:18-slim

# 在容器內建立一個工作目錄
WORKDIR /app

# 先複製 package.json 檔案
# 這樣可以利用 Docker 的快取機制，如果依賴不變，就不用每次都重新安裝
COPY package*.json ./

# 只安裝正式環境需要的依賴
RUN npm install --omit=dev

COPY . .

# ----------------------------------------------------
# ✨ 新增的關鍵步驟 ✨
# 將 /app 目錄下所有檔案和資料夾的擁有者更改為 node 使用者
# -R 的意思是遞迴處理 (recursively)，包含所有子資料夾
RUN chown -R node:node /app
# ----------------------------------------------------

# 告訴 Docker 容器將會監聽 5000 port
EXPOSE 5000

# 容器啟動時要執行的指令
CMD [ "node", "api-v620-server.js" ]