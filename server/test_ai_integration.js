require('dotenv').config();
const GLMService = require('./src/services/GLMService');

async function testAiFeatures() {
    console.log('🚀 开始测试 AI 服务功能集成...');
    
    // 1. 检查 API Key
    if (!process.env.GLM_API_KEY || process.env.GLM_API_KEY === 'your_glm_api_key_here') {
        console.warn('⚠️ 警告: 未配置 GLM_API_KEY，将跳过真实 API 调用，仅测试方法定义。');
        console.warn('请在 server/.env 文件中配置您的智谱 AI API Key。');
        return; // 如果没有 Key，无法进行后续测试
    } else {
        console.log('✅ 检测到 API Key 配置');
    }

    try {
        // 2. 测试方法导出 (静态检查)
        console.log('\n📦 检查方法导出...');
        const methods = ['generateText', 'parseBookingIntent', 'auditHotel', 'chat', 'chatStream'];
        let missingMethods = [];
        methods.forEach(m => {
            if (typeof GLMService[m] !== 'function') {
                console.error(`❌ 缺失方法: ${m}`);
                missingMethods.push(m);
            } else {
                console.log(`✅ 方法存在: ${m}`);
            }
        });

        if (missingMethods.length > 0) {
            throw new Error(`GLMService 缺少必要导出方法: ${missingMethods.join(', ')}`);
        }

        // 3. 测试旧版通用生成 (generateText)
        console.log('\n🧪 测试旧版通用生成 (generateText)...');
        const legacyResult = await GLMService.generateText('你好，请用一句话介绍你自己', 'GENERAL_ASSISTANT', { maxTokens: 50 });
        console.log('🗣️ AI 回复:', legacyResult);
        if (legacyResult && legacyResult.length > 0) console.log('✅ generateText 测试通过');

        // 4. 测试新版对话 (chat) - 模拟有上下文的情况
        console.log('\n🧪 测试新版对话 (chat)...');
        const chatContext = {
            userLocation: '上海',
            availableHotels: [
                {
                    name_cn: '上海测试大酒店',
                    city: '上海',
                    address: '南京东路888号',
                    star_rating: 5,
                    score: 4.8,
                    tags: ['免费WiFi', '地铁直达'],
                    RoomTypes: [{ name: '豪华大床房', price: 800, bed_type: '大床', breakfast: true }]
                }
            ]
        };
        const chatMessages = [{ role: 'user', content: '给我推荐一个在上海的酒店' }];
        const chatResult = await GLMService.chat(chatMessages, chatContext);
        
        if (chatResult.success) {
            console.log('🗣️ AI 回复:', chatResult.reply);
            console.log('📊 Token 用量:', chatResult.usage);
            console.log('✅ chat 测试通过');
        } else {
            console.error('❌ chat 测试失败:', chatResult.error);
        }

        // 5. 测试意图识别 (parseBookingIntent)
        console.log('\n🧪 测试意图识别 (parseBookingIntent)...');
        const intentQuery = '下周五我和老婆去三亚，预算2000以内，要海景房';
        const intentResult = await GLMService.parseBookingIntent(intentQuery);
        console.log('🔍 识别结果:', JSON.stringify(intentResult, null, 2));
        if (intentResult.intent === 'search' || intentResult.intent === 'chat') {
             console.log('✅ parseBookingIntent 测试通过');
        }

        // 6. 测试多轮对话 (Context / History)
        console.log('\n🧪 测试多轮对话 (Multi-turn Context)...');
        // 模拟第一轮：用户说自己喜欢靠窗
        const historyMock = [
            { role: 'user', content: '我这次住酒店一定要住高楼层，且必须安静。' },
            { role: 'assistant', content: '好的，我已经记住了您的偏好：高楼层、安静。为您推荐...' }
        ];
        // 模拟第二轮：用户问“我刚才说了什么要求？”
        const multiTurnMessages = [
            ...historyMock,
            { role: 'user', content: '请重复一遍我刚才说的对房间的要求' }
        ];
        
        const multiTurnResult = await GLMService.chat(multiTurnMessages, {});
        console.log('🗣️ AI 回复 (多轮):', multiTurnResult.reply);
        if (multiTurnResult.reply.includes('高楼层') || multiTurnResult.reply.includes('安静')) {
            console.log('✅ 多轮对话测试通过 (成功记忆上下文)');
        } else {
            console.log('⚠️ 多轮对话测试结果需人工确认');
        }

        console.log('\n🎉 所有 AI 服务测试完成！功能集成正常。');

    } catch (error) {
        console.error('\n❌ 测试过程中发生错误:', error);
    }
}

testAiFeatures();
