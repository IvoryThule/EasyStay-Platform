const axios = require('axios');
const { success, fail } = require('../utils/response');

const AMAP_KEY = process.env.AMAP_WEB_KEY;

/**
 * 根据 IP 获取地理位置 (高德 Web 服务 API)
 * 文档: https://lbs.amap.com/api/webservice/guide/api/ipconfig
 */
const getLocationByIP = async (ip) => {
    if (!AMAP_KEY) {
        console.warn('⚠️ Amap Web Key not configured');
        return null;
    }

    try {
        console.log(`📍 正在进行 IP 定位查询, IP: ${ip}`);

        // 开发环境 localhost 往往是 127.0.0.1 或 ::1，高德查不到
        // 这里如果是本地 IP，返回默认城市(上海)用于测试
        if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
            console.log(`ℹ️ 检测到本地开发环境 IP (${ip})，使用默认城市(上海)`);
            return {
                province: '上海市',
                city: '上海市',
                adcode: '310000',
                rectangle: '121.3,31.1;121.6,31.3'
            };
        }

        const url = `https://restapi.amap.com/v3/ip?key=${AMAP_KEY}&ip=${ip}`;
        const response = await axios.get(url);
        
        if (response.data.status === '1') {
            const result = {
                province: response.data.province,
                city: response.data.city,
                adcode: response.data.adcode,
                rectangle: response.data.rectangle
            };
            console.log('✅ 高德定位成功:', JSON.stringify(result));
            return result;
        } else {
            console.error('❌ 高德 API 错误:', response.data.info);
            return null;
        }
    } catch (error) {
        console.error('Amap Service Error:', error.message);
        return null;
    }
};

/**
 * 根据经纬度获取周边 POI (景点/交通/商场)
 * 文档: https://lbs.amap.com/api/webservice/guide/api/search
 */
const getNearbyPOI = async (longitude, latitude, types = '旅游景点|地铁站|购物中心', radius = 2000) => {
    if (!AMAP_KEY) {
        console.warn('⚠️ Amap Web Key not configured');
        return [];
    }

    try {
        const url = `https://restapi.amap.com/v3/place/around?key=${AMAP_KEY}&location=${longitude},${latitude}&types=${types}&radius=${radius}&offset=10&extensions=base`;
        const response = await axios.get(url);
        
        if (response.data.status === '1' && response.data.pois) {
            return response.data.pois.map(poi => ({
                name: poi.name,
                type: poi.type,
                address: poi.address,
                distance: poi.distance,
                location: poi.location
            }));
        }
        return [];
    } catch (error) {
        console.error('Amap POI Service Error:', error.message);
        return [];
    }
};

module.exports = {
    getLocationByIP,
    getNearbyPOI
};
