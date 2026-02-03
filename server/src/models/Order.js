// [表] 订单 (关联 User, Hotel, RoomType)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  check_in: {
    type: DataTypes.DATEONLY, // 只存日期 YYYY-MM-DD
    allowNull: false
  },
  check_out: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '0:待支付, 1:已预订, 2:已取消'
  }
  // user_id, hotel_id, room_type_id 会通过关联自动生成
});

module.exports = Order;
