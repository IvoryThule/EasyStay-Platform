// [配置] Sequelize 连接 MySQL 的实例配置
const { Sequelize } = require('sequelize');
// 引入 dotenv 以读取根目录下的 .env 文件变量
require('dotenv').config();

// 从环境变量获取配置，如果没读取到则使用默认值
const DB_NAME = process.env.DB_NAME || 'easystay';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3307;

if (!DB_PASS) {
  console.error('❌ 错误: 未找到数据库密码，请检查 .env 文件中的 DB_PASSWORD 字段！');
  process.exit(1); // 密码没填直接报错退出，防止连半天连不上
}

// 初始化 Sequelize 实例
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql', // 指定数据库类型
  
  // 设置时区为东八区(北京时间)
  timezone: '+08:00',
  
  // logging: true 会在控制台打印每一条执行的 SQL 语句，开发调试时很有用
  // 生产环境设为 false 以减少日志噪音
  logging: console.log, 

  // 连接池配置
  pool: {
    max: 5,     // 连接池中最大连接数量
    min: 0,     // 连接池中最小连接数量
    acquire: 30000, // 在抛出错误前，尝试获取连接的毫秒数
    idle: 10000     // 如果一个连接池 10秒 没被使用，则释放
  }
});

// 测试连接 (可选，仅用于启动时确认连接成功)

sequelize.authenticate()
  .then(() => {
    console.log('✅ 数据库连接成功！');
  })
  .catch(err => {
    console.error('❌ 数据库连接失败:', err);
  });


module.exports = sequelize;
