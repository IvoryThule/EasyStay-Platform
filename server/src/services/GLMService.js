const axios = require('axios');

const GLM_API_KEY = process.env.GLM_API_KEY;

/**
 * 调用智谱 AI (GLM-4) 生成文本
 * 文档: https://open.bigmodel.cn/dev/api#glm-4
 */
const generateText = async (prompt) => {
    if (!GLM_API_KEY) {
        throw new Error('GLM_API_KEY not configured');
    }

    try {
        const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
        
        console.log(`🤖 调用 GLM AI... Prompt: "${prompt.substring(0, 50)}..."`);

        // 构造请求体
        // 用户指定想要最好的模型，这里使用 glm-4-plus (GLM-4 增强版)
        const data = {
            model: "glm-4.7", 
            messages: [
                { role: "user", content: prompt }
            ],
            stream: false
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GLM_API_KEY}`
            },
            timeout: 60000 // 60s 超时 (大模型有时候很慢)
        });

        // 解析返回结果
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const content = response.data.choices[0].message.content;
            console.log(`✅ GLM AI 响应成功 (长度: ${content.length})`);
            return content;
        } else {
            console.error('❌ GLM Response Error:', JSON.stringify(response.data));
            return 'AI 暂时无法回答，请稍后再试。';
        }

    } catch (error) {
        console.error('❌ GLM Service Exception:', error.response ? JSON.stringify(error.response.data) : error.message);
        throw error;
    }
};

module.exports = {
    generateText
};
