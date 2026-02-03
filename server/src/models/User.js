// [表] 用户/商户/管理员
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 核心字段：既可以是手机号，也可以是邮箱，也可以是普通用户名
  // 前端正则校验格式，后端只管存字符串
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    comment: '登录账号(手机号/邮箱)'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '加密存储的密码'
  },
  role: {
    type: DataTypes.ENUM('user', 'merchant', 'admin'),
    defaultValue: 'user',
    allowNull: false,
    comment: '用户角色'
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    comment: '用户头像'
  }
});

module.exports = User;