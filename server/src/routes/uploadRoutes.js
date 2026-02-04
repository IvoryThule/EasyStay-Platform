// [API] /api/upload (图片上传)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { success, fail } = require('../utils/response');
const authMiddleware = require('../middlewares/authMiddleware');

// 配置 Multer 存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 确保 uploads 目录存在 (在 init 阶段或 update.sh 中创建)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名: uuid + 原始后缀
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif)!'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 限制
  fileFilter: fileFilter
});

/**
 * 单图上传接口
 * POST /api/upload
 * Content-Type: multipart/form-data
 * Field: image
 */
router.post('/', authMiddleware, (req, res) => {
  const uploadSingle = upload.single('image');

  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return fail(res, `Upload error: ${err.message}`, 400);
    } else if (err) {
      // An unknown error occurred when uploading.
      return fail(res, err.message, 400);
    }

    if (!req.file) {
      return fail(res, 'No file uploaded', 400);
    }

    // 返回相对路径或完整 URL
    // 这里返回相对路径，由前端拼接域名，或者配置 static 目录直接访问
    // nginx 配置了 /uploads/ -> server/uploads/
    const fileUrl = `/uploads/${req.file.filename}`;
    
    success(res, { 
      url: fileUrl,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size
    }, 'Upload successful');
  });
});

module.exports = router;

