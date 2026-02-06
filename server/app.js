﻿// [入口] 启动文件，配置中间件、静态资源、错误处理
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 路由
const authRoutes = require('./src/routes/authRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes'); // Inserted
app.use('/api/auth', authRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/upload', uploadRoutes); // Inserted

app.get('/', (req, res) => {
    res.send('EasyStay Backend is Running on Port 3000!');
});

// 测试数据库连接 (可选，暂时先不连，保证先跑起来)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});