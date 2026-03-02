const { Hotel, RoomType } = require('../models')
const { Op } = require('sequelize')
const { success, fail } = require('../utils/response')
const AgentService = require('../services/agentService')

/**
 * 提取所有 search_hotels 中间步骤中的酒店数据，合并去重
 */
function extractHotelCards(intermediateSteps) {
  const allHotels = new Map();
  for (const step of intermediateSteps) {
    if (step.action.tool !== 'search_hotels' || !step.observation) continue;
    try {
      if (typeof step.observation === 'string' && step.observation.startsWith('[')) {
        const hotelList = JSON.parse(step.observation);
        if (Array.isArray(hotelList)) {
          for (const h of hotelList) {
            if (h.name && !allHotels.has(h.name)) {
              allHotels.set(h.name, {
                ...h,
                tags: typeof h.tags === 'string' ? h.tags.split(',') : h.tags,
                recommend_reason: 'Agent 智能精选'
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("解析工具返回记录失败", err);
    }
  }
  return allHotels;
}

/**
 * 清理 Markdown 标记以适配移动端
 */
function cleanMarkdown(text) {
  return (text || '').replace(/\*\*/g, '').replace(/#/g, '').replace(/_/g, '');
}

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

    // 提取所有酒店卡片数据（合并多次搜索结果）
    const allHotels = extractHotelCards(intermediateSteps);
    const type = allHotels.size > 0 ? 'hotel_cards' : 'text';
    const cards = Array.from(allHotels.values());

    const cleanOutput = cleanMarkdown(output);

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

/**
 * POST /api/ai/chat/stream
 * SSE 流式聊天接口 — 实时推送思考过程和工具调用状态
 * Body: { message, history, sessionContext }
 * 
 * SSE 事件类型:
 *   thinking   - Agent 开始新一轮推理 { iteration, maxIterations }
 *   tool_start - 开始调用工具 { tool, args }
 *   tool_end   - 工具调用完成 { tool, success, error? }
 *   complete   - 最终结果（与 /chat 返回格式一致）
 *   error      - 出错 { message }
 */
exports.chatStream = async (req, res) => {
  // 设置 SSE 响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // nginx 禁用缓冲
  res.flushHeaders();

  let clientDisconnected = false;
  // 关键: 必须监听 res.on('close') 而非 req.on('close')
  // req.on('close') 在 POST body 消费完就触发，不代表客户端断开
  // res.on('close') 仅在底层 TCP 连接关闭时触发（真正的断开）
  res.on('close', () => {
    if (!clientDisconnected) {
      clientDisconnected = true;
      clearInterval(heartbeatTimer);
      console.log('SSE: 客户端断开连接');
    }
  });

  // 核心: SSE 心跳保活 — 每 10 秒发送注释帧，防止 proxy/浏览器因空闲断开连接
  const heartbeatTimer = setInterval(() => {
    if (clientDisconnected) return clearInterval(heartbeatTimer);
    try { res.write(': heartbeat\n\n'); } catch { clearInterval(heartbeatTimer); }
  }, 10000);

  const sendSSE = (event, data) => {
    if (clientDisconnected) return;
    try {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    } catch (e) { /* client gone */ }
  };

  try {
    const body = req.body || {};
    const message = String(body.message || body.prompt || '').trim();
    const history = Array.isArray(body.history) ? body.history : [];
    const newSessionContext = body.sessionContext && typeof body.sessionContext === 'object'
      ? body.sessionContext : {};

    if (!message) {
      sendSSE('error', { message: '请输入您的问题' });
      clearInterval(heartbeatTimer);
      return res.end();
    }

    // 调用 Agent，传入 onEvent 回调实现实时推送
    const { output, intermediateSteps } = await AgentService.chat(message, history, (event) => {
      sendSSE(event.type, event.data);
    });

    // 提取酒店卡片
    const allHotels = extractHotelCards(intermediateSteps);
    const type = allHotels.size > 0 ? 'hotel_cards' : 'text';
    const cards = Array.from(allHotels.values());
    const cleanOutput = cleanMarkdown(output);

    const thoughtProcess = intermediateSteps.map(step => ({
      tool: step.action.tool,
      toolInput: step.action.toolInput,
      log: step.action.log
    }));

    // 发送最终完整结果
    sendSSE('complete', {
      reply: cleanOutput,
      content: cleanOutput,
      message: { type, text: cleanOutput, cards },
      sessionContext: newSessionContext,
      thoughtProcess
    });

    clearInterval(heartbeatTimer);
    res.end();
  } catch (err) {
    console.error('AI Chat Stream Error:', err);
    sendSSE('error', { message: '服务异常，请稍后再试' });
    clearInterval(heartbeatTimer);
    res.end();
  }
}
