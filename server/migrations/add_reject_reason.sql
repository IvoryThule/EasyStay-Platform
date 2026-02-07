-- 为 Hotels 表添加 reject_reason 字段
-- 执行前请确保已连接到 easystay 数据库

USE easystay;

-- 添加 reject_reason 字段
ALTER TABLE Hotels 
ADD COLUMN reject_reason TEXT NULL COMMENT '驳回原因，仅status=2时有值'
AFTER status;

-- 验证字段是否添加成功
DESCRIBE Hotels;

-- 查看现有酒店数据
SELECT id, name, status, reject_reason FROM Hotels;
