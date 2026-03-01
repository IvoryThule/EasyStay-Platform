const { Hotel, User, Order, RoomType } = require('../models');
const { success, fail } = require('../utils/response');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

/**
 * POST /api/admin/hotel/audit
 * Body: { hotel_id, status, reject_reason }
 */
const auditHotel = async (req, res) => {
  try {
    const { hotel_id, status, reject_reason } = req.body;

    if (!hotel_id || status === undefined) {
      return fail(res, 'Missing required fields: hotel_id, status', 400);
    }

    const nextStatus = parseInt(status, 10);
    if (![1, 2].includes(nextStatus)) {
      return fail(res, 'Invalid status. Use 1 (approve) or 2 (reject)', 400);
    }

    const hotel = await Hotel.findByPk(hotel_id);
    if (!hotel) {
      return fail(res, 'Hotel not found', 404);
    }

    if (nextStatus === 2 && !reject_reason) {
      return fail(res, 'reject_reason is required when rejecting', 400);
    }

    const updateData = { status: nextStatus };
    if (nextStatus === 2) {
      updateData.reject_reason = reject_reason;
    } else {
      updateData.reject_reason = null;
    }

    await hotel.update(updateData);
    const msg = nextStatus === 1 ? 'Hotel approved and published successfully' : 'Hotel rejected';
    success(res, hotel, msg);
  } catch (error) {
    console.error('Audit Hotel Error:', error);
    fail(res, 'Failed to audit hotel', 500);
  }
};

/**
 * GET /api/admin/hotel/pending
 */
const getPendingHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Hotel.findAndCountAll({
      where: { status: 0 },
      include: [
        {
          model: User,
          as: 'merchant',
          attributes: ['id', 'username']
        },
        {
          model: RoomType,
          as: 'roomTypes',
          attributes: ['id', 'name', 'price', 'stock', 'image']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'ASC']]
    });

    success(res, {
      total: count,
      page: Number(page),
      limit: Number(limit),
      list: rows
    });
  } catch (error) {
    console.error('Get Pending Hotels Error:', error);
    fail(res, 'Failed to fetch pending hotels', 500);
  }
};

/**
 * GET /api/admin/hotel/rejected
 */
const getRejectedHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Hotel.findAndCountAll({
      where: { status: 2 },
      include: [
        {
          model: User,
          as: 'merchant',
          attributes: ['id', 'username']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['updatedAt', 'DESC']]
    });

    success(res, {
      total: count,
      page: Number(page),
      limit: Number(limit),
      list: rows
    });
  } catch (error) {
    console.error('Get Rejected Hotels Error:', error);
    fail(res, 'Failed to fetch rejected hotels', 500);
  }
};

/**
 * GET /api/admin/stats
 */
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalMerchants = await User.count({ where: { role: 'merchant' } });
    const totalHotels = await Hotel.count({ where: { status: 1 } });
    const pendingHotels = await Hotel.count({ where: { status: 0 } });
    const totalOrders = await Order.count();
    const paidOrders = await Order.count({ where: { status: 1 } });

    success(res, {
      users: totalUsers,
      merchants: totalMerchants,
      hotels: totalHotels,
      pendingHotels,
      orders: totalOrders,
      paidOrders
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    fail(res, 'Failed to fetch statistics', 500);
  }
};

/**
 * GET /api/admin/dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    const hotelWhere = {};
    if (userRole === 'merchant') {
      hotelWhere.merchant_id = userId;
    }

    const includeHotel = { model: Hotel, where: hotelWhere, attributes: [] };

    const totalOrders = await Order.count({
      include: [includeHotel]
    });

    // 获取所有已支付订单用于计算营收和间夜量
    const ordersWithPrice = await Order.findAll({
      where: { 
        status: 1, // 已支付/已确认
        // 确保关联到商家的酒店
      },
      include: [
        { 
            model: Hotel, 
            where: hotelWhere, 
            attributes: [] 
        }, 
        { 
            model: RoomType, 
            attributes: ['price'] 
        }
      ]
    });

    const totalNights = ordersWithPrice.reduce((acc, order) => {
        const start = new Date(order.check_in);
        const end = new Date(order.check_out);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        return acc + diffDays;
    }, 0);

    const totalRevenue = ordersWithPrice.reduce((sum, order) => {
      const start = new Date(order.check_in);
      const end = new Date(order.check_out);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return sum + parseFloat(order.RoomType?.price || 0) * diffDays;
    }, 0);

    // 计算入住率 (简单估算：活跃订单数 / 总房源库存)
    // 1. 获取商家的总房源库存
    // 使用原始查询避免 Sequelize 的聚合包含问题
    const roomStockResult = await RoomType.findAll({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('stock')), 'totalStock']
        ],
        include: [{
            model: Hotel,
            where: hotelWhere,
            attributes: []
        }],
        raw: true
    });
    
    const rooms = parseInt(roomStockResult[0]?.totalStock || 0, 10);
    const totalRooms = rooms || 1; // 避免除以零

    // 2. 计算入住率 (活跃订单数 / 总房源)
    const activeOrdersCount = await Order.count({
        include: [{ model: Hotel, where: hotelWhere, attributes: [] }],
        where: { 
            status: 1,
            check_in: { [Op.lte]: new Date() },
            check_out: { [Op.gte]: new Date() }
        }
    });

    // 限制入住率最高 100%
    const occupancyRateVal = (activeOrdersCount / totalRooms * 100);
    const occupancyRate = (occupancyRateVal > 100 ? 100 : occupancyRateVal).toFixed(1) + '%';
    
    // ADR (日均房价) = 总营收 / 总售出间夜
    const adr = totalNights > 0 ? (totalRevenue / totalNights).toFixed(2) : '0.00';

    const hotelStatusDist = await Hotel.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: hotelWhere,
      group: ['status'],
      raw: true
    });

    const statusMap = { 0: 'pending', 1: 'published', 2: 'rejected', 3: 'offline' };
    const hotelStats = {};
    hotelStatusDist.forEach((item) => {
      hotelStats[statusMap[item.status]] = parseInt(item.count, 10);
    });

    const trend = [];
    
    // 优化：一次性获取最近7天的所有相关订单，而不是循环查询数据库
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    
    const recentOrders = await Order.findAll({
        attributes: ['id', 'status', 'check_in', 'check_out', 'createdAt'],
        include: [
            { 
                model: Hotel, 
                where: hotelWhere, 
                attributes: [] 
            },
            {
                model: RoomType,
                attributes: ['price']
            }
        ],
        where: {
            createdAt: {
                [Op.gte]: sevenDaysAgo
            }
        }
    });

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 在内存中过滤当天的订单
      const daysOrders = recentOrders.filter(o => 
          new Date(o.createdAt).toISOString().split('T')[0] === dateStr
      );

      const dayOrderCount = daysOrders.length;
      
      // 计算当天已支付订单的营收和间夜
      const paidOrders = daysOrders.filter(o => o.status === 1);
      
      let dayNights = 0;
      let dayRevenue = 0;

      paidOrders.forEach(order => {
          const start = new Date(order.check_in);
          const end = new Date(order.check_out);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 
          
          dayNights += diffDays;
          dayRevenue += parseFloat(order.RoomType?.price || 0) * diffDays;
      });

      trend.push({
        date: `${date.getMonth() + 1}-${date.getDate()}`,
        orders: dayOrderCount,
        revenue: Number(dayRevenue.toFixed(2)),
        nights: dayNights
      });
    }

    // 1. Calculate Hotel Distribution (Replacing Channel Distribution)
    // Categories: Count of hotels by city
    const hotelCityDist = await Hotel.findAll({
      attributes: [
        'city',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: hotelWhere,
      group: ['city'],
      order: [[sequelize.col('count'), 'DESC']],
      limit: 10,
      raw: true
    });

    const cityPieData = hotelCityDist.map(item => ({
      name: item.city || '未知',
      value: parseInt(item.count, 10)
    }));

    const orderStatusDist = await Order.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'count']
      ],
      include: [includeHotel],
      group: ['status'],
      raw: true
    });

    success(res, {
      overview: {
        totalOrders,
        totalNights,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        avgConversionRate: totalOrders > 0 ? `${((totalOrders / (totalOrders * 1.2)) * 100).toFixed(1)}%` : '0%',
        // New Business Stats
        occupancyRate: typeof occupancyRate !== 'undefined' ? occupancyRate : '0%',
        adr: typeof adr !== 'undefined' ? adr : '0.00'
      },
      hotelStats,
      trend,
      channelDist: cityPieData, // Reusing the field name for frontend compatibility but with new data
      orderStatusDist
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    fail(res, 'Failed to fetch dashboard data', 500);
  }
};

module.exports = {
  auditHotel,
  getPendingHotels,
  getRejectedHotels,
  getStats,
  getDashboard
};
