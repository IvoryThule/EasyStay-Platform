require('dotenv').config();
const AgentService = require('./src/services/agentService');
const { sequelize } = require('./src/models');

async function test() {
  console.log("启动 Agent 测试...");
  try {
    const start = Date.now();
    const res = await AgentService.chat("帮我找上海的酒店，我想要带无边泳池的，或者能看到外滩的，预算不限。");
    const end = Date.now();
    
    console.log("===============================");
    console.log(`⏱️ 耗时: ${(end - start)/1000}s`);
    console.log("👉 回复:", res.output);
    console.log("👉 工具调用记录:", JSON.stringify(res.intermediateSteps, null, 2));
    console.log("===============================");
  } catch (err) {
    console.error("测试出错:", err);
  } finally {
    // 强制关闭 Sequelize 连接，以便进程退出
    await sequelize.close();
  }
}

test();
