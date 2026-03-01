# EasyStay-Platform AI Copilot Instructions

## 🏗 Project Architecture & Overview
This is a Monorepo project implementing a hotel booking platform with AI capabilities.
- **Root**: `EasyStay-Platform/`
- **Backend**: `server/` (Node.js, Express, Sequelize, MySQL)
  - Core Logic: Controller-Service-Model pattern.
  - **AI Core**: `src/services/agentService.js` (LangChain ReAct Agent with ZhipuAI GLM-4).
  - **Tools**: `src/services/tools.js` (Tools for the AI agent, wrapping DB and Amap API).
- **Mobile App**: `mobile-app/` (Taro, React, NutUI). Multi-platform frontend (H5/Mini-program).
- **Admin**: `admin-web/` (React, Vite). Management portal.

## 🚀 Critical Workflows

### 1. Backend Service
- **Start**: `cd server && node app.js`  *(Note: `npm run dev` might be missing in package.json)*
- **Reset Database**: `cd server && node init-db.js`
  - ⚠️ **Crucial**: This script drops tables (`force: true`) and reseeds initial data (Admin/Merchant/User + 2 default hotels). Run this if DB schema changes or data is corrupted.
- **Config**: Ensure `.env` in `server/` has valid `MYSQL_PASSWORD`, `GLM_API_KEY`, `AMAP_KEY`.

### 2. Frontend (Mobile)
- **Start H5**: `cd mobile-app && npm run dev:h5`
- **Port**: Default is `10086`.

## 🧩 Code Patterns & Conventions

### 🤖 AI Agent Development (`server/src/services/`)
- **Agent Pattern**: We use a **ReAct (Reasoning + Acting)** agent, not a simple chain.
- **Intent Routing**: The `chat` method in `agentService.js` first classifies intent (e.g., `hotel_search`, `chitchat`) before invoking heavy tools. Preserve this 2-step logic.
- **Tool Definitions** (`tools.js`):
  - **Schema**: Use `zod` for parameter validation.
  - **Optional Params**: Design tool parameters as `optional` (e.g., `city: z.string().optional()`) to allow broad searches (e.g., "Recommend a hotel with a gym" -> search all cities).
  - **Return Values**: Tools MUST return **Strings** (often `JSON.stringify(...)`) for the LLM to parse.

### 💾 Backend (Node.js + Sequelize)
- **Safe Queries**: Use `Op` from Sequelize.
  - ⚠️ **Tags Handling**: `tags` is stored as JSON string or text. Use `Sequelize.cast` for robust querying:
    ```javascript
    Sequelize.where(Sequelize.cast(Sequelize.col('tags'), 'CHAR'), 'LIKE', `%${keyword}%`)
    ```
- **Response Format**: Use `server/src/utils/response.js` helpers (`success`, `fail`).

### 📱 Frontend (Taro/React)
- **Routing**: Defined in `src/app.config.js`.
- **API Request**: Use `src/utils/request.js`. It handles the base URL and interceptors.
- **Assets**: Images in `src/assets`. Tabbar icons are crucial and referenced in `app.config.js`.

## ⚠️ Common Pitfalls & Fixes
1. **"Missing script: dev" (Server)**: The `server` package.json might lack a `dev` script. Use `node app.js` directly.
2. **500 Errors on List/Search**: often caused by querying non-existent columns (e.g., `RoomType.description`) or improper JSON field handling in `tags`. Always double-check model definitions (`server/src/models/`).
3. **AI "Phantom" Requirements**: If the AI insists on a city when none is needed, check `tools.js` schema properties. Mark non-critical fields as `.optional()`.

## 🧪 Testing
- **Manual Test**: Use the `init-db.js` script to reset state before testing complex flows like ordering.
- **AI Debugging**: Logs in `agentService.js` are verbose (`console.log`) to trace the "Thought/Action/Observation" loop. Check terminal output to debug Agent reasoning.
