// [入口] 初始化 DB，定义模型关联 (hasMany, belongsTo)
const sequelize = require('../config/database');
const User = require('./User');
const Hotel = require('./Hotel');
const RoomType = require('./RoomType');
const Order = require('./Order');

// === 关联关系定义 ===

// 1. 商户 -> 酒店
User.hasMany(Hotel, { foreignKey: 'merchant_id' });
Hotel.belongsTo(User, { foreignKey: 'merchant_id' });

// 2. 酒店 -> 房型
Hotel.hasMany(RoomType, { foreignKey: 'hotel_id', as: 'roomTypes' });
RoomType.belongsTo(Hotel, { foreignKey: 'hotel_id' });

// 3. 订单关联
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Hotel.hasMany(Order, { foreignKey: 'hotel_id' });
Order.belongsTo(Hotel, { foreignKey: 'hotel_id' });

RoomType.hasMany(Order, { foreignKey: 'room_type_id' });
Order.belongsTo(RoomType, { foreignKey: 'room_type_id' });

module.exports = {
  sequelize, // 导出实例用于 sync
  User,
  Hotel,
  RoomType,
  Order
};
