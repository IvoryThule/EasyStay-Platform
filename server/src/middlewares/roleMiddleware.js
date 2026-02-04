// [鉴权] 检查 req.user.role 是否为 admin/merchant
const { fail } = require('../utils/response');

/**
 * 角色检查中间件
 * @param {string|string[]} roles - 允许的角色，可以是单个字符串或数组
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    // 确保已经经过 authMiddleware 鉴权
    if (!req.user) {
      return fail(res, 'Unauthorized: User authentication required', 401);
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return fail(res, `Forbidden: Requires role [${allowedRoles.join(', ')}]`, 403);
    }

    next();
  };
};

module.exports = requireRole;
