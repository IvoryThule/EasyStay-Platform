const GLMService = require('../services/GLMService')
const { Hotel, RoomType } = require('../models')
const { Op } = require('sequelize')
const { success, fail } = require('../utils/response') // Changed error to fail

/**
 * AI 聊天接口
 * POST /api/ai/chat
 * Body: { message: string, history: Array, context: { city, checkInDate, checkOutDate } }
 */
exports.chat = async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body

    if (!message || !message.trim()) {
      return fail(res, '请输入您的问题')
    }

    // ========== 核心：从数据库查询真实酒店数据注入提示词 ==========
    let availableHotels = []

    try {
      // 构建查询条件
      const where = { status: 'published' }  // 只查已发布的酒店

      // 如果用户提到了城市，按城市筛选
      if (context.city) {
        where.city = { [Op.like]: `%${context.city}%` }
      }

      // 从用户消息中提取可能的关键词做智能匹配
      const keywords = extractKeywords(message)
      if (keywords.city) {
        where.city = { [Op.like]: `%${keywords.city}%` }
      }
      if (keywords.starRating) {
        where.star_rating = keywords.starRating
      }

      availableHotels = await Hotel.findAll({
        where,
        include: [{
          model: RoomType,
          as: 'roomTypes',
          attributes: ['name', 'area', 'bed_type', 'price', 'breakfast']
        }],
        limit: 10,  // 限制数量，避免token超限
        order: [['score', 'DESC']]
      })
    } catch (dbError) {
      console.error('查询酒店数据失败:', dbError.message)
      // 数据库查询失败不影响AI回复，只是没有真实数据
    }

    // ========== 构造对话历史 ==========
    const messages = []

    // 添加历史消息（最近10轮，避免token过多）
    const recentHistory = history.slice(-10)
    recentHistory.forEach(item => {
      messages.push({ role: item.role, content: item.content })
    })

    // 添加当前用户消息
    messages.push({ role: 'user', content: message })

    // ========== 调用大模型 ==========
    const aiContext = {
      availableHotels: availableHotels.map(h => h.toJSON()),
      userLocation: context.city || null,
      checkInDate: context.checkInDate || null,
      checkOutDate: context.checkOutDate || null
    }

    const result = await GLMService.chat(messages, aiContext)

    if (result.success) {
      return success(res, {
        reply: result.reply,
        usage: result.usage
      })
    } else {
      return fail(res, result.reply)
    }
  } catch (err) {
    console.error('AI Chat Error:', err)
    return fail(res, '服务异常，请稍后再试', 500)
  }
}

/**
 * AI 智能推荐接口（首页使用）
 * POST /api/ai/recommend
 * Body: { city, budget, purpose, tags }
 */
exports.recommend = async (req, res) => {
  try {
    const { city, budget, purpose, tags = [] } = req.body

    // 查询符合条件的酒店
    const where = { status: 'published' }
    if (city) where.city = { [Op.like]: `%${city}%` }

    let hotels = await Hotel.findAll({
      where,
      include: [{
        model: RoomType,
        as: 'roomTypes',
        attributes: ['name', 'price', 'bed_type', 'breakfast']
      }],
      limit: 15,
      order: [['score', 'DESC']]
    })

    // 如果有预算限制，过滤
    if (budget) {
      hotels = hotels.filter(h => {
        const minPrice = Math.min(...(h.roomTypes || []).map(r => r.price || Infinity))
        return minPrice <= budget
      })
    }

    // 让AI基于这些酒店做智能推荐
    const message = `请根据以下需求为用户推荐最合适的3家酒店：
- 目的地: ${city || '不限'}
- 预算: ${budget ? `${budget}元/晚以内` : '不限'}
- 出行目的: ${purpose || '休闲旅游'}
- 偏好标签: ${tags.length > 0 ? tags.join('、') : '无特殊偏好'}

请以列表形式推荐，每家酒店说明推荐理由。`

    const result = await GLMService.chat(
      [{ role: 'user', content: message }],
      { availableHotels: hotels.map(h => h.toJSON()) }
    )

    return success(res, {
      reply: result.reply,
      hotels: hotels.slice(0, 3).map(h => ({
        id: h.id,
        name: h.name_cn,
        city: h.city,
        star_rating: h.star_rating,
        score: h.score,
        min_price: Math.min(...(h.roomTypes || []).map(r => r.price || 0))
      }))
    })
  } catch (err) {
    console.error('AI Recommend Error:', err)
    return fail(res, '推荐服务异常', 500)
  }
}

/**
 * 从用户消息中提取关键词
 */
function extractKeywords(message) {
  const result = {}

  // 城市提取（简单匹配）
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆',
    '西安', '南京', '武汉', '长沙', '厦门', '青岛', '大连',
    '三亚', '丽江', '大理', '桂林', '苏州']
  for (const city of cities) {
    if (message.includes(city)) {
      result.city = city
      break
    }
  }

  // 星级提取
  const starMatch = message.match(/(\d)[星⭐]/)
  if (starMatch) {
    result.starRating = parseInt(starMatch[1])
  }

  return result
}
