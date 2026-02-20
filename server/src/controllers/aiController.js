const { Hotel, RoomType } = require('../models');
const { Op } = require('sequelize');
const { success, fail } = require('../utils/response');
const HotelAssistantService = require('../services/hotelAssistantService');

/**
 * AI 聊天接口
 * POST /api/ai/chat
 * 兼容:
 * - 新版: { message, history, sessionContext, debug }
 * - 旧版: { prompt, mode }
 */
exports.chat = async (req, res) => {
  try {
    const body = req.body || {};
    const rawMessage = body.message !== undefined ? body.message : body.prompt;
    const message = String(rawMessage || '').trim();
    const history = Array.isArray(body.history) ? body.history : [];
    const legacyContext = body.context && typeof body.context === 'object' ? body.context : {};
    const newSessionContext = body.sessionContext && typeof body.sessionContext === 'object'
      ? body.sessionContext
      : {};
    const sessionContext = {
      ...legacyContext,
      ...newSessionContext,
      city: newSessionContext.city || legacyContext.city || null,
      budgetIntent: newSessionContext.budgetIntent || null,
      travelPurpose: newSessionContext.travelPurpose || null,
      preferences: Array.isArray(newSessionContext.preferences) ? newSessionContext.preferences : []
    };
    const debug = Boolean(body.debug);

    if (!message) {
      return fail(res, '请输入您的问题');
    }

    const result = debug
      ? await HotelAssistantService.simulateAssistantReply(message, sessionContext, history)
      : await HotelAssistantService.handleChat({
        message,
        history,
        sessionContext,
        debug
      });

    return success(res, {
      reply: result.reply,
      content: result.content || result.reply,
      message: result.message,
      sessionContext: result.sessionContext
    });
  } catch (err) {
    console.error('AI Chat Error:', err);
    return fail(res, '服务异常，请稍后再试', 500);
  }
};

/**
 * AI 智能推荐接口（首页使用）
 * POST /api/ai/recommend
 * Body: { city, budget }
 */
exports.recommend = async (req, res) => {
  try {
    const { city, budget } = req.body;
    const where = { status: 1 };
    if (city) where.city = { [Op.like]: `%${city}%` };
    if (budget) where.price = { [Op.lte]: budget };

    const hotels = await Hotel.findAll({
      where,
      include: [{
        model: RoomType,
        as: 'roomTypes',
        attributes: ['id', 'name', 'price', 'stock', 'image']
      }],
      limit: 15,
      order: [['price', 'DESC']]
    });

    const topHotels = hotels.slice(0, 3).map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      star_rating: Number(hotel.star || 0),
      score: Number(hotel.score || hotel.star || 0),
      min_price: Number(hotel.price || 0)
    }));

    const reply = topHotels.length > 0
      ? `已为您筛选出${topHotels.length}家可选酒店。`
      : '当前没有符合条件的酒店，请尝试调整城市或预算。';

    return success(res, { reply, hotels: topHotels });
  } catch (err) {
    console.error('AI Recommend Error:', err);
    return fail(res, '推荐服务异常', 500);
  }
};
