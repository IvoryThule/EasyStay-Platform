﻿// [API] /api/hotel (CRUD, list, detail)
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

// 商户/管理员删除(下架)酒店
router.post('/delete', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), 
  hotelController.deleteHotel
);

// 管理员恢复(上线)酒店
router.post('/restore', 
  authMiddleware, 
  requireRole(['admin']), 
  hotelController.restoreHotel
);

// === 房型管理 ===


// 获取酒店的房型列表 (公开)
router.get('/roomtype/list', hotelController.getRoomTypeList);

// 获取房型详情 (公开)
router.get('/roomtype/detail/:id', hotelController.getRoomTypeDetail);


router.post('/roomtype/add', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), 
  hotelController.addRoomType
);

router.post('/roomtype/update', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), 
  hotelController.updateRoomType
);

router.post('/roomtype/delete', 
  authMiddleware, 
  requireRole(['merchant', 'admin']), 
  hotelController.deleteRoomType
);


module.exports = router;

