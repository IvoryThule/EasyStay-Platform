# 数据库设计文档

## 表结构设计

### users 表 (用户)
- `id`: INT (PK)
- `username`: VARCHAR (唯一, 手机号/邮箱)
- `password`: VARCHAR (Bcrypted)
- `role`: ENUM('user', 'merchant', 'admin') (默认: user)
- `avatar`: VARCHAR (默认: 饿了么CDN图片)
- `created_at`: DATETIME
- `updated_at`: DATETIME

### hotels 表 (酒店核心)
- `id`: INT (PK)
- `name`: VARCHAR
- `address`: VARCHAR
- `city`: VARCHAR (用于定位匹配)
- `price`: DECIMAL (最低起步价)
- `star`: INT (1-5)
- `tags`: JSON (标签数组, 支持: 1)普通标签字符串 2)EN:英文名 3)OPENING:开业日期 4)IMAGES:多图数组JSON 5)ROOMDATA:房型数据)
- `cover_image`: VARCHAR (封面图)
- `images`: JSON (酒店相册多图 URL 数组)
- `status`: INT (0:审核中, 1:已发布, 2:驳回, 3:下线)
- `reject_reason`: TEXT (仅 status=2 时有值)
- `merchant_id`: INT (FK -> users.id)
- `latitude`: DOUBLE
- `longitude`: DOUBLE
- `created_at`: DATETIME
- `updated_at`: DATETIME

### room_types 表 (房型与价格)
- `id`: INT (PK)
- `hotel_id`: INT (FK -> hotels.id)
- `name`: VARCHAR
- `price`: DECIMAL
- `stock`: INT (默认: 10)
- `image`: VARCHAR (房型图)
- `created_at`: DATETIME
- `updated_at`: DATETIME

### orders 表 (订单)
- `id`: INT (PK)
- `user_id`: INT (FK -> users.id)
- `hotel_id`: INT (FK -> hotels.id)
- `room_type_id`: INT (FK -> room_types.id)
- `check_in`: DATEONLY
- `check_out`: DATEONLY
- `status`: INT (0:待支付, 1:已预订, 2:已取消)
- `created_at`: DATETIME
- `updated_at`: DATETIME

