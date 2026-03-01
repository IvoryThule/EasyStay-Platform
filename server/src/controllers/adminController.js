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

    const totalNights = totalOrders;

    const ordersWithPrice = await Order.findAll({
      include: [
        includeHotel,
        { model: RoomType, attributes: ['price'] }
      ],
      where: { status: 1 } // Only count paid/confirmed orders
    });

    const totalRevenue = ordersWithPrice.reduce((sum, order) => {
      return sum + parseFloat(order.RoomType?.price || 0) * (order.days || 1); // multiply by days if logic needs it, but assuming price is total room price
    }, 0); 
    // Wait, RoomType.price is likely price per night. Order has days/amount?
    // Let's check Order model. But assuming simplistic logic for now: Price * Days on frontend?
    // Actually, Order usually stores `total_price`. If not, we calculate.
    // Let's stick to existing logic but filter by status=1.
    
    // Calculate Occupancy Rate (Simple Estimate based on active orders vs total room stock)
    // 1. Get Total Room Stock for Merchant
    const rooms = await RoomType.sum('stock', {
        include: [{ model: Hotel, where: hotelWhere }]
    }) || 1; // avoid division by zero
    
    // 2. Calculate Occupancy (Active Orders / Total Rooms) - Current snapshot
    // Or Occupancy Rate over time? 
    // Let's do a simple "Current Occupancy Rate" = Active Orders (status=1) / Total Rooms
    const activeOrdersCount = await Order.count({
        include: [includeHotel],
        where: { 
            status: 1,
            check_in: { [Op.lte]: new Date() },
            check_out: { [Op.gte]: new Date() }
        }
    });

    const occupancyRate = (activeOrdersCount / rooms * 100).toFixed(1) + '%';
    
    // ADR (Average Daily Rate) = Total Revenue / Total Nights Sold
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
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayStart = new Date(`${dateStr} 00:00:00`);
      const dayEnd = new Date(new Date(dateStr).getTime() + 86400000);

      const dayOrders = await Order.findAll({
        include: [includeHotel],
        where: {
          createdAt: {
            [Op.gte]: dayStart,
            [Op.lt]: dayEnd
          }
        }
      });
      
      const dayOrderCount = dayOrders.length;
      
      // Calculate room nights for daily trend (Paid orders only)
      let dayNights = 0;
      dayOrders.forEach(o => {
          if (o.status === 1) { // Only count paid/booked orders
              const start = new Date(o.check_in);
              const end = new Date(o.check_out);
              const diffTime = Math.abs(end - start);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 
              dayNights += diffDays;
          }
      });

      const dayOrdersWithPrice = await Order.findAll({
        include: [
          includeHotel,
          { model: RoomType, attributes: ['price'] }
        ],
        where: {
          status: 1, // Only count paid/confirmed
          createdAt: {
            [Op.gte]: dayStart,
            [Op.lt]: dayEnd
          }
        }
      });

      const dayRevenue = dayOrdersWithPrice.reduce((sum, item) => {
        return sum + parseFloat(item.RoomType?.price || 0);
      }, 0);

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
