import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easystay.app',
  appName: 'EasyStay',
  webDir: 'dist',
  server: {
    "androidScheme": "http",
    "cleartext": true
  },
  plugins: {
    CapacitorHttp: {
      // 禁用: CapacitorHttp 会劫持 window.fetch，替换为不支持
      // ReadableStream 流式响应的原生 HTTP 实现，导致 AI 聊天的
      // SSE 流式接口无法正常工作。服务器已配置 CORS origin: '*'，
      // 禁用后不影响正常 API 请求。
      enabled: false,
    }
  }
};

export default config;
