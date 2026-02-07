const express = require('express');
const router = express.Router();
const GLMService = require('../services/GLMService');
const { success, fail } = require('../utils/response');

/**
 * AI 问答接口
 * POST /api/ai/chat
 * Body: { prompt: "帮我写一个上海五星级酒店的介绍" }
 */
router.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return fail(res, 'Prompt is required', 400);

        const result = await GLMService.generateText(prompt);
        success(res, { content: result });
    } catch (error) {
        fail(res, error.message, 500);
    }
});

module.exports = router;
