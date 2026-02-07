const axios = require('axios');

class AiChatService {
  constructor() {
    this.apiKey = process.env.GLM_API_KEY
    this.apiUrl = process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
    this.model = process.env.GLM_MODEL || 'glm-4-flash'
    
    // 初始化系统提示词配置
    this.SYSTEM_PROMPTS = {
      // ... 原有 SYSTEM_PROMPTS 的内容
      BOOKING_DECISION_ENGINE: `你是 EasyStay 智慧酒店预订平台的「订房决策引擎」，专注于将用户的自然语言需求转化为精准的酒店搜索条件。

## 核心能力
1. **意图理解**：深度解析用户出行目的（商务/度假/亲子/情侣/出差）
2. **约束提取**：识别预算、日期、位置、设施等硬性需求
3. **偏好推断**：从隐含表达中推断用户偏好（如"安静"→远离马路、高楼层）
4. **结构化输出**：生成可直接调用搜索 API 的 JSON 参数

## 输出格式要求
当用户描述订房需求时，请输出以下 JSON 结构（仅输出 JSON，不要其他文字）：
\`\`\`json
{
  "intent": "search",
  "params": {
    "city": "城市名",
    "checkInDate": "YYYY-MM-DD",
    "checkOutDate": "YYYY-MM-DD", 
    "minPrice": 数字或null,
    "maxPrice": 数字或null,
    "star": 星级数字或null,
    "keywords": ["关键词数组"],
    "tags": ["标签数组，如：亲子、商务、江景、安静、近地铁"],
    "sort": "推荐排序方式：rating_desc/price_asc/price_desc/distance_asc"
  },
  "reasoning": "简短解释你的理解和推荐理由"
}
\`\`\`

## 处理规则
- 日期模糊时（如"周末"、"下周"），根据当前日期推算具体日期
- 预算模糊时（如"便宜点"→maxPrice:300，"不差钱"→minPrice:800）
- 位置模糊时，提取地标关键词放入 keywords
- 如果信息不足，在 reasoning 中说明需要补充什么

## 示例
用户："我和女朋友下周末想去杭州，预算600左右，要安静点能看到江"
输出：
\`\`\`json
{
  "intent": "search",
  "params": {
    "city": "杭州",
    "checkInDate": "2026-02-14",
    "checkOutDate": "2026-02-16",
    "minPrice": null,
    "maxPrice": 600,
    "star": null,
    "keywords": [],
    "tags": ["江景", "安静", "情侣"],
    "sort": "rating_desc"
  },
  "reasoning": "情侣周末出游，预算适中，优先推荐评分高的江景房，安静环境适合二人世界"
}
\`\`\``,
      HOTEL_AUDIT_ASSISTANT: `你是 EasyStay 平台的「酒店审核风控助手」，负责对商户提交的酒店信息进行智能预审。

## 审核维度
1. **内容合规**：检查描述是否涉及违规内容（虚假宣传、诱导性用语、敏感词）
2. **价格合理性**：分析价格是否与城市/星级/位置匹配
3. **信息完整度**：评估必要字段是否齐全
4. **风险信号识别**：发现异常模式（如过低价格、夸大描述）

## 输出格式
\`\`\`json
{
  "riskScore": 0.0-1.0之间的风险评分,
  "riskLevel": "low/medium/high",
  "issues": [
    {
      "type": "问题类型：price_abnormal/content_violation/info_incomplete/suspicious_pattern",
      "severity": "low/medium/high",
      "description": "具体问题描述",
      "suggestion": "整改建议"
    }
  ],
  "summary": "整体审核结论",
  "recommendation": "pass/review/reject 建议操作"
}
\`\`\`

## 审核参考标准
- 经济型(1-2星)：100-300元/晚
- 舒适型(3星)：200-500元/晚  
- 高档型(4星)：400-1000元/晚
- 豪华型(5星)：800元以上/晚
- 价格偏离同城市同星级均价 40% 以上需标记`,
      GENERAL_ASSISTANT: `你是 EasyStay 智慧酒店预订平台的 AI 助手「易小住」。

## 平台介绍
EasyStay 是一个连接酒店商家与消费者的智能预订平台，提供：
- 🏨 海量优质酒店资源（覆盖全国主要城市）
- 🔍 智能搜索与个性化推荐
- 📍 基于位置的周边酒店发现
- 💰 透明价格与真实评价
- 🎯 AI 驱动的订房决策支持

## 你的职责
1. 解答用户关于平台使用的问题
2. 提供酒店预订相关的一般性建议
3. 引导用户使用平台功能
4. 处理简单投诉和反馈收集

## 回复风格
- 友好专业，简洁明了
- 适时推荐平台功能
- 遇到具体订房需求时，引导用户使用智能搜索功能
- 回复控制在 200 字以内

## 注意事项
- 不提供具体酒店价格（价格实时变动）
- 不代替用户做最终预订决策
- 遇到投诉升级需求，引导联系人工客服`
    };
  }

  /**
   * 原 generateText 方法迁移
   * 调用智谱 AI (GLM-4) 生成文本
   * @param {string} prompt - 用户输入
   * @param {string} systemPromptKey - 系统提示词类型
   * @param {object} options - 额外选项
   */
  async generateText(prompt, systemPromptKey = 'GENERAL_ASSISTANT', options = {}) {
      if (!this.apiKey) {
          throw new Error('GLM_API_KEY not configured');
      }

      const systemPrompt = this.SYSTEM_PROMPTS[systemPromptKey] || this.SYSTEM_PROMPTS.GENERAL_ASSISTANT;

      try {
          console.log(`🤖 调用 GLM AI [${systemPromptKey}]... Prompt: "${prompt.substring(0, 50)}..."`);

          // 构造请求体，包含系统提示词
          const messages = [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt }
          ];

          // 如果有历史消息上下文，插入到 user 消息之前
          if (options.history && Array.isArray(options.history)) {
              messages.splice(1, 0, ...options.history);
          }

          const data = {
              model: options.model || this.model, 
              messages,
              stream: false,
              temperature: options.temperature || 0.7,
              max_tokens: options.maxTokens || 2000
          };

          const response = await axios.post(this.apiUrl, data, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.apiKey}`
              },
              timeout: 60000
          });

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
  }

  /**
   * 原 parseBookingIntent 方法迁移
   * 智能订房决策 - 将自然语言转为搜索参数
   * @param {string} userInput - 用户自然语言描述
   * @returns {object} 解析后的搜索参数对象
   */
  async parseBookingIntent(userInput) {
      // 注入当前日期，帮助模型推断 "下周"、"周末" 等模糊时间
      const today = new Date();
      const dateStr = today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
      const promptWithDate = `[当前系统时间: ${dateStr}]\n用户输入: "${userInput}"`;

      const result = await this.generateText(promptWithDate, 'BOOKING_DECISION_ENGINE', {
          temperature: 0.3  // 降低随机性，提高结构化输出稳定性
      });
      
      // 尝试从返回中提取 JSON
      try {
          // 处理可能被 markdown 代码块包裹的情况
          const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/) || result.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
              const jsonStr = jsonMatch[1] || jsonMatch[0];
              return JSON.parse(jsonStr);
          }
      } catch (e) {
          console.error('❌ 解析 AI 返回的 JSON 失败:', e.message);
      }
      
      // 解析失败，返回原始文本
      return { intent: 'chat', rawResponse: result };
  }

  /**
   * 原 auditHotel 方法迁移
   * 酒店审核风控评估
   * @param {object} hotelData - 酒店数据对象
   * @returns {object} 风控评估结果
   */
  async auditHotel(hotelData) {
      const prompt = `请对以下酒店信息进行审核评估：

酒店名称：${hotelData.name}
城市：${hotelData.city}
地址：${hotelData.address}
价格：${hotelData.price} 元/晚
星级：${hotelData.star} 星
标签：${JSON.stringify(hotelData.tags || [])}
描述：${hotelData.description || '无'}
`;

      const result = await this.generateText(prompt, 'HOTEL_AUDIT_ASSISTANT', {
          temperature: 0.2
      });
      
      try {
          const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/) || result.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
              const jsonStr = jsonMatch[1] || jsonMatch[0];
              return JSON.parse(jsonStr);
          }
      } catch (e) {
          console.error('❌ 解析审核结果 JSON 失败:', e.message);
      }
      
      return { rawResponse: result };
  }

  // ...existing code...
  


  /**
   * 构建酒店领域的系统提示词
   * 这是最核心的部分 - 告诉大模型它是谁、能做什么、数据格式是什么
   */
  buildSystemPrompt(context = {}) {
    const { availableHotels, userLocation, checkInDate, checkOutDate } = context
    
    // 使用类内部的 Prompt 模板作为基础
    let systemPrompt = `
${this.SYSTEM_PROMPTS.GENERAL_ASSISTANT}

# 扩展能力：实时数据查询
除了以上职责，你现在拥有具体的业务数据上下文，请结合以下信息回答用户：

# 数据格式说明
酒店数据包含以下维度：
- 酒店名称（中/英文）
- 地址、城市
- 星级（1-5星）
- 房型列表（房型名称、面积、床型、价格、早餐情况）
- 设施标签（如：免费WiFi、停车场、游泳池、健身房、亲子设施等）
- 评分（0-5分）
- 开业时间
- 周边景点、交通、商圈信息
- 当前优惠活动`


    // 如果有真实的酒店数据，注入到提示词中
    if (availableHotels && availableHotels.length > 0) {
      systemPrompt += `\n\n# 当前可用酒店数据\n`
      systemPrompt += `以下是平台上当前已发布的酒店信息，请基于这些真实数据回答用户问题：\n\n`

      availableHotels.forEach((hotel, index) => {
        systemPrompt += `## 酒店${index + 1}: ${hotel.name_cn}\n`
        systemPrompt += `- 英文名: ${hotel.name_en || '无'}\n`
        systemPrompt += `- 城市: ${hotel.city}\n`
        systemPrompt += `- 地址: ${hotel.address}\n`
        systemPrompt += `- 星级: ${hotel.star_rating}星\n`
        systemPrompt += `- 评分: ${hotel.score || '暂无'}分\n`
        systemPrompt += `- 开业时间: ${hotel.opening_date || '未知'}\n`
        systemPrompt += `- 设施标签: ${hotel.tags ? (typeof hotel.tags === 'string' ? hotel.tags : JSON.stringify(hotel.tags)) : '无'}\n`

        if (hotel.roomTypes && hotel.roomTypes.length > 0) {
          systemPrompt += `- 房型列表:\n`
          hotel.roomTypes.forEach(room => {
            systemPrompt += `  · ${room.name} | ${room.area || '未知'}㎡ | ${room.bed_type || '未知'} | ¥${room.price}/晚 | ${room.breakfast ? '含早餐' : '不含早餐'}\n`
          })
        }

        if (hotel.nearby_attractions) {
          systemPrompt += `- 周边景点: ${hotel.nearby_attractions}\n`
        }
        if (hotel.nearby_transport) {
          systemPrompt += `- 交通: ${hotel.nearby_transport}\n`
        }
        if (hotel.discount_info) {
          systemPrompt += `- 优惠活动: ${hotel.discount_info}\n`
        }
        systemPrompt += '\n'
      })
    } else {
      systemPrompt += `\n\n# 注意\n当前没有加载到具体酒店数据，请根据用户问题给出通用的酒店预订建议，并引导用户使用平台的搜索功能查找酒店。`
    }

    // 注入当前时间 (关键：让 AI 有时间概念)
    const today = new Date();
    const dateStr = today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    systemPrompt += `\n# 当前系统时间: ${dateStr}`;

    // 注入用户上下文
    if (userLocation) {
      systemPrompt += `\n# 用户当前位置: ${userLocation}`
    }
    if (checkInDate) {
      systemPrompt += `\n# 用户计划入住日期: ${checkInDate}`
    }
    if (checkOutDate) {
      systemPrompt += `\n# 用户计划离店日期: ${checkOutDate}`
    }

    return systemPrompt
  }

  /**
   * 调用大模型 API
   * @param {Array} messages - 对话历史 [{role: 'user', content: '...'}, ...]
   * @param {Object} context - 上下文数据（酒店列表、用户位置等）
   */
  async chat(messages, context = {}) {
    try {
      const systemPrompt = this.buildSystemPrompt(context)

      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ]

      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: fullMessages,
          temperature: 0.7,      // 控制创造性，0.7比较平衡
          max_tokens: 1024,
          top_p: 0.9
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      )

      const reply = response.data.choices[0].message.content
      return {
        success: true,
        reply: reply,
        usage: response.data.usage  // token用量统计
      }
    } catch (error) {
      console.error('GLM API Error:', error.response?.data || error.message)
      return {
        success: false,
        reply: '抱歉，AI助手暂时无法响应，请稍后再试。',
        error: error.message
      }
    }
  }

  /**
   * 流式调用（用于打字机效果）
   */
  async chatStream(messages, context = {}, onChunk) {
    try {
      const systemPrompt = this.buildSystemPrompt(context)

      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ]

      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: true
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          responseType: 'stream',
          timeout: 60000
        }
      )

      let fullReply = ''

      return new Promise((resolve, reject) => {
        response.data.on('data', (chunk) => {
          const lines = chunk.toString().split('\n').filter(line => line.trim())
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                resolve({ success: true, reply: fullReply })
                return
              }
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content || ''
                if (content) {
                  fullReply += content
                  onChunk && onChunk(content) // 回调每个片段
                }
              } catch (e) {
                // 忽略解析错误
              }
            }
          }
        })

        response.data.on('error', reject)
      })
    } catch (error) {
      console.error('GLM Stream Error:', error.message)
      return { success: false, reply: '连接失败，请重试', error: error.message }
    }
  }
}

const aiChatService = new AiChatService();

module.exports = {
  // 保持原有接口兼容性，但内部调用实例方法
  generateText: (prompt, systemPromptKey, options) => aiChatService.generateText(prompt, systemPromptKey, options),
  parseBookingIntent: (userInput) => aiChatService.parseBookingIntent(userInput),
  auditHotel: (hotelData) => aiChatService.auditHotel(hotelData),
  SYSTEM_PROMPTS: aiChatService.SYSTEM_PROMPTS,

  // 新增接口
  chat: (messages, context) => aiChatService.chat(messages, context),
  chatStream: (messages, context, onChunk) => aiChatService.chatStream(messages, context, onChunk)
};
