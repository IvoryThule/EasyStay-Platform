const { Hotel, RoomType } = require('../models')
const { Op } = require('sequelize')
const { success, fail } = require('../utils/response')
const AgentService = require('../services/agentService')

/**
 * POST /api/ai/chat
 * 兼容:
 * - 新版: { message, history, sessionContext, debug }
 * - 旧版: { prompt, mode, context }
 */
exports.chat = async (req, res) => {
  try {
    const body = req.body || {}
    const rawMessage = body.message !== undefined ? body.message : body.prompt
    const message = String(rawMessage || '').trim()
    const history = Array.isArray(body.history) ? body.history : []
    const newSessionContext = body.sessionContext && typeof body.sessionContext === 'object'
      ? body.sessionContext
      : {}

    if (!message) {
      return fail(res, '请输入您的问题')
    }

    // 调用最强 Agent 大脑
    const { output, intermediateSteps } = await AgentService.chat(message, history);

    // 将大模型的思考或调用的工具整理下，传给前端
    const thoughtProcess = intermediateSteps.map(step => ({
      tool: step.action.tool,
      toolInput: step.action.toolInput,
      log: step.action.log
    }));

    // 让前端兼容重现出 "hotel_cards"
    let type = 'text';
    let cards = [];
    
    const searchStep = intermediateSteps.find(step => step.action.tool === 'search_hotels');
    if (searchStep && searchStep.observation) {
      try {
        if (typeof searchStep.observation === 'string' && searchStep.observation.startsWith('[')) {
          const hotelList = JSON.parse(searchStep.observation);
          if (Array.isArray(hotelList) && hotelList.length > 0) {
            type = 'hotel_cards';
            cards = hotelList.map(h => ({
              ...h,
              // Tag 可能需要重新展开给前端显示
              tags: typeof h.tags === 'string' ? h.tags.split(',') : h.tags,
              recommend_reason: 'Agent 智能精选'
            }));
          }
        }
      } catch (err) {
        console.error("解析工具返回记录失败", err);
      }
    }

    // Agent 回复可能包含 Markdown (`**粗体**`)。为了在小程序/移动端不出乱码，我们做个简单的清理
    const cleanOutput = output.replace(/\*\*/g, '').replace(/#/g, '').replace(/_/g, '');

    return success(res, {
      reply: cleanOutput,
      content: cleanOutput, 
      // 兼容旧版前端解构 payload.message.type / text / cards 的逻辑
      message: {
        type,
        text: cleanOutput,
        cards
      },
      sessionContext: newSessionContext,
      thoughtProcess: thoughtProcess 
    })
  } catch (err) {
    console.error('AI Chat Error:', err)
    return fail(res, '服务异常，请稍后再试', 500)
  }
}

/**
 * POST /api/ai/recommend
 * Body: { city, budget }
 */
exports.recommend = async (req, res) => {
  try {
    const { city, budget } = req.body
    const where = { status: 1 }
    if (city) where.city = { [Op.like]: `%${city}%` }
    if (budget) where.price = { [Op.lte]: budget }

    const hotels = await Hotel.findAll({
      where,
      include: [{
        model: RoomType,
        as: 'roomTypes',
        attributes: ['id', 'name', 'price', 'stock', 'image']
      }],
      limit: 15,
      order: [['price', 'DESC']]
    })

    const topHotels = hotels.slice(0, 3).map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      star_rating: Number(hotel.star || 0),
      score: Number(hotel.score || hotel.star || 0),
      min_price: Number(hotel.price || 0)
    }))

    const reply = topHotels.length > 0
      ? `已为您筛选出${topHotels.length}家可选酒店。`
      : '当前没有符合条件的酒店，请尝试调整城市或预算。'

    return success(res, { reply, hotels: topHotels })
  } catch (err) {
    console.error('AI Recommend Error:', err)
    return fail(res, '推荐服务异常', 500)
  }
}

/**
 * POST /api/ai/generate-slogan
 * Body: { hotelName, city, tags }
 */
exports.generateSlogan = async (req, res) => {
  try {
    const { hotelName, city, tags } = req.body
    if (!hotelName || !city) {
      return fail(res, '缺少必要参数: hotelName, city')
    }

    const GLMService = require('../services/GLMService')
    const slogan = await GLMService.generateHotelSlogan(hotelName, city, tags || [])

    return success(res, { slogan })
  } catch (err) {
    console.error('AI Generate Slogan Error:', err)
    return fail(res, '生成推荐语异常', 500)
  }
}
