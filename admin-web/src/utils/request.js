// [工具] Axios 实例 (拦截器处理 Token 和统一错误)
import axios from 'axios';
import { message } from 'antd'; // 引入 Antd 消息组件
import { API_BASE_URL, STORAGE_KEYS, ROUTE_PATHS } from './constants';

// 1. 创建 axios 实例
const request = axios.create({
  baseURL: API_BASE_URL, // 引用 constants.js 中的配置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 2. 请求拦截器
// 作用：每次发送请求前，自动从 localStorage 读取 Token 并放入 Header
request.interceptors.request.use(
  (config) => {
    // 从 constants.js 定义的键名中获取 Token
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    // 如果 Token 存在，则添加到请求头 Authorization 中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器
// 作用：处理后端返回的数据结构，拦截 401 Token 失效
request.interceptors.response.use(
  (response) => {
    // 剥离 axios 外层封装，直接返回后端数据 (如 { success: true, data: ... })
    const res = response.data;
    return res;
  },
  (error) => {
    // 处理 HTTP 错误状态
    if (error.response) {
      const { status } = error.response;

      // 401 Unauthorized: Token 过期或无效
      if (status === 401) {
        // 清除本地存储的 Token 和用户信息
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);

        // 如果当前不在登录页，则强制跳转
        if (!window.location.pathname.includes(ROUTE_PATHS.LOGIN)) {
          message.error('登录状态已过期，请重新登录');
          window.location.href = ROUTE_PATHS.LOGIN;
        }
      }
    }
    
    // 将错误抛出，以便 Login.jsx 中的 catch 块可以捕获并提示具体错误信息
    return Promise.reject(error);
  }
);

export default request;