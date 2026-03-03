const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const { Hotel, RoomType } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { 
  getLocationByAddress, 
  searchPOI, 
  getWeather, 
  getRoute 
} = require('./amapService');

/**
 * 智能地理编码（模块级公共函数）:
 * 优先 POI 搜索（更适合景点/餐厅/酒店等具名地点），
 * 失败再回退到地址解析（更适合"XX路XX号"这类纯地址）。
 * 
 * @param {string} name - 地点名称
 * @param {string} cityHint - 城市名称（用于约束搜索范围）
 * @param {string} [referenceLocation] - 参考坐标 "lng,lat"，用于 POI 搜索时按距离排序，
 *   确保返回离参考点最近的同名地点（如最近的"樱花园"而非全城随机一个）
 */
async function smartGeocode(name, cityHint, referenceLocation = '') {
  // 1. 优先用 POI 搜索 (对餐厅/景点/酒店等具名地点最精准)
  try {
    const pois = await searchPOI(name, cityHint, '', 1, referenceLocation);
    if (pois && pois.length > 0 && pois[0].location) {
      const [lng, lat] = pois[0].location.split(',');
      console.log(`📍 POI 搜索定位成功: ${name} -> ${pois[0].location} (${pois[0].name})`);
      return {
        longitude: Number(lng),
        latitude: Number(lat),
        rawLocation: pois[0].location,
        citycode: pois[0].citycode || '',
        city: pois[0].cityname || cityHint
      };
    }
  } catch (e) {
    console.warn(`📍 POI 搜索失败: ${name}`, e.message);
  }
  
  // 2. POI 搜索无结果 → 回退到地理编码 (适合纯地址如"朝阳区建国路12号")
  console.log(`📍 POI 搜索无结果，回退到地理编码: ${name}`);
  let geo = await getLocationByAddress(name, cityHint);
  if (geo) return geo;
  
  return null;
}

const hotelSearchTool = new DynamicStructuredTool({
  name: "search_hotels",
  description: "当用户想要搜索酒店、查询房价、寻找住宿推荐时使用。如果用户没有指定城市，则表示在所有城市范围内搜索。不要用于查询纯粹的旅游景点或路线。",
  schema: z.object({
    city: z.string().optional().describe("城市名称。如果不提供，则在全平台搜索。"),
    minPrice: z.number().optional().describe("最低预算"),
    maxPrice: z.number().optional().describe("最高预算"),
    keyword: z.string().optional().describe("具体环境或地标标签。若用户用宽泛词(如“交通便利”)，请自动转化为更具体的实体词汇(如“地铁”、“车站”、“商圈”)以扩大命中率。如果关键词或者关键词的属性（比如说双床房属于房型这个表中）是某个数据库实体的话，请优先匹配实体名称或地址字段，而非模糊匹配标签。"),
    sortBy: z.enum(["price_asc", "price_desc", "score_desc"]).optional().describe("排序方式：价格从低到高(price_asc)，价格从高到低(price_desc)，评分从高到低(score_desc)")
  }),
  func: async ({ city, minPrice, maxPrice, keyword, sortBy }) => {
    console.log(`🛠️ Agent 正在调用搜索工具:`, { city, minPrice, maxPrice, keyword, sortBy });
    
    try {
      // 意图增强校验（补偿大模型的局限性）
      let parsedKeyword = keyword;
      if (keyword && (keyword.includes('交通') || keyword.includes('便利') || keyword.includes('出行'))) {
          parsedKeyword = '地铁';
      }

      // 构建数据库查询条件
      const where = {
          status: 1 // 仅查询上架状态的酒店
      };
      
        const normalizedCity = typeof city === 'string' ? city.trim().replace(/市$/, '') : city;
        const noLimitCities = new Set(['不限城市', '不限城', '不限', '全国']);
        if (normalizedCity && !noLimitCities.has(normalizedCity)) {
          where.city = { [Op.like]: `%${normalizedCity}%` };
        }
      
      if (minPrice || maxPrice) {
          where.price = {};
          if (minPrice) where.price[Op.gte] = minPrice;
          if (maxPrice) where.price[Op.lte] = maxPrice;
      }
      
        if (parsedKeyword) {
          const keywordLike = `%${parsedKeyword}%`;
          // Find matching RoomTypes first
          const matchingRoomTypes = await RoomType.findAll({
              attributes: ['hotel_id'],
              where: {
                  [Op.or]: [
                { name: { [Op.like]: keywordLike } }
                  ]
              },
              raw: true
          });
          const roomTypeHotelIds = matchingRoomTypes.map(rt => rt.hotel_id);

          const keywordOr = [
            { name: { [Op.like]: keywordLike } },
            { address: { [Op.like]: keywordLike } },
            Sequelize.where(Sequelize.cast(Sequelize.col('tags'), 'CHAR'), 'LIKE', keywordLike) // 安全参数化的 JSON 强转方案
          ];

          if (roomTypeHotelIds.length > 0) {
            keywordOr.push({ id: { [Op.in]: roomTypeHotelIds } });
          }

          where[Op.or] = keywordOr;
      }

      // 智能排序逻辑
      let order = [['star', 'DESC'], ['price', 'DESC']]; // 默认推荐高星级
      if (sortBy === 'price_asc') order = [['price', 'ASC']];
      if (sortBy === 'price_desc') order = [['price', 'DESC']];
      if (sortBy === 'score_desc') order = [['star', 'DESC'], ['price', 'DESC']]; // 兼容以前的评分逻辑，改为按星级排序

      const hotels = await Hotel.findAll({
          where,
          limit: 5, // 只取最匹配的头几个，避免 Token 爆炸
          order,
          attributes: ['id', 'name', 'price', 'star', 'address', 'tags', 'cover_image', 'city']
      });

      if (hotels.length === 0) return "未找到符合条件的酒店，请如实告知用户并建议调整预算或放宽位置要求。";
      
      // 返回给 AI 的必须是字符串数据，让 AI 自行组织文案
      return JSON.stringify(hotels.map(h => ({
          id: h.id,
          name: h.name,
          price: h.price,
          star: h.star,
          tags: Array.isArray(h.tags) ? h.tags.join(',') : h.tags,
          address: h.address,
          cover_image: h.cover_image,
          city: h.city
      })));
    } catch (err) {
      console.error("🛠️ 搜索酒店工具出错:", err);
      return "搜索酒店时数据库发生错误。建议用户稍等或换个条件。";
    }
  },
});

// ---- 真实工具: 路线规划 (routeplanner) - 基于高德路径规划 ----
const routePlannerTool = new DynamicStructuredTool({
  name: "routeplanner",
  description: "用于规划路线，计算从出发地到目的地的真实步行/公交/驾车距离和时间。调用真实地图API，返回精确的距离和耗时数据。必须提供城市参数以确保地址解析准确。注意：短途（<5km）建议用walking模式，较远距离用transit模式。",
  schema: z.object({
    from: z.string().describe("出发地名称，越详细越好，例如'全季酒店(北京国贸店)'"),
    to: z.string().describe("目的地名称，越详细越好，例如'北京前门大街'"),
    city: z.string().optional().describe("所在城市名称（如'北京'），用于约束地址解析范围，避免跨城误匹配"),
    mode: z.enum(["driving", "walking", "transit", "bicycling"]).optional().describe("出行方式，默认为 transit (公交/地铁)")
  }),
  func: async ({ from, to, city = '', mode = "transit" }) => {
    console.log(`🛠️ Agent 调用高德路线规划: ${from} -> ${to} [${mode}] city=${city}`);
    
    // 1. 先定位起点（通常是酒店，位置明确）
    const originGeo = await smartGeocode(from, city);
    if (!originGeo) {
        return `无法找到起点"${from}"的具体位置，请提供更详细的地址。`;
    }
    
    // 2. 再定位终点，使用起点坐标作为proximity hint
    //    这样搜索"樱花园"时会优先返回离酒店最近的那个，而非全城随机一个
    const destGeo = await smartGeocode(to, city, originGeo.rawLocation);
    
    if (!destGeo) {
        return `无法找到目的地"${to}"的具体位置，请提供更详细的地址。`;
    }
    
    console.log(`📍 路线规划: ${from}(${originGeo.rawLocation}) -> ${to}(${destGeo.rawLocation})`);

    // 2. 这里的 city 必填 (针对公交)，我们取 origin 的 citycode
    const routeCity = originGeo.citycode || "010"; // 默认北京，如果不幸获取失败
    const strategy = mode === 'driving' ? 10 : 0;

    const routeData = await getRoute(originGeo.rawLocation, destGeo.rawLocation, mode, routeCity, strategy); // This function returns route object directly (route.paths or route.transits)

    if (!routeData) return "路线规划服务异常。";

    // 针对公交模式的特殊解析 (Result structure: route.transits)
    if (mode === 'transit') {
         // getRoute() returns response.data.route directly
         const transits = routeData.transits;
         if (!transits || transits.length === 0) return "未找到公交路线，可能是距离过近或跨城方案不支持。";
         
         // 解析第一条公交路线
         const path = transits[0];
         const segments = path.segments || [];
         const stepsDesc = segments.map(seg => {
             if (seg.bus && seg.bus.buslines && seg.bus.buslines.length > 0) {
                 return `乘坐 ${seg.bus.buslines[0].name} (${seg.bus.buslines[0].departure_stop.name} 上, ${seg.bus.buslines[0].arrival_stop.name} 下)`;
             } else if (seg.walking) {
                 return `步行 ${seg.walking.distance}米`;
             }
             return "换乘/步行";
         }).join(" -> ");
         
         return JSON.stringify({
             mode,
             origin: from,
             destination: to,
             distance: `${(path.distance/1000).toFixed(1)}km`,
             duration: `${Math.ceil(path.duration/60)}分钟`,
             cost: path.cost ? `¥${path.cost}` : "未知",
             route: stepsDesc
         });
    }

    // 针对驾车/步行/骑行模式 (Result structure: route.paths)
    const paths = routeData.paths;
    if (!paths || paths.length === 0) return "未找到路线。";
    
    const primePath = paths[0];
    const distKm = (primePath.distance / 1000).toFixed(1);
    const durMin = Math.ceil(primePath.duration / 60);
    
    // 智能简化路线描述：只保留关键步骤，避免冗长的微转向
    const allSteps = primePath.steps || [];
    let routeSummary;
    if (allSteps.length <= 3) {
      // 步骤很少，全部展示
      routeSummary = allSteps.map(s => s.instruction).join("；");
    } else {
      // 步骤多时，提取首段 + 中间关键段 + 末段，给出概览
      const first = allSteps[0].instruction;
      const last = allSteps[allSteps.length - 1].instruction;
      // 筛选中间较长距离的关键步骤（过滤掉<50米的微转向）
      const midSteps = allSteps.slice(1, -1)
        .filter(s => {
          const dist = parseInt(s.distance || '0');
          return dist >= 50; // 只保留50米以上的步骤
        })
        .slice(0, 3) // 最多取3个关键中间步骤
        .map(s => s.instruction);
      routeSummary = [first, ...midSteps, last].join("；");
    }
    
    return JSON.stringify({
        mode,
        origin: from,
        destination: to,
        distance: `${distKm}km`,
        duration: `${durMin}分钟`,
        route_summary: routeSummary
    });
  }
});

// ---- 真实工具: 景点查找 (attractionfinder) - 基于高德搜索 ----
const attractionFinderTool = new DynamicStructuredTool({
  name: "attractionfinder",
  description: "用于查找旅游景点或特定类型的POI。支持指定中心地点（如酒店名称）来获取精确的距离信息。",
  schema: z.object({
    city: z.string().describe("城市名称"),
    keyword: z.string().optional().describe("景点关键词，若无则默认为“景点”"),
    near: z.string().optional().describe("搜索中心点（如酒店名或详细地址），用于计算距离和按距离排序。例如'全季酒店(北京国贸店)'")
  }),
  func: async ({ city, keyword = "景点", near }) => {
    console.log(`🛠️ Agent 调用高德POI搜索(景点): ${city} [${keyword}] near=${near || '无'}`);
    
    // 如果指定了中心点，用 smartGeocode 获取坐标（比纯地理编码更精准）
    let centerLocation = '';
    if (near) {
      const geo = await smartGeocode(near, city);
      if (geo && geo.rawLocation) {
        centerLocation = geo.rawLocation;
        console.log(`📍 景点搜索中心点: ${near} -> ${centerLocation}`);
      }
    }
    
    const pois = await searchPOI(keyword, city, "风景名胜", 10, centerLocation);
    
    if (!pois || pois.length === 0) {
        return `在${city}未找到与“${keyword}”相关的景点。`;
    }

    return JSON.stringify(pois.map(poi => ({
        name: poi.name,
        type: poi.type,
        address: poi.address,
        rating: poi.rating,
        distance: poi.distance ? `${poi.distance}米` : '未知'
    })));
  }
});

// ---- 真实工具: 餐厅查找 (restaurantfinder) - 基于高德搜索 ----
const restaurantFinderTool = new DynamicStructuredTool({
  name: "restaurantfinder",
  description: "用于查找附近的餐厅、美食。支持指定中心地点（如酒店名称）来获取精确距离。",
  schema: z.object({
    location: z.string().describe("城市名称"),
    cuisine: z.string().optional().describe("美食关键词，如“火锅”、“川菜”"),
    near: z.string().optional().describe("搜索中心点（如酒店名或详细地址），用于计算距离和按距离排序")
  }),
  func: async ({ location, cuisine = "美食", near }) => {
    console.log(`🛠️ Agent 调用高德POI搜索(餐饮): ${location} [${cuisine}] near=${near || '无'}`);

    // 如果指定了中心点，用 smartGeocode 获取坐标（比纯地理编码更精准）
    let centerLocation = '';
    if (near) {
      const geo = await smartGeocode(near, location);
      if (geo && geo.rawLocation) {
        centerLocation = geo.rawLocation;
        console.log(`📍 餐厅搜索中心点: ${near} -> ${centerLocation}`);
      }
    }

    const pois = await searchPOI(cuisine, location, "餐饮服务", 10, centerLocation);
    
    if (!pois || pois.length === 0) {
        return `在${location}附近未找到“${cuisine}”。`;
    }

    return JSON.stringify(pois.map(poi => ({
        name: poi.name,
        type: poi.type,
        address: poi.address,
        rating: poi.rating,
        price: poi.cost !== "未知" ? `¥${poi.cost}` : "未知",
        distance: poi.distance ? `${poi.distance}米` : '未知',
        tel: poi.tel
    })));
  }
});

// ---- 真实工具: 天气预报 (weatherreport) - 基于高德天气 ----
const weatherReportTool = new DynamicStructuredTool({
  name: "weatherreport",
  description: "用于查询实时天气或天气预报。高德天气仅支持国内城市。",
  schema: z.object({
    city: z.string().describe("城市名称")
  }),
  func: async ({ city }) => {
    console.log(`🛠️ Agent 调用高德天气: ${city}`);
    
    // 1. 获取 adcode
    const geo = await getLocationByAddress(city);
    if (!geo || !geo.adcode) return `无法获取地址"${city}"的行政编码。`;

    // 2. 调用 weatherAPI
    const forecast = await getWeather(geo.adcode);

    if (!forecast || !forecast.casts || forecast.casts.length === 0) {
        return `未查询到${city}的天气信息。`;
    }

    const casts = forecast.casts || [];
    
    // 整理未来3天天气
    const report = casts.map(c => ({
        date: c.date,
        dayWeather: c.dayweather,
        nightWeather: c.nightweather,
        temp: `${c.nighttemp}°C ~ ${c.daytemp}°C`,
        wind: `${c.daywind}风 ${c.daypower}级`
    }));

    return JSON.stringify({
        city: forecast.city,
        reportTime: forecast.reporttime,
        forecasts: report
    });
  }
});

// ---- (保留模拟) 工具: 汇率与时区 (高德不支持) ----
const currencyConverterTool = new DynamicStructuredTool({
  name: "currencyconverter",
  description: "用于货币转换 (模拟工具，非实时汇率)。",
  schema: z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string()
  }),
  func: async ({ amount, from, to }) => {
     // 简单模拟
     const rate = (from === 'USD' && to === 'CNY') ? 7.14 : (from === 'CNY' && to === 'USD' ? 0.14 : 1.0);
     return JSON.stringify({ original: amount, converted: (amount * rate).toFixed(2), rate });
  }
});

const timezoneConverterTool = new DynamicStructuredTool({
  name: "timezoneconverter",
  description: "用于时区查询 (模拟工具)。",
  schema: z.object({ city: z.string() }),
  func: async ({ city }) => {
     return JSON.stringify({ city, timeSuggestion: "当前功能为模拟，建议直接查询当地时间。" });
  }
});

module.exports = { 
  hotelSearchTool,
  routePlannerTool,
  attractionFinderTool,
  restaurantFinderTool,
  weatherReportTool,
  currencyConverterTool,
  timezoneConverterTool
};
