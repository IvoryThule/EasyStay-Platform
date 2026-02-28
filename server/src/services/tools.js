const { DynamicStructuredTool } = require("@langchain/core/tools");
const { z } = require("zod");
const { Hotel } = require('../models');
const { Op, Sequelize } = require('sequelize');

const hotelSearchTool = new DynamicStructuredTool({
  name: "search_hotels",
  description: "当用户想要搜索酒店、查询房价、寻找住宿推荐时使用。不要用于查询纯粹的旅游景点或路线。",
  schema: z.object({
    city: z.string().describe("城市名称，如：上海、北京"),
    minPrice: z.number().optional().describe("最低预算"),
    maxPrice: z.number().optional().describe("最高预算"),
    keyword: z.string().optional().describe("具体环境或地标标签。若用户用宽泛词(如“交通便利”)，请自动转化为更具体的实体词汇(如“地铁”、“车站”、“商圈”)以扩大命中率。"),
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
      
      if (city) where.city = { [Op.like]: `%${city}%` };
      
      if (minPrice || maxPrice) {
          where.price = {};
          if (minPrice) where.price[Op.gte] = minPrice;
          if (maxPrice) where.price[Op.lte] = maxPrice;
      }
      
      if (parsedKeyword) {
          where[Op.or] = [
              { name: { [Op.like]: `%${parsedKeyword}%` } },
              { address: { [Op.like]: `%${parsedKeyword}%` } },
              Sequelize.where(Sequelize.cast(Sequelize.col('tags'), 'CHAR'), 'LIKE', `%${parsedKeyword}%`) // 安全参数化的 JSON 强转方案，避免 SQL 注入
          ];
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
          attributes: ['name', 'price', 'star', 'address', 'tags']
      });

      if (hotels.length === 0) return "未找到符合条件的酒店，请如实告知用户并建议调整预算或放宽位置要求。";
      
      // 返回给 AI 的必须是字符串数据，让 AI 自行组织文案
      return JSON.stringify(hotels.map(h => ({
          name: h.name,
          price: h.price,
          star: h.star,
          tags: Array.isArray(h.tags) ? h.tags.join(',') : h.tags,
          address: h.address
      })));
    } catch (err) {
      console.error("🛠️ 搜索酒店工具出错:", err);
      return "搜索酒店时数据库发生错误。建议用户稍等或换个条件。";
    }
  },
});

module.exports = { hotelSearchTool };
