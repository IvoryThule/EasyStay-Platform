# API 接口文档

**Base URL**: `/api`
**Response Format**:
```json
{
  "code": 200,    // 200: Success, != 200: Error
  "msg": "success",
  "data": { ... }
}
```

## 1. 认证 (Auth)

### 1.1 注册
*   **URL**: `/auth/register`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "username": "hotel_boss", // 必填
      "password": "password123", // 必填
      "role": "merchant" // 可选: user (默认), merchant, admin
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Register successful",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsIn...",
        "user": { "id": 2, "username": "hotel_boss", "role": "merchant" }
      }
    }
    ```

### 1.2 登录
*   **URL**: `/auth/login`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "username": "hotel_boss",
      "password": "password123"
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Login successful",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsIn...",
        "user": { "id": 2, "username": "hotel_boss", "role": "merchant" }
      }
    }
    ```

## 2. 酒店 (Hotel)

### 2.1 创建酒店 (需鉴权 + 商户/管理员)
*   **URL**: `/hotel/create`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "name": "Hilton Shanghai",
      "address": "No. 123, Road ABC",
      "city": "Shanghai",
      "price": 800,
      "star": 5,
      "tags": ["WIFI", "Swimming Pool"], // 可选
      "cover_image": "/uploads/xxxx.jpg", // 可选，先调上传接口
      "latitude": 31.23, // 可选
      "longitude": 121.47 // 可选
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Hotel created successfully, awaiting audit.",
      "data": {
        "id": 1,
        "name": "Hilton Shanghai",
        "status": 0 // 0: 审核中
        // ...
      }
    }
    ```

### 2.2 酒店列表
*   **URL**: `/hotel/list`
*   **Method**: `GET`
*   **Query Params**:
    *   `page`: 页码 (默认 1)
    *   `limit`: 每页数量 (默认 10)
    *   `city`: 城市筛选
    *   `keyword`: 关键词搜索 (名称或地址)
    *   `star`: 星级
    *   `min_price`: 最低价
    *   `max_price`: 最高价
    *   `sort`: `price_asc` (价格升序) | `price_desc` (价格降序)
    *   `my_hotel`: `true` (仅商户可用，查看自己录入的酒店，含审核中)
    *   `status`: (仅管理员可用，筛选特定状态酒店)
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "success",
      "data": {
        "total": 5,
        "page": 1,
        "limit": 10,
        "list": [
          {
            "id": 1,
            "name": "Hilton Shanghai",
            "price": "800.00",
            "cover_image": "/uploads/xxxx.jpg",
            "status": 1
            // ...
          }
        ]
      }
    }
    ```

### 2.3 酒店详情
*   **URL**: `/hotel/detail/:id`
*   **Method**: `GET`
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "success",
      "data": {
        "id": 1,
        "name": "Hilton Shanghai",
        "roomTypes": [ // 关联的房型
          { "id": 101, "name": "Standard Room", "price": "800.00" }
        ]
        // ...
      }
    }
    ```

### 2.4 更新酒店 (商户/管理员)
*   **URL**: `/hotel/update`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "id": 1, // 必填
      "price": 999,
      "name": "Hilton Shanghai (New)"
    }
    ```
*   **Response**: 更新后的对象。注意：商户更新后状态会重置为 0 (审核中)。

### 2.5 删除酒店 (软删除)
*   **URL**: `/hotel/delete`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "id": 1
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Hotel deleted (offline) successfully",
      "data": null
    }
    ```

### 2.6 添加房型 (Add RoomType)
*   **URL**: `/hotel/roomtype/add`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "hotel_id": 1,
      "name": "豪华大床房",
      "price": 399,
      "stock": 10
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Room type added successfully",
      "data": { "id": 5, "hotel_id": 1, "name": "豪华大床房", ... }
    }
    ```

### 2.7 更新房型 (Update RoomType)
*   **URL**: `/hotel/roomtype/update`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "id": 5,
      "name": "豪华大床房 (含早)",
      "price": 420
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Room type updated successfully",
      "data": { ... }
    }
    ```

### 2.8 删除房型 (Delete RoomType)
*   **URL**: `/hotel/roomtype/delete`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "id": 5
    }
    ```
*   **Response**: 200 OK

## 3. 系统服务

#### 3.1 图片上传 (需要 Login)
*   **URL**: `/upload`
*   **Method**: `POST`
*   **Headers**: `Content-Type: multipart/form-data`, `Authorization: Bearer ...`
*   **Form Data**: `file` (Binary Image)
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Upload successful",
      "data": {
        "url": "/uploads/17000000-123.jpg",
        "filename": "17000000-123.jpg"
      }
    }
    ```

#### 3.2 IP 定位
*   **URL**: `/system/location`
*   **Method**: `GET`
*   **Query**: `ip` (可选，测试用)
*   **Response**:
    ```json
    {
      "code": 200,
      "data": {
        "province": "上海市",
        "city": "上海市",
        "adcode": "310000"
      }
    }
    ```

#### 3.3 AI 对话 (需 Login)
*   **URL**: `/ai/chat`
*   **Method**: `POST`
*   **Body**: `{"prompt": "帮我写一段关于外滩酒店的介绍"}`
*   **Response**:
    ```json
    {
      "code": 200,
      "data": {
        "content": "外滩酒店坐落于黄浦江畔..." // AI 生成的文本
      }
    }
    ```

## 4. 订单 (Order)

### 4.1 创建订单 (需 Login)
*   **URL**: `/order/create`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "hotel_id": 1,
      "room_type_id": 101,
      "check_in": "2026-02-14",
      "check_out": "2026-02-15"
    }
    ```
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Order created successfully",
      "data": {
        "orderId": 55
      }
    }
    ```

### 4.2 我的订单列表 (需 Login)
*   **URL**: `/order/list`
*   **Method**: `GET`
*   **Query**: `status` (可选: 0=待支付, 1=已预订, 2=已取消)
*   **Response**:
    ```json
    {
      "code": 200,
      "data": [
        {
          "id": 55,
          "status": 0,
          "check_in": "2026-02-14",
          "check_out": "2026-02-15",
          "Hotel": {
            "name": "Hilton Shanghai",
            "cover_image": "..."
          },
          "RoomType": {
            "name": "豪华大床房",
            "price": "399.00"
          }
        }
      ]
    }
    ```

### 4.3 支付订单 (模拟)
*   **URL**: `/order/pay`
*   **Method**: `POST`
*   **Body**: `{"orderId": 55}`
*   **Response**: 200 OK (状态变更为 1)

### 4.4 取消订单
*   **URL**: `/order/cancel`
*   **Method**: `POST`
*   **Body**: `{"orderId": 55}`
*   **Response**: 200 OK (状态变更为 2，且自动恢复库存)
