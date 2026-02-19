// [逻辑] 管理员功能 (审核、统计等)
const { Hotel, User, Order, RoomType } = require('../models');
const { success, fail } = require('../utils/response');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

/**
 * 审核酒店 (管理员)
 * POST /api/admin/hotel/audit
 * Body: { hotel_id, status, reject_reason }
 */
const auditHotel = async (req, res) => {
  try {
    const { hotel_id, status, reject_reason } = req.body;

    if (!hotel_id || status === undefined) {
      return fail(res, 'Missing required fields: hotel_id, status', 400);
    }

    // status: 1=通过发布, 2=驳回
    if (![1, 2].includes(parseInt(status))) {
      return fail(res, 'Invalid status. Use 1 (approve) or 2 (reject)', 400);
    }

    const hotel = await Hotel.findByPk(hotel_id);
    if (!hotel) {
      return fail(res, 'Hotel not found', 404);
    }

    // 如果是驳回，需要提供原因
    if (parseInt(status) === 2 && !reject_reason) {
      return fail(res, 'reject_reason is required when rejecting', 400);
    }

    // 更新酒店状态
    const updateData = { status: parseInt(status) };
    if (parseInt(status) === 2) {
      updateData.reject_reason = reject_reason;
    } else {
      // 通过时清空驳回原因
      updateData.reject_reason = null;
    }

    await hotel.update(updateData);

    const msg = parseInt(status) === 1 
      ? 'Hotel approved and published successfully' 
      : 'Hotel rejected';
    
    success(res, hotel, msg);
  } catch (error) {
    console.error('Audit Hotel Error:', error);
    fail(res, 'Failed to audit hotel', 500);
  }
};

/**
 * 获取待审核酒店列表
 * GET /api/admin/hotel/pending
 * Query: page, limit
 */
const getPendingHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Hotel.findAndCountAll({
      where: { status: 0 }, // 只查审核中的
      include: [
        { 
          model: User, 
          as: 'merchant',
          attributes: ['id', 'username'] 
        },
        {
          model: RoomType,
          as: 'roomTypes',
          attributes: ['id', 'name', 'price', 'stock']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'ASC']] // 最早提交的优先
    });

    success(res, {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      list: rows
    });
  } catch (error) {
    console.error('Get Pending Hotels Error:', error);
    fail(res, 'Failed to fetch pending hotels', 500);
  }
};

/**
 * 获取被驳回的酒店列表 (可选，管理员查看历史)
 * GET /api/admin/hotel/rejected
 */
const getRejectedHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Hotel.findAndCountAll({
      where: { status: 2 },
      include: [
        { 
          model: User, 
          as: 'merchant',
          attributes: ['id', 'username'] 
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['updatedAt', 'DESC']]
    });

    success(res, {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      list: rows
    });
  } catch (error) {
    console.error('Get Rejected Hotels Error:', error);
    fail(res, 'Failed to fetch rejected hotels', 500);
  }
};

/**
 * 平台数据统计 (管理员面板)
 * GET /api/admin/stats
 */
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalMerchants = await User.count({ where: { role: 'merchant' } });
    const totalHotels = await Hotel.count({ where: { status: 1 } }); // 已发布
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
 * 获取经营看板数据 (商户/管理员)
 * GET /api/admin/dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    // 构建查询条件
    let hotelWhere = {};
    if (userRole === 'merchant') {
      hotelWhere.merchant_id = userId;
    }

    // 1. 核心指标
    const totalOrders = await Order.count({
      include: [{
        model: Hotel,
        as: 'hotel',
        where: hotelWhere,
        attributes: []
      }]
    });

    const totalNights = totalOrders; // 简化:每单1晚

    // 销售额(含订单状态)
    const ordersWithPrice = await Order.findAll({
      include: [
        { model: Hotel, as: 'hotel', where: hotelWhere, attributes: [] },
        { model: RoomType, as: 'roomType', attributes: ['price'] }
      ],
      where: { status: { [Op.in]: [0, 1] } }
    });

    const totalRevenue = ordersWithPrice.reduce((sum, order) => {
      return sum + parseFloat(order.roomType?.price || 0);
    }, 0);

    // 酒店数量(按状态分组)
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
    hotelStatusDist.forEach(item => {
      hotelStats[statusMap[item.status]] = parseInt(item.count);
    });

    // 2. 近7天趋势(订单数、销售额、满意度模拟)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trendData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayOrders = await Order.count({
        include: [{ model: Hotel, as: 'hotel', where: hotelWhere, attributes: [] }],
        where: {
          createdAt: {
            [Op.gte]: new Date(dateStr + ' 00:00:00'),
            [Op.lt]: new Date(new Date(dateStr).getTime() + 86400000)
          }
        }
      });

      const dayRevenue = await Order.sum('roomType.price', {
        include: [
          { model: Hotel, as: 'hotel', where: hotelWhere, attributes: [] },
          { model: RoomType, as: 'roomType', attributes: [] }
        ],
        where: {
          createdAt: {
            [Op.gte]: new Date(dateStr + ' 00:00:00'),
            [Op.lt]: new Date(new Date(dateStr).getTime() + 86400000)
          }
        }
      }) || 0;

      trendData.push({
        date: `${date.getMonth() + 1}-${date.getDate()}`,
        orders: dayOrders,
        revenue: parseFloat(dayRevenue).toFixed(2),
        satisfaction: 85 + Math.floor(Math.random() * 10)
      });
    }

    // 3. 渠道分布(模拟)
    const channelDist = [
      { name: '易宿直营', value: Math.floor(totalOrders * 0.4) },
      { name: '携程分销', value: Math.floor(totalOrders * 0.3) },
      { name: '美团直连', value: Math.floor(totalOrders * 0.2) },
      { name: '飞猪合作', value: Math.floor(totalOrders * 0.1) }
    ];

    // 4. 订单状态分布
    const orderStatusDist = await Order.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'count']
      ],
      include: [{ model: Hotel, as: 'hotel', where: hotelWhere, attributes: [] }],
      group: ['status'],
      raw: true
    });

    success(res, {
      overview: {
        totalOrders,
        totalNights,
        totalRevenue: totalRevenue.toFixed(2),
        avgConversionRate: totalOrders > 0 ? ((totalOrders / (totalOrders * 1.2)) * 100).toFixed(1) + '%' : '0%'
      },
      hotelStats,
      trend: trendData,
      channelDist,
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
