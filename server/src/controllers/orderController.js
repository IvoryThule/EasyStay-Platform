const { Order, Hotel, RoomType } = require('../models');
const { success, fail } = require('../utils/response');

/**
 * 创建订单 (Create Order)
 * POST /api/order/create
 */
const createOrder = async (req, res) => {
  try {
    const { hotel_id, room_type_id, check_in, check_out } = req.body;
    const user_id = req.user.id;

    // 1. 基础校验
    if (!hotel_id || !room_type_id || !check_in || !check_out) {
      return fail(res, '缺少必要字段', 400);
    }
    
    // 2. 校验房型是否存在、有无库存
    const roomType = await RoomType.findOne({ where: { id: room_type_id, hotel_id } });
    if (!roomType) {
      return fail(res, '房型不存在', 404);
    }
    if (roomType.stock <= 0) {
      return fail(res, '房型无库存', 400);
    }

    // 3. 创建订单 (初始状态 status: 0 待支付)
    // 真实业务中还要校验 check_in < check_out 等日期逻辑
    const order = await Order.create({
      user_id,
      hotel_id,
      room_type_id,
      check_in,
      check_out,
      status: 0 // 待支付
    });

    // 4. (可选) 扣减库存
    // 简单做法：下单就减库存。严谨逻辑：支付成功才减，或预占库存。
    await roomType.decrement('stock'); 

    success(res, { orderId: order.id }, '订单创建成功');
  } catch (error) {
    console.error('创建订单错误:', error);
    fail(res, '创建订单失败', 500);
  }
};

/**
 * 获取我的订单列表
 * GET /api/order/list
 * Query: status (0,1,2)
 */
const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status } = req.query;

    const where = { user_id };
    if (status !== undefined) {
      where.status = status;
    }

    const orders = await Order.findAll({
      where,
      order: [['createdAt', 'DESC']], // 按时间倒序
      include: [
        { 
          model: Hotel, 
          attributes: ['name', 'cover_image'] // 订单列表只展示酒店名和图
        },
        {
          model: RoomType,
          attributes: ['name', 'price']
        }
      ]
    });

    success(res, orders);
  } catch (error) {
    console.error('获取订单列表错误:', error);
    fail(res, '获取订单失败', 500);
  }
};

/**
 * 获取订单详情
 * GET /api/order/detail/:orderId
 */
const getOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const user_id = req.user.id;

    const order = await Order.findOne({
      where: { id: orderId, user_id },
      include: [
        { 
          model: Hotel, 
          attributes: ['id', 'name', 'address', 'city', 'cover_image', 'star']
        },
        {
          model: RoomType,
          attributes: ['id', 'name', 'price']
        }
      ]
    });

    if (!order) {
      return fail(res, '订单不存在', 404);
    }

    success(res, order);
  } catch (error) {
    console.error('获取订单详情错误:', error);
    fail(res, '获取订单详情失败', 500);
  }
};

/**
 * 取消订单
 * POST /api/order/cancel
 * Body: { orderId }
 */
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const user_id = req.user.id; // 只能取消自己的

    const order = await Order.findOne({ where: { id: orderId, user_id } });
    if (!order) return fail(res, '订单不存在', 404);

    if (order.status !== 0) {
      return fail(res, '只有待支付的订单才能取消', 400);
    }

    // 更新状态为 2 (已取消)
    await order.update({ status: 2 });
    
    // (可选) 恢复库存
    const roomType = await RoomType.findByPk(order.room_type_id);
    if(roomType) {
        await roomType.increment('stock');
    }

    success(res, null, '订单已取消');
  } catch (error) {
    console.error('取消订单错误:', error);
    fail(res, '取消订单失败', 500);
  }
};

/**
 * 模拟支付 (改为已预订状态)
 * POST /api/order/pay
 * Body: { orderId }
 */
const payOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const user_id = req.user.id;

    const order = await Order.findOne({ where: { id: orderId, user_id } });
    if (!order) return fail(res, '订单不存在', 404);

    if (order.status !== 0) {
      return fail(res, '订单不是待支付状态', 400);
    }

    // 支付成功，状态变 1
    await order.update({ status: 1 });

    success(res, null, '支付成功');
  } catch (error) {
    console.error('支付订单错误:', error);
    fail(res, '支付订单失败', 500);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderDetail,
  cancelOrder,
  payOrder
};
