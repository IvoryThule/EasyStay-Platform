﻿// [逻辑] 酒店筛选、录入、审核逻辑
const { Op } = require('sequelize');
const { Hotel, RoomType, User } = require('../models');
const { success, fail } = require('../utils/response');

/**
 * 创建酒店 (商户功能)
 * POST /api/hotel/create
 */
const create = async (req, res) => {
  try {
    // 从请求体中解构酒店字段
    const { 
        name, address, city, price, star, 
        tags, cover_image, images, latitude, longitude 
    } = req.body;
    // 当前登录商户 ID（来自鉴权中间件）
    const merchant_id = req.user.id;

    // 基础参数校验（兜底）
    if (!name || !address || !city || !price) {
      return fail(res, 'Missing required fields: name, address, city, price', 400);
    }

    // 创建酒店记录(状态默认为 0：审核中)
    const hotel = await Hotel.create({
      name,
      address,
      city,
      price,
      star,
      tags: tags || [], // 防止 null
      cover_image,
      images: images || [], // 防止 null
      latitude,
      longitude,
      status: 0, // 默认为审核中
      merchant_id  
    }, {
      include: [RoomType] // 声明包含关联模型一起创建
    });

    success(res, hotel, 'Hotel created successfully, awaiting audit.');
  } catch (error) {
    console.error('Create Hotel Error:', error);
    fail(res, 'Failed to create hotel', 500);
  }
};

/**
 * 酒店列表 (用户/商户/管理员通用)
 * GET /api/hotel/list
 * Query: page, limit, city, keyword, star, min_price, max_price, sort (price_asc/desc)
 * 特殊: admin 可以看所有状态，merchant 只能看自己的，user 只能看 status=1
 */
const list = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      city, 
      keyword, 
      star, 
      min_price, 
      max_price, 
      sort,
      status, // 仅 admin 可传
      my_hotel // 仅商户可传 'true'
    } = req.query;

    // 分页计算
    const offset = (page - 1) * limit;
    
    // Sequelize 查询条件容器
    const where = {};

    // 1. 权限过滤
    const userRole = req.user ? req.user.role : 'guest';
    
    if (userRole === 'admin') {
      if (status !== undefined) where.status = status;
      // 管理员默认看所有，或者按 status 筛选
    } else if (userRole === 'merchant' && my_hotel === 'true') {
      where.merchant_id = req.user.id;
      // 商户看自己的，不限制 status
    } else {
      // 普通用户 或 未登录 或 商户看公开池：只看 status = 1 (已发布)
      where.status = 1;
    }

    // 2. 业务筛选
    if (city) where.city = city;
    if (star) where.star = star;
    
    // 价格区间
    if (min_price || max_price) {
      where.price = {};
      if (min_price) where.price[Op.gte] = min_price;
      if (max_price) where.price[Op.lte] = max_price;
    }

    // 关键词搜索 (name 或 address)
    if (keyword) {
      where[Op.or] = [
        { name: { [Op.like]: `%${keyword}%` } },
        { address: { [Op.like]: `%${keyword}%` } }
      ];
    }

    // 3. 排序
    let order = [['createdAt', 'DESC']]; // 默认最新
    if (sort === 'price_asc') order = [['price', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];

    const { count, rows } = await Hotel.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order,
      attributes: { exclude: ['merchant_id'] } // C端列表一般不需要知道 merchant_id
    });

    success(res, {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      list: rows
    });

  } catch (error) {
    console.error('List Hotel Error:', error);
    fail(res, 'Failed to fetch hotel list', 500);
  }
};

/**
 * 酒店详情 (含房型)
 * GET /api/hotel/detail/:id
 */
const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const hotel = await Hotel.findOne({
      where: { id },
      include: [
        { 
          model: RoomType, 
          as: 'roomTypes', // 需在 models/index.js 确保 alias 一致
          attributes: ['id', 'name', 'price', 'stock', 'image']
        }
      ]
    });

    if (!hotel) {
      return fail(res, 'Hotel not found', 404);
    }

    // 状态检查: 仅 admin/merchant(owner) 可看非发布状态
    // 这里简单处理：如果不是已发布，且当前未登录或不是管理员/本人，则拒绝
    // 为了简化，若未登录且 status!=1 则 404
    // 实际生产中可以更严谨
    const userRole = req.user ? req.user.role : 'guest';
    const isOwner = req.user && req.user.id === hotel.merchant_id;
    
    if (hotel.status !== 1 && userRole !== 'admin' && !isOwner) {
       return fail(res, 'Hotel is under review or offline', 403);
    }

    success(res, hotel);
  } catch (error) {
    console.error('Get Hotel Detail Error:', error);
    fail(res, 'Failed to fetch hotel detail', 500);
  }
};

/**
 * 更新酒店 (商户/管理员)
 * POST /api/hotel/update
 * Body: id, ...fields
 */
const update = async (req, res) => {
  try {
    const { id, ...updateFields } = req.body;
    
    if (!id) return fail(res, 'Hotel ID is required', 400);

    const hotel = await Hotel.findByPk(id);
    if (!hotel) return fail(res, 'Hotel not found', 404);

    // 权限检查
    const isOwner = req.user.id === hotel.merchant_id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return fail(res, 'Forbidden: You do not own this hotel', 403);
    }

    // 商户修改后，状态重置为 0 (审核中)
    if (isOwner && !isAdmin) {
      updateFields.status = 0;
    }
    // 管理员可以直接修改 status (在 audit 接口，或这里)

    // 禁止修改的字段
    delete updateFields.merchant_id;
    delete updateFields.id;

    await hotel.update(updateFields);
    
    success(res, hotel, 'Hotel updated successfully');
  } catch (error) {
    console.error('Update Hotel Error:', error);
    fail(res, 'Failed to update hotel', 500);
  }
};

/**
 * 软删除酒店 (商户/管理员)
 * POST /api/hotel/delete
 * Body: { id: 1 }
 */
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return fail(res, 'Hotel ID is required', 400);

    const hotel = await Hotel.findByPk(id);
    if (!hotel) return fail(res, 'Hotel not found', 404);

    const isOwner = req.user.id === hotel.merchant_id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return fail(res, 'Forbidden', 403);
    }

    // 软删除：设置 status = 3 (下线/回收站)
    await hotel.update({ status: 3 });

    success(res, null, 'Hotel deleted (offline) successfully');
  } catch (error) {
    console.error('Delete Hotel Error:', error);
    fail(res, 'Failed to delete hotel', 500);
  }
};

/**
 * 恢复酒店 (管理员)
 * POST /api/hotel/restore
 * Body: { id: 1 }
 */
const restoreHotel = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return fail(res, 'Hotel ID is required', 400);

    const hotel = await Hotel.findByPk(id);
    if (!hotel) return fail(res, 'Hotel not found', 404);

    // 恢复：设置 status = 1 (已发布)
    await hotel.update({ status: 1 });

    success(res, hotel, 'Hotel restored successfully');
  } catch (error) {
    console.error('Restore Hotel Error:', error);
    fail(res, 'Failed to restore hotel', 500);
  }
};

// ================= 房型管理 (RoomType) =================

/**
<<<<<<< HEAD
=======
 * 获取指定酒店的房型列表
 * GET /api/hotel/roomtype/list
 * Query: hotel_id
 */
const getRoomTypeList = async (req, res) => {
  try {
    const { hotel_id } = req.query;

    if (!hotel_id) {
      return fail(res, 'hotel_id is required', 400);
    }

    const roomTypes = await RoomType.findAll({
      where: { hotel_id },
      order: [['price', 'ASC']] // 按价格升序
    });

    success(res, roomTypes);
  } catch (error) {
    console.error('Get RoomType List Error:', error);
    fail(res, 'Failed to fetch room types', 500);
  }
};

/**
 * 获取房型详情
 * GET /api/hotel/roomtype/detail/:id
 */
const getRoomTypeDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const roomType = await RoomType.findByPk(id, {
      include: [
        {
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name', 'address', 'city']
        }
      ]
    });

    if (!roomType) {
      return fail(res, 'RoomType not found', 404);
    }

    success(res, roomType);
  } catch (error) {
    console.error('Get RoomType Detail Error:', error);
    fail(res, 'Failed to fetch room type detail', 500);
  }
};

/**

 * 添加房型
 * POST /api/hotel/roomtype/add
 * Body: { hotel_id, name, price, stock }
 */
const addRoomType = async (req, res) => {
  try {
    const { hotel_id, name, price, stock } = req.body;

    if (!hotel_id || !name || !price) {
      return fail(res, 'Missing required fields', 400);
    }

    // 检查是否有权给该酒店加房型
    const hotel = await Hotel.findByPk(hotel_id);
    if (!hotel) return fail(res, 'Hotel not found', 404);

    const isOwner = req.user.id === hotel.merchant_id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return fail(res, 'Forbidden', 403);

    const roomType = await RoomType.create({
      hotel_id, name, price, stock: stock || 0
    });

    success(res, roomType, 'Room type added successfully');
  } catch (error) {
    console.error('Add RoomType Error:', error);
    fail(res, 'Failed to add room type', 500);
  }
};

/**
 * 更新房型
 * POST /api/hotel/roomtype/update
 * Body: { id, name, price, stock }
 */
const updateRoomType = async (req, res) => {
  try {
    const { id, ...updateFields } = req.body;
    if (!id) return fail(res, 'RoomType ID is required', 400);

    const roomType = await RoomType.findByPk(id);
    if (!roomType) return fail(res, 'RoomType not found', 404);

    // 权限检查：查所属酒店
    const hotel = await Hotel.findByPk(roomType.hotel_id);
    if (!hotel) return fail(res, 'Associated Hotel not found', 404);

    const isOwner = req.user.id === hotel.merchant_id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return fail(res, 'Forbidden', 403);

    delete updateFields.hotel_id; // 禁止改归属酒店
    delete updateFields.id;

    await roomType.update(updateFields);

    success(res, roomType, 'Room type updated successfully');
  } catch (error) {
    console.error('Update RoomType Error:', error);
    fail(res, 'Failed to update room type', 500);
  }
};

/**
 * 删除房型
 * POST /api/hotel/roomtype/delete
 * Body: { id }
 */
const deleteRoomType = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return fail(res, 'RoomType ID is required', 400);

    const roomType = await RoomType.findByPk(id);
    if (!roomType) return fail(res, 'RoomType not found', 404);

    const hotel = await Hotel.findByPk(roomType.hotel_id);
    const isOwner = req.user.id === hotel.merchant_id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return fail(res, 'Forbidden', 403);

    await roomType.destroy(); // 硬删除

    success(res, null, 'Room type deleted successfully');
  } catch (error) {
    console.error('Delete RoomType Error:', error);
    fail(res, 'Failed to delete room type', 500);
  }
};

module.exports = {
  create,
  list,
  getDetail,
  update,
  deleteHotel,
  restoreHotel,

  getRoomTypeList,
  getRoomTypeDetail,
  addRoomType,
  updateRoomType,
  deleteRoomType
};


