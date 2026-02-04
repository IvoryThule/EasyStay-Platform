#!/usr/bin/env bash
set -euo pipefail

# === 配置区 ===
PROJECT_ROOT="/var/www/easystay"
REPO_DIR="$PROJECT_ROOT/repo"           # 源码目录
WEBROOT="$PROJECT_ROOT/current"         # Nginx 指向的静态资源目录
SERVER_DIR="$REPO_DIR/server"
ADMIN_DIR="$REPO_DIR/admin-web"
MOBILE_DIR="$REPO_DIR/mobile-app"
NGINX_CONF_SRC="$REPO_DIR/deploy/nginx.conf"  # 仓库里的配置源文件
NGINX_CONF_DEST="/etc/nginx/sites-enabled/easystay" # Nginx 启用的配置位置

BRANCH="master"
WWW_USER="www-data"
LOGFILE="/var/log/easystay_deploy.log"

# 为了防止构建时内存溢出，增加 Node 内存限制
export NODE_OPTIONS="--max-old-space-size=1536"

echo -e "\033[0;32m=== 开始部署 EasyStay $(date) ===\033[0m" | tee -a "$LOGFILE"

# 1. 更新代码
echo ">>> Step 1: 拉取代码..." | tee -a "$LOGFILE"
if [ ! -d "$REPO_DIR" ]; then
    echo "克隆仓库..."
    git clone git@gitee.com:IvoryThule/EasyStay-Platform.git "$REPO_DIR"
fi
cd "$REPO_DIR"
git fetch --all
git reset --hard origin/$BRANCH
git clean -fd

# 2. 部署后端
echo ">>> Step 2: 部署后端 (Server)..." | tee -a "$LOGFILE"
cd "$SERVER_DIR"
if [ ! -f .env ]; then
    echo "警告: .env 文件不存在，请手动创建！" | tee -a "$LOGFILE"
fi
npm install --production --silent
# 确保 upload 目录存在并有权限
mkdir -p uploads
chmod -R 775 uploads
chown -R $USER:$WWW_USER uploads

# 使用 PM2 重启 (进程名 easystay-api)
if command -v pm2 >/dev/null; then
    pm2 reload easystay-api 2>/dev/null || pm2 start app.js --name "easystay-api"
    pm2 save
else
    echo "错误: 未安装 PM2" | tee -a "$LOGFILE"
fi

# 3. 构建 PC 端
echo ">>> Step 3: 构建 PC 端 (Admin)..." | tee -a "$LOGFILE"
cd "$ADMIN_DIR"
npm install --silent
npm run build
# 结果在 dist，移动到 webroot
mkdir -p "$WEBROOT"
# 原子替换 admin
rsync -a --delete "$ADMIN_DIR/dist/" "$WEBROOT/admin/"

# 4. 构建移动端
echo ">>> Step 4: 构建移动端 (Mobile)..." | tee -a "$LOGFILE"
cd "$MOBILE_DIR"
npm install --silent
# Taro 构建 H5
npm run build:h5
# 原子替换 mobile
rsync -a --delete "$MOBILE_DIR/dist/" "$WEBROOT/mobile/"

# 5. 权限修正
echo ">>> Step 5: 修正权限..." | tee -a "$LOGFILE"
chown -R $USER:$WWW_USER "$WEBROOT"
chmod -R 755 "$WEBROOT"

# === 6.Nginx 配置更新 ===
echo ">>> Step 6: 更新 Nginx 配置..." | tee -a "$LOGFILE"
if [ -f "$NGINX_CONF_SRC" ]; then
    # 创建软链接：直接链接到 sites-enabled，覆盖旧的
    # 注意：这里直接覆盖了原来的配置
    ln -sf "$NGINX_CONF_SRC" "$NGINX_CONF_DEST"
    
    # 测试配置是否正确
    echo "测试 Nginx 配置..."
    if nginx -t; then
        echo "配置正确，重载 Nginx..."
        systemctl reload nginx
    else
        echo "错误: Nginx 配置测试失败，请检查 deploy/nginx.conf" | tee -a "$LOGFILE"
        # 不退出脚本，以免中断后续流程，但需要手动检查
    fi
else
    echo "警告: 未找到 $NGINX_CONF_SRC，跳过 Nginx 更新" | tee -a "$LOGFILE"
fi

echo -e "\033[0;32m=== 部署完成 ===\033[0m" | tee -a "$LOGFILE"