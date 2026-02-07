// [API] /api/upload (图片上传)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { success, fail } = require('../utils/response');
const authMiddleware = require('../middlewares/authMiddleware');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 Multer 存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // 生成唯一文件名: timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
    // 只允许图片
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: fileFilter
});

/**
 * 图片上传接口
 * POST /api/upload
 * Content-Type: multipart/form-data
 * field: "file"
 */
router.post('/', authMiddleware, (req, res) => {
    // upload.single('file') 处理单个文件
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer 错误 (如文件过大)
            return fail(res, err.message, 400);
        } else if (err) {
            // 其他错误 (如文件类型不对)
            return fail(res, err.message, 400);
        }

        if (!req.file) {
            return fail(res, 'No file uploaded', 400);
        }

        // 返回文件的访问 URL
        // 注意：生产环境需要配置 Nginx 代理 /uploads 路径
        // 或者在 Express 中配置静态资源托管 app.use('/uploads', express.static(...))
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

