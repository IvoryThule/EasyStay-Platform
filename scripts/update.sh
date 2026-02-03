#!/bin/bash
set -e # 遇到错误立即停止

# === 配置区 ===
# 你的 Gitee 仓库地址
GIT_REPO="https://gitee.com/IvoryThule/EasyStay-Platform.git"
# 项目源码目录
REPO_DIR="/var/www/easystay/repo"
# Nginx 读取的静态资源目录
WEB_ROOT="/var/www/easystay/current"

echo "====== [Step 1] 拉取最新代码 ======"
if [ ! -d "$REPO_DIR" ]; then
    echo ">>> 目录不存在，克隆仓库..."
    git clone $GIT_REPO $REPO_DIR
else
    echo ">>> 目录已存在，更新代码..."
    cd $REPO_DIR
    # 强制丢弃本地修改，与远程保持一致
    git fetch --all
    git reset --hard origin/master
    git pull origin master
fi

echo "====== [Step 2] 部署后端 (Server) ======"
cd $REPO_DIR/server
# 安装生产依赖
npm install --production --silent
# 检查 .env 是否存在
if [ ! -f ".env" ]; then
    echo "⚠️ 警告: server/.env 不存在！请手动创建它，否则数据库连不上。"
fi
# 重启 PM2 服务
echo ">>> 重启后端服务..."
pm2 reload easystay-api 2>/dev/null || pm2 start app.js --name "easystay-api"

echo "====== [Step 3] 构建 PC 端 (Admin) ======"
cd $REPO_DIR/admin-web
echo ">>> 安装 PC 端依赖..."
npm install --silent
echo ">>> 打包 PC 端..."
npm run build
# 部署到 Web 根目录
mkdir -p $WEB_ROOT
rm -rf $WEB_ROOT/admin
cp -r dist $WEB_ROOT/admin

echo "====== [Step 4] 构建移动端 (Mobile) ======"
cd $REPO_DIR/mobile-app
echo ">>> 安装移动端依赖..."
npm install --silent
echo ">>> 打包移动端 H5..."
npm run build:h5
# 部署到 Web 根目录
rm -rf $WEB_ROOT/mobile
cp -r dist $WEB_ROOT/mobile

echo "====== [Step 5] 权限修正 ======"
chown -R www-data:www-data $WEB_ROOT
chmod -R 755 $WEB_ROOT

echo "✅✅✅ 部署完成！访问 http://1.14.207.212 查看效果"