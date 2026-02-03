# EasyStay 项目本地开发指南

大家辛苦了！服务器环境和自动化脚本我已经全部搞定。现在我们可以正式开始开发流程了。

请大家严格按照以下步骤操作，确保我们全组人的环境一致。

## 1. 准备工作
请确保你的电脑上安装了：
*   **Node.js** (版本 16 或 18 最好)
*   **Git**
*   **VS Code** (也可以安装 Cursor 或在VSCode使用 Copilot 辅助写代码)

## 2. 获取代码 (Git Clone)
打开你电脑想要存放项目的文件夹，右键打开终端（Terminal / CMD），执行：

```bash
# 1. 克隆我们的 GitHub 仓库
git clone https://github.com/IvoryThule/EasyStay-Platform.git

# 2. 进入项目目录
cd EasyStay-Platform
```

## 3. 首次启动 (安装依赖)
我们需要分别安装后端、PC端、移动端的依赖包。

**移动端：**

```bash
# 进入移动端目录
cd mobile-app
# 安装依赖
npm install
# 启动开发环境 (H5 模式)
npm run dev:h5
```
*成功后，浏览器会自动打开一个页面，这就是移动端的预览页。*

**PC 端：**

```bash
# 进入 PC 端目录
cd admin-web
# 安装依赖
npm install
# 启动开发环境
npm run dev
```
*成功后，控制台会显示一个 localhost 链接，点开就是 PC 管理后台。*

**后端：**

```bash
# 进入后端目录
cd server
npm install
# 启动本地后端
node app.js
```

## 4. 每日开发流程
为了防止代码冲突，请大家养成好习惯：

1.  **开工前**：一定要先拉取最新代码！
    
    ```bash
    git pull origin master
    ```
2.  **写代码**：
    
    *   **王宇涛**：只修改 `admin-web` 文件夹里的内容。
    *   **史乙彤**：只修改 `mobile-app` 文件夹里的内容。
    *   *注意：如果发现缺了什么依赖，及时在群里说。*
3.  **收工后**：提交你的代码。
    
    ```bash
    git add .
    git commit -m "type: message"
    git push origin master
    ```

## 5. 其他注意事项
*   后端接口我会尽快定义好，前期你们可以在代码里写死假数据 (Mock) 先画界面，不用等后端