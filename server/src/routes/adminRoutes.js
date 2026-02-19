// [API] /api/admin (管理员专用接口)
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

// 经营看板数据 (商户和管理员都可访问)
router.get('/dashboard', authMiddleware, requireRole(['admin', 'merchant']), adminController.getDashboard);

// 所有其他管理员接口都需要鉴权 + admin 角色
router.use(authMiddleware, requireRole(['admin']));

// 审核酒店
router.post('/hotel/audit', adminController.auditHotel);

// 获取待审核酒店列表 (含房型信息)
router.get('/hotel/pending', adminController.getPendingHotels);

// 获取被驳回的酒店列表
router.get('/hotel/rejected', adminController.getRejectedHotels);

// 平台统计数据
router.get('/stats', adminController.getStats);

module.exports = router;
