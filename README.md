# EasyStay 酒店预订平台

一个基于 AI 智能体的大模型全栈酒店预订平台。集成 GLM-4.7 LLM 和高德地图服务。

---

## 🚀 快速启动指南

在开始开发前，请确保你已经安装了以下环境：
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (用于运行本地数据库)

### 1. 初始化项目

```bash
# 克隆仓库 (如果你还没克隆)
git clone https://github.com/IvoryThule/EasyStay-Platform.git
cd EasyStay-Platform

# 初始化本地数据库 (需要 Docker)
docker-compose up -d
# 首次运行请等待几秒，确保数据库完全启动
```

### 2. 启动后段服务 (Server)

```bash
cd server

# 安装依赖
npm install

# 配置环境变量 (首次需要)
# Windows Powershell:
copy .env.example .env
# Mac/Linux:
# cp .env.example .env

# 打开 server/.env 并根据本地情况填入配置 (DB_HOST=localhost, DB_PORT=3307 等)

# 启动开发服务器
npm run dev
```
后端服务默认运行在: `http://localhost:3000`

### 3. 启动管理后台 (Admin Web)

```bash
# 新开一个终端窗口
cd admin-web

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
管理后台默认运行在: `http://localhost:5173`

### 4. 启动移动端应用 (Mobile App)

```bash
# 新开一个终端窗口
cd mobile-app

# 安装依赖
npm install

# 启动 H5 预览 (快速调试)
npm run dev:h5

# 或者启动 React Native (需配置环境)
# npm run dev:rn
```

---

## 📂 目录结构说明

- **`server/`**: Node.js 后端服务 (Express + Sequelize)
- **`admin-web/`**: 酒店商家与管理员后台 (React + Vite + Ant Design)
- **`mobile-app/`**: C端用户移动端应用 (Taro + NutUI React)
- **`deploy/`**: 部署配置文件 (Nginx 等)

- **`docs/`**: 项目文档 (API 接口、数据库设计等)
- **`scripts/`**: 自动化运维脚本

## 🤝 协作规范

- 提交代码前，请确保本地运行无误。
- 提交信息请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范 (例如: `feat: 新增登录页面`, `fix: 修复订单接口报错`)。
- 不要在 Git 中提交你的 `.env` 文件或 `node_modules`。

---
Happy Coding! 🎉

