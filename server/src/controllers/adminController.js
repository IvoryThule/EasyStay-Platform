// [逻辑] 管理员功能 (审核、统计等)
const { Hotel, User, Order, RoomType } = require('../models');
const { success, fail } = require('../utils/response');

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

module.exports = {
  auditHotel,
  getPendingHotels,
  getRejectedHotels,
  getStats
};
