const express = require('express');
const router = express.Router();
const GLMService = require('../services/GLMService');
const { success, fail } = require('../utils/response');

/**
 * AI 通用问答接口
 * POST /api/ai/chat
 * Body: { prompt: "你好", mode: "GENERAL_ASSISTANT" }
 * mode 可选值: BOOKING_DECISION_ENGINE | HOTEL_AUDIT_ASSISTANT | GENERAL_ASSISTANT
 */
router.post('/chat', async (req, res) => {
    try {
        const { prompt, mode = 'GENERAL_ASSISTANT' } = req.body;
        if (!prompt) return fail(res, 'Prompt is required', 400);

        const result = await GLMService.generateText(prompt, mode);
        success(res, { content: result });
    } catch (error) {
        fail(res, error.message, 500);
    }
});

/**
 * 🔥 AI 智能订房决策接口 (核心创新)
 * POST /api/ai/smart-search
 * Body: { query: "我和女朋友周末去杭州，预算600，要安静能看江" }
 * 
 * 将用户自然语言转化为结构化搜索参数，可直接传递给 /api/hotel/list
 */
router.post('/smart-search', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return fail(res, 'Query is required', 400);

        console.log(`🎯 智能搜索请求: "${query}"`);
        
        const parsed = await GLMService.parseBookingIntent(query);
        
        // 如果成功解析为搜索意图
        if (parsed.intent === 'search' && parsed.params) {
            success(res, {
                type: 'search',
                searchParams: parsed.params,
                reasoning: parsed.reasoning,
                message: '已理解您的需求，为您生成搜索条件'
            });
        } else {
            // 普通对话，返回 AI 回复
            success(res, {
                type: 'chat',
                content: parsed.rawResponse || parsed,
                message: '这是一个普通对话，未识别到订房意图'
            });
        }
    } catch (error) {
        console.error('❌ Smart Search Error:', error);
        fail(res, error.message, 500);
    }
});

/**
 * 🛡️ AI 酒店审核风控接口 (管理端)
 * POST /api/ai/audit-hotel
 * Body: { hotel: { name, city, address, price, star, tags, description } }
 */
router.post('/audit-hotel', async (req, res) => {
    try {
        const { hotel } = req.body;
        if (!hotel || !hotel.name) return fail(res, 'Hotel data is required', 400);

        console.log(`🛡️ 酒店审核请求: "${hotel.name}"`);
        
        const auditResult = await GLMService.auditHotel(hotel);
        
        success(res, {
            hotelName: hotel.name,
            audit: auditResult
        });
    } catch (error) {
        console.error('❌ Audit Hotel Error:', error);
        fail(res, error.message, 500);
    }
});

module.exports = router;
