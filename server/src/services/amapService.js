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
        // 修改：在服务器部署环境下，暂时移除对 10.x和192.168.x 的强制拦截，尝试请求高德接口
        if (ip === '127.0.0.1' || ip === '::1') {
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

/**
 * 根据地址解析经纬度
 * 文档: https://lbs.amap.com/api/webservice/guide/api/georegeo
 */
const getLocationByAddress = async (address, city = '') => {
    // 允许通过 address 传参，若无 key 则直接返回 null
    if (!AMAP_KEY) {
        return null; // Don't throw if no key, just return null as existing pattern
    }
    if (!address) {
        return null;
    }

    try {
        const encodedAddress = encodeURIComponent(address);
        const encodedCity = encodeURIComponent(city || '');
        const url = `https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&address=${encodedAddress}&city=${encodedCity}`;
        const response = await axios.get(url);

        if (response.data.status === '1' && Array.isArray(response.data.geocodes) && response.data.geocodes.length > 0) {
            const geocode = response.data.geocodes[0];
            const location = geocode.location || '';
            const [longitude, latitude] = location.split(',');
            
            // 返回更多详细信息给工具
            return {
                longitude: Number(longitude),
                latitude: Number(latitude),
                rawLocation: location,
                adcode: geocode.adcode,
                citycode: geocode.citycode,
                province: geocode.province,
                city: geocode.city
            };
        }
        return null;
    } catch (error) {
        console.error('Amap Geocode Service Error:', error.message);
        return null;
    }
};

/**
 * 关键字搜索 POI (attractionfinder / restaurantfinder)
 * 文档: https://lbs.amap.com/api/webservice/guide/api/newpoisearch
 */
const searchPOI = async (keywords, city, types, offset = 10) => {
    if (!AMAP_KEY) return [];

    try {
        const params = {
            key: AMAP_KEY,
            keywords: keywords,
            city: city,
            types: types,
            city_limit: !!city ? true : false,
            offset: offset,
            extensions: 'all'
        };
        
        const response = await axios.get('https://restapi.amap.com/v3/place/text', { params });
        
        if (response.data.status === '1' && response.data.pois && response.data.pois.length > 0) {
            return response.data.pois;
        }
        return [];
    } catch (error) {
        console.error('Amap POI Search Error:', error.message);
        return [];
    }
};

/**
 * 获取天气信息 (weatherreport)
 * 文档: https://lbs.amap.com/api/webservice/guide/api/weatherinfo
 */
const getWeather = async (adcode, extensions = 'all') => {
    if (!AMAP_KEY) return null;

    try {
        const response = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
            params: {
                key: AMAP_KEY,
                city: adcode,
                extensions: extensions
            }
        });

        if (response.data.status === '1' && response.data.forecasts && response.data.forecasts.length > 0) {
            return response.data.forecasts[0];
        }
        return null;
    } catch (error) {
        console.error('Amap Weather Error:', error.message);
        return null;
    }
};

/**
 * 路线规划 (routeplanner)
 * 文档: https://lbs.amap.com/api/webservice/guide/api/direction
 */
const getRoute = async (origin, destination, mode = 'transit', city = '010', strategy = 0) => {
    if (!AMAP_KEY) return null;

    let apiPath = "";
    const params = {
        key: AMAP_KEY,
        origin: origin, // "lon,lat"
        destination: destination, // "lon,lat"
    };

    if (mode === 'transit') {
        apiPath = "/direction/transit/integrated";
        params.city = city;
        params.strategy = strategy; 
    } else if (mode === 'walking') {
        apiPath = "/direction/walking";
    } else if (mode === 'driving') {
        apiPath = "/direction/driving";
        params.strategy = 10; // 躲避拥堵
    } else if (mode === 'bicycling') {
        apiPath = "/direction/bicycling";
    }

    try {
        const response = await axios.get(`https://restapi.amap.com/v3${apiPath}`, { params });
        if (response.data.status === '1' && response.data.route) {
            return response.data.route;
        }
        return null;
    } catch (error) {
        console.error(`Amap Route Error [${mode}]:`, error.message);
        return null;
    }
};

module.exports = {
    getLocationByIP,
    getNearbyPOI,
    getLocationByAddress,
    searchPOI,
    getWeather,
    getRoute
};
