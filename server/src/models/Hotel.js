// [表] 酒店基础信息 (含 tags JSON字段)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用于定位匹配'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '最低起步价'
  },
  star: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 }
  },
  tags: {
    type: DataTypes.JSON, // MySQL 支持 JSON 类型
    defaultValue: [],
    comment: '标签数组,支持: 1)普通标签字符串 2)EN:英文名 3)OPENING:开业日期 4)IMAGES:多图数组JSON 5)ROOMDATA:房型数据'
  },
  cover_image: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSON, 
    defaultValue: [],
    comment: '酒店多图, 存储图片URL数组'
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '0:审核中, 1:已发布, 2:驳回, 3:下线'
  },
  reject_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '驳回原因，仅status=2时有值'
  },
  latitude: {
    type: DataTypes.DOUBLE
  },
  longitude: {
    type: DataTypes.DOUBLE
  },
  // merchant_id 会通过关联自动生成
});

module.exports = Hotel;
