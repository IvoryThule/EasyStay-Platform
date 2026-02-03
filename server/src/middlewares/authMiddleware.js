// [鉴权] 解析 JWT Token，将 user 挂载到 req
const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  // 1. 获取 Token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return fail(res, 'No token provided (Bearer token required)', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. 验证 Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'easystay_secret');
    
    // 3. 将用户信息挂载到 req 对象上，供后续路由使用
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return fail(res, 'Token expired', 401);
    }
    return fail(res, 'Invalid token', 401);
  }
};

module.exports = authMiddleware;
