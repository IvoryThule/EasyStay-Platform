const express = require('express');
const router = express.Router();
const amapService = require('../services/amapService');
const { success, fail } = require('../utils/response');

/**
 * 根据 IP 获取位置
 * GET /api/system/location
 * Query: ip (可选，不传则自动获取请求 IP)
 */
router.get('/location', async (req, res) => {
    try {
        // 获取 IP: 优先取 query, 其次 headers (反向代理), 最后 socket
        let ip = req.query.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        // 处理 ::ffff: 前缀
        if (ip && ip.includes('::ffff:')) {
            ip = ip.split('::ffff:')[1];
        }

        console.log('Client IP:', ip);
        
        const location = await amapService.getLocationByIP(ip);
        if (location) {
            success(res, location);
        } else {
            // 查不到或者未配置 Key，返回上海默认以防前端挂掉
            success(res, { province: '上海市', city: '上海市' }, 'Use default location');
        }
    } catch (error) {
        fail(res, error.message, 500);
    }
});

/**
 * 获取附近POI (景点/地铁/商场)
 * GET /api/system/nearby-poi
 * Query: longitude, latitude, types (可选), radius (可选)
 */
router.get('/nearby-poi', async (req, res) => {
    try {
        const { longitude, latitude, types, radius } = req.query;
        
        if (!longitude || !latitude) {
            return fail(res, 'longitude and latitude are required', 400);
        }

        const pois = await amapService.getNearbyPOI(
            longitude, 
            latitude, 
            types || '旅游景点|地铁站|购物中心',
            radius || 2000
        );
        
        success(res, { pois, count: pois.length });
    } catch (error) {
        fail(res, error.message, 500);
    }
});

/**
 * 获取城市酒店数量统计
 * GET /api/system/city-stats
 */
router.get('/city-stats', async (req, res) => {
    try {
        const { Hotel, sequelize } = require('../models');
        
        const cityStats = await Hotel.findAll({
            attributes: [
                'city',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: { status: 1 }, // 只统计已发布的酒店
            group: ['city'],
            order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
            raw: true
        });

        success(res, { cities: cityStats });
    } catch (error) {
        console.error('City stats error:', error);
        fail(res, error.message, 500);
    }
});

module.exports = router;
