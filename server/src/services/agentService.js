const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { HumanMessage, AIMessage, ToolMessage } = require("@langchain/core/messages");
const { hotelSearchTool } = require("./tools");

class AgentService {
  constructor() {
    this.model = null;
    this.modelWithTools = null;

    // 2. 注入工具集
    this.tools = [hotelSearchTool];

    // 3. 构建最核心的 ReAct 脑回 Prompt
    this.prompt = ChatPromptTemplate.fromMessages([
      ["system", `你是一个专业的旅行与酒店预订私人助理，名叫 EasyStay Agent。
      
      【你的核心行为准则】
      1. **严格区分意图**：
         - 当且仅当用户要“找酒店”、“查询具体房价”、“想要预订”时，**必须调用 search_hotels 工具** 查询真实数据。
         - 如果用户问的是“游玩路线”、“景点推荐”、“当地美食”、“旅游攻略”，直接运用自然常识输出有价值的攻略，不再强行查酒店。
         
      2. **拒绝幻觉 (CRITICAL)**：
         - 当你调用了 search_hotels 工具后，如果结果明确返回“未找到符合条件的酒店”，你**必须如实告诉用户**，可以给出调整建议。
         - **绝对禁止** 忽视工具结果并自行编造、虚构任何哪怕是现实中实际存在的酒店！系统内没有就是没有。
         
      3. **成为有灵魂的向导**：
         - 当拿到酒店推荐数据后，挑选酒店的真正亮点（如外滩视野、无边泳池等）加以拟人化的说明。
         - 如果房价悬殊，应当分别说明适合不同预算的人群，而不是千篇一律的废话。
         - **输出务必精炼，控制在 100-150 字以内，手机屏幕很小，拒绝长篇大论。**
         
      4. **智能追问补全信息**：
         - 如果只有“我要订房”没有地址，请礼貌追问。
         
      5. **状态识别与上下文回述**：
         - 当用户问起过往聊天内容时，请基于历史记忆妥善回答。
         
      当前系统时间：{current_time}
      `],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"]
    ]);
  }

  // 延迟初始化模型，确保 .env 已被正确加载
  initModel() {
    if (!this.model) {
      if (!process.env.GLM_API_KEY) {
        console.warn('⚠️ 警告: GLM_API_KEY 环境变量未设置！请检查 .env 文件。');
      }
      this.model = new ChatOpenAI({
        modelName: "glm-4.7", // 强制满足您的特殊模型要求配置
        apiKey: process.env.GLM_API_KEY || "YOUR_API_KEY_MISSING", // 兼容最新 langchain 版本
        configuration: {
          baseURL: "https://open.bigmodel.cn/api/paas/v4/" 
        },
        temperature: 0.6, 
      });
      this.modelWithTools = this.model.bindTools(this.tools);
    }
  }

  /**
   * 无状态聊天接口，历史由请求端传入以适配高并发场景
   */
  async chat(message, history = []) {
    this.initModel();

    console.log(`🤖 Agent 收到消息: ${message}`);
    
    // 5. history token limit
    const recentHistory = history.slice(-10);

    // 装配历史消息列表
    const chatHistory = recentHistory.map(msg => {
        const text = msg.content || msg.reply || msg.message || "";
        if (msg.role === 'user') return new HumanMessage(text);
        return new AIMessage(text);
    });

    const intermediateSteps = [];

    try {
        // 第一步：初级意图识别 (独立轻量级调用，满足用户的纯粹意图分析需求)
        console.log("🧠 正在进行初级意图识别...");
        const intentPrompt = ChatPromptTemplate.fromMessages([
            ["system", `你是一个专业的旅行管家意图分析引擎。当前用户输入了一句话，请你仅根据这句话分析用户的真实意图。
请返回严格的 JSON 格式，包含两个字段：
1. "intent": 必须是以下之一: ["hotel_search" (找酒店/订房), "chitchat" (闲聊/打招呼), "order_query" (查订单), "guide" (旅游攻略/问路), "other" (其他)]
2. "explanation": 分析理由（限20字以内）
不要输出任何 markdown 标记，直接输出 JSON 文本。`],
            ["human", "{input}"]
        ]);
        const intentResponse = await this.model.invoke(await intentPrompt.formatMessages({ input: message }));
        
        let recognizedIntent = "other";
        try {
            const parsedIntent = JSON.parse(intentResponse.content.trim().replace(/^```json|```$/g, ''));
            recognizedIntent = parsedIntent.intent;
            // 将意图识别的过程也展示给前端
            intermediateSteps.push({
                action: { tool: "intent_analyzer", toolInput: { text: message }, log: "正在分析用户的真实意图" },
                observation: `识别结果: ${parsedIntent.intent} \\n分析理由: ${parsedIntent.explanation}`
            });
            console.log(`🧠 意图分析完成: ${parsedIntent.intent} - ${parsedIntent.explanation}`);
        } catch (e) {
            console.warn("⚠️ 意图识别解析失败降级:", intentResponse.content);
        }

        // 第二步：根据意图决定是否需要绑定工具（优化 Token 和性能）
        let activeModel = this.modelWithTools;
        if (recognizedIntent === "chitchat" || recognizedIntent === "guide" || recognizedIntent === "other") {
            // 如果明确不需要发请求查酒店，直接摘掉 Tools 避免幻觉调用
            activeModel = this.model; 
            console.log(`⚡ 意图为 ${recognizedIntent}，直接使用基础模型作答，跳过工具绑定节省响应时间。`);
        } else if (recognizedIntent === "order_query") {
            // 订单查询意图的特殊拦截
            return {
                output: "很抱歉，我目前还没有接入订单查询系统，无法帮您查看历史订单，您可以前往 App 的【我的订单】页面查看。",
                intermediateSteps
            };
        }

        const messages = await this.prompt.formatMessages({
            input: message,
            chat_history: chatHistory,
            current_time: new Date().toLocaleString()
        });

        let currentMessages = [...messages];
        const MAX_ITERATIONS = 3;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            // Invoke the model with the current conversation history + intermediate steps
            const response = await activeModel.invoke(currentMessages);
            currentMessages.push(response);

            // If no tool calls, it means the model has finished its thought process
            if (!response.tool_calls || response.tool_calls.length === 0) {
                return {
                    output: response.content,
                    intermediateSteps
                };
            }

            // Execute all tools requested by the model in this run
            for (const toolCall of response.tool_calls) {
                const tool = this.tools.find(t => t.name === toolCall.name);
                let toolResponse = "工具调用失败 (未找到匹配的工具)";

                if (tool) {
                    try {
                        console.log(`🔨 执行工具 [${toolCall.name}] 参数:`, toolCall.args);
                        toolResponse = await Promise.race([
                            tool.invoke(toolCall.args),
                            new Promise((_, reject) => setTimeout(() => reject(new Error('工具执行超时 (5s)')), 5000))
                        ]);
                    } catch (error) {
                        console.error(`❌ 工具 [${toolCall.name}] 执行错误:`, error);
                        toolResponse = `执行失败: ${error.message}`;
                    }
                }

                const toolMessageContent = typeof toolResponse === 'string' 
                    ? toolResponse 
                    : JSON.stringify(toolResponse);

                currentMessages.push(new ToolMessage({
                    tool_call_id: toolCall.id,
                    name: toolCall.name,
                    content: toolMessageContent
                }));

                intermediateSteps.push({
                    action: { 
                        tool: toolCall.name, 
                        toolInput: toolCall.args, 
                        log: "工具调用请求已触发" 
                    },
                    observation: toolResponse
                });
            }
        }

        // If it exits the loop, iteration limit reached
        return {
            output: "抱歉，由于任务过于复杂，我无法在此刻得出最终结果，请缩小搜索范围后再试。",
            intermediateSteps
        };
    } catch (error) {
        console.error("❌ Agent Engine Error:", error);
        return {
            output: "抱歉，我的系统似乎遇到了一点小麻烦，请稍后再试。",
            intermediateSteps: []
        };
    }
  }
}

module.exports = new AgentService();
