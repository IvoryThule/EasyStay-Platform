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

## 3. 文件上传

### 3.1 上传图片
*   **URL**: `/upload`
*   **Method**: `POST`
*   **Headers**: `Authorization: Bearer <token>`
*   **Body**: `multipart/form-data`
    *   `image`: `<File Object>`
*   **Response**:
    ```json
    {
      "code": 200,
      "msg": "Upload successful",
      "data": {
        "url": "/uploads/550e8400-e29b-41d4-a716-446655440000.jpg", // 拿着这个 URL 去填 hotel.cover_image
        "filename": "...",
        "mimetype": "image/jpeg"
      }
    }
    ```
