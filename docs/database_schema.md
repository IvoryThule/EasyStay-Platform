# 数据库设计文档

## 表结构设计

### users 表 (用户)
- `id`: INT (PK)
- `username`: VARCHAR
- `password`: VARCHAR (加密存储)
- `role`: ENUM('user', 'merchant', 'admin')
- `avatar`: VARCHAR (头像)

### hotels 表 (酒店核心)
- `id`: INT (PK)
- `name`: VARCHAR
- `address`: VARCHAR
- `city`: VARCHAR
- `price`: DECIMAL
- `star`: INT (1-5)
- `tags`: JSON
- `cover_image`: VARCHAR
- `status`: INT (0:审核中, 1:已发布, 2:驳回, 3:下线)
- `merchant_id`: INT (FK)
- `latitude`: DOUBLE
- `longitude`: DOUBLE

### room_types 表 (房型与价格)
- `id`: INT (PK)
- `hotel_id`: INT (FK)
- `name`: VARCHAR
- `price`: DECIMAL
- `stock`: INT

### orders 表 (订单)
- `id`: INT (PK)
- `user_id`: INT (FK)
- `hotel_id`: INT (FK)
- `room_type_id`: INT (FK)
- `check_in`: DATE
- `check_out`: DATE
- `status`: INT (0:待支付, 1:已预订, 2:已取消)
