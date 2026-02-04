// [API] /api/hotel (CRUD, list, detail)
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/roleMiddleware');

// 公开接口 (可选配 authMiddleware 来识别当前用户身份，用于权限判断)
router.get('/list', 
  (req, res, next) => {
    // 尝试获取用户身份，但如果没 token 也不报错 (list 内部处理了 guest)
    if (req.headers.authorization) {
        return authMiddleware(req, res, next);
    }
    next();
  }, 
  hotelController.list
);

router.get('/detail/:id', 
  (req, res, next) => {
    if (req.headers.authorization) {
        return authMiddleware(req, res, next);
    }
    next();
  }, 
  hotelController.getDetail
);

// 受保护接口

// 商户创建酒店
router.post('/create', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), // 允许商户或管理员创建
  hotelController.create
);

// 商户/管理员更新酒店
router.post('/update', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), 
  hotelController.update
);

module.exports = router;
