// [工具] Taro.request 封装
// 待实现。
import Taro from '@tarojs/taro';

// 统一服务器地址
// 注意：如果是在手机真机或服务器部署后通过公网访问，请使用服务器真实 IP 或域名
// H5 环境推荐使用相对路径 '/api' 以利用 Nginx 反向代理
// 小程序环境必须使用完整 HTTPS 域名
const BASE_URL = process.env.TARO_ENV === 'h5' ? '/api' : 'http://1.14.207.212:8848/api'; 
//const BASE_URL = 'http://localhost:3000/api';

const request = (options) => {
  const { url, method = 'GET', data } = options;
  const token = Taro.getStorageSync('token');

  return Taro.request({
    url: `${BASE_URL}${url}`, // 拼接完整地址
    method,
    data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
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