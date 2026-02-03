// [工具] 常量定义 (如: API_BASE_URL)
// API 基础配置
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER_INFO: 'user_info'
};

// 路由路径
export const ROUTE_PATHS = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  HOTEL_AUDIT: '/hotel-audit',
  HOTEL_EDIT: '/hotel-edit',
  REGISTER: '/register'
};
