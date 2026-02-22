// [工具] 常量定义 (如: API_BASE_URL)
// API 基础配置
// 优先使用环境变量，如果没有则判断当前环境是否为生产环境，生产环境使用相对路径 /api，开发环境使用 http://localhost:3000/api
const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000/api');
const isLocalhost = typeof window !== 'undefined'
  ? ['localhost', '127.0.0.1'].includes(window.location.hostname)
  : false;
export const API_BASE_URL = (!isLocalhost && RAW_API_BASE_URL.includes('localhost'))
  ? '/api'
  : RAW_API_BASE_URL;

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER_INFO: 'user_info'
};

// 路由路径
export const ROUTE_PATHS = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  REVENUE_STATS: '/revenue-stats',
  PROFILE_CENTER: '/profile-center',
  SYSTEM_SETTINGS: '/system-settings',
  HOTEL_AUDIT: '/hotel-audit',
  HOTEL_EDIT: '/hotel-edit',
  HOTEL_STATUS: '/hotel/status', // 商家查看列表
  REGISTER: '/register'
};
