﻿// [入口] 启动文件，配置中间件、静态资源、错误处理
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// 配置 CORS
app.use(cors({
    origin: '*', // 允许所有来源（移动端/H5/Web）
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // 允许常见的请求头
}));
// 处理 OPTIONS 预检请求
app.options('*', cors());

app.use(express.json());

// 路由
const authRoutes = require('./src/routes/authRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const systemRoutes = require('./src/routes/systemRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const path = require('path');

app.use('/api/auth', authRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload', uploadRoutes); // 图片上传
app.use('/api/system', systemRoutes); // IP定位
app.use('/api/ai', aiRoutes);         // GLM AI服务
app.use('/api/order', orderRoutes);   // 订单服务
app.use('/api/admin', adminRoutes);   // 管理员服务

app.get('/', (req, res) => {
    res.send('EasyStay Backend is Running on Port 3000!');
});

// 测试数据库连接 (可选，暂时先不连，保证先跑起来)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// Extend timeout for long-running LLM tasks especially for GLM
server.setTimeout(300000); // 5 minutes (300000 ms)