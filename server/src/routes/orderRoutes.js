const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// 所有订单接口都需要登录
router.use(authMiddleware);

// 创建订单
router.post('/create', orderController.createOrder);

// 订单列表
router.get('/list', orderController.getUserOrders);

// 订单详情
router.get('/detail/:orderId', orderController.getOrderDetail);

// 取消订单
router.post('/cancel', orderController.cancelOrder);

// 支付订单 (模拟)
router.post('/pay', orderController.payOrder);

module.exports = router;
