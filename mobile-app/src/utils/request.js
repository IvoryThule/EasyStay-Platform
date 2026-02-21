// [工具] Taro.request 封装
import Taro from '@tarojs/taro';

// 统一服务器地址
// 使用环境变量定义 BASE_URL
const BASE_URL = process.env.TARO_APP_API_BASE_URL || 'http://1.14.207.212:8848/api';
console.log('[API_BASE_URL]', BASE_URL);

// 如果环境变量中没有包含 /api 且原 BASE_URL 也不包含，需要注意路径拼接问题
// 这里假设环境变量配置正确，或者在代码中处理 /api

const request = (options) => {
  const { url, method = 'GET', data } = options;
  const token = Taro.getStorageSync('token');
  
  // 动态构建 Header，避免 GET 请求带 Content-Type 触发预检
  const header = {};
  if (method.toUpperCase() !== 'GET') {
    header['Content-Type'] = 'application/json';
  }
  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return Taro.request({
    url: `${BASE_URL}${url}`, // 拼接完整地址
    method,
    data,
    header
  }).then(res => {
    const { statusCode, data: resData } = res;
    // 增加对 200 以外状态码的判断
    if (statusCode >= 200 && statusCode < 300) {
      return resData; 
    } else {
      // 如果后端 500 了，这里会触发
      const errorMsg = (resData && resData.msg) ? resData.msg : `服务器错误: ${statusCode}`;
      Taro.showToast({ 
        title: errorMsg, 
        icon: 'none' 
      });
      return Promise.reject(resData || { msg: '未知错误' });
    }
  }).catch(err => {
    // 【修复点】确保错误对象存在 msg 属性，防止详情页读取 msg 报错
    const message = err?.msg || err?.errMsg || '网络请求异常';
    console.error('详情请求异常:', message);
    throw { msg: message };
  });
};

export default request;