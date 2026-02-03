// [逻辑] 登录注册逻辑
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { success, fail } = require('../utils/response');

// 注册
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return fail(res, 'User already exists', 409);
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user'
    });

    // 生成 Token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET || 'easystay_secret',
      { expiresIn: '24h' }
    );

    success(res, { token, user: { id: newUser.id, username: newUser.username, role: newUser.role } }, 'Register successful');
  } catch (error) {
    console.error('Register error:', error);
    fail(res, 'Server error during registration', 500);
  }
};

// 登录
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return fail(res, 'Invalid username or password', 401);
    }

    // 验证密码
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return fail(res, 'Invalid username or password', 401);
    }

    // 生成 Token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'easystay_secret',
      { expiresIn: '24h' }
    );

    success(res, { token, user: { id: user.id, username: user.username, role: user.role } }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    fail(res, 'Server error during login', 500);
  }
};

module.exports = {
  register,
  login
};
