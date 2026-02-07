# Admin API 测试脚本
# 运行前请确保：
# 1. 服务器已启动: npm run dev
# 2. 已有 admin 账号和 merchant 账号
# 3. 已有待审核的酒店

$BASE_URL = "http://localhost:3000/api"

# ========== 配置 ==========
# 请先登录获取 token (或从之前的测试中获取)
$ADMIN_TOKEN = "your_admin_token_here"
$MERCHANT_TOKEN = "your_merchant_token_here"

# ========== 1. 注册/登录管理员 (如果还没有) ==========
Write-Host "=== 1. Admin Login ===" -ForegroundColor Green
$loginData = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$adminLogin = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method POST -Body $loginData -ContentType "application/json"
$ADMIN_TOKEN = $adminLogin.data.token
Write-Host "Admin Token: $ADMIN_TOKEN"

# ========== 2. 获取待审核酒店列表 (含房型) ==========
Write-Host "`n=== 2. Get Pending Hotels ===" -ForegroundColor Green
$headers = @{
    Authorization = "Bearer $ADMIN_TOKEN"
}
$pending = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/pending?page=1&limit=10" -Method GET -Headers $headers
Write-Host "Pending Hotels Count: $($pending.data.total)"
$pending.data.list | Format-Table -Property id, name, status, @{Label="RoomTypes"; Expression={$_.roomTypes.Count}}

# 如果有待审核的酒店，获取第一个的ID
if ($pending.data.list.Count -gt 0) {
    $hotelToAudit = $pending.data.list[0].id
    Write-Host "Will audit hotel ID: $hotelToAudit"

    # ========== 3. 审核通过酒店 ==========
    Write-Host "`n=== 3. Approve Hotel ===" -ForegroundColor Green
    $approveData = @{
        hotel_id = $hotelToAudit
        status = 1
    } | ConvertTo-Json
    
    $approve = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/audit" -Method POST -Body $approveData -ContentType "application/json" -Headers $headers
    Write-Host "Approve Result: $($approve.msg)"
    Write-Host "Hotel Status: $($approve.data.status)"

    # ========== 4. 创建另一个测试酒店并驳回 ==========
    Write-Host "`n=== 4. Create Test Hotel (Merchant) ===" -ForegroundColor Green
    
    # 先登录商户
    $merchantLoginData = @{
        username = "merchant_test"
        password = "test123"
    } | ConvertTo-Json
    
    try {
        $merchantLogin = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method POST -Body $merchantLoginData -ContentType "application/json"
        $MERCHANT_TOKEN = $merchantLogin.data.token
    } catch {
        # 如果商户不存在，注册一个
        Write-Host "Registering merchant..." -ForegroundColor Yellow
        $registerData = @{
            username = "merchant_test"
            password = "test123"
            role = "merchant"
        } | ConvertTo-Json
        $register = Invoke-RestMethod -Uri "$BASE_URL/auth/register" -Method POST -Body $registerData -ContentType "application/json"
        $MERCHANT_TOKEN = $register.data.token
    }

    # 创建测试酒店
    $merchantHeaders = @{
        Authorization = "Bearer $MERCHANT_TOKEN"
    }
    $testHotelData = @{
        name = "Test Hotel for Rejection"
        address = "123 Test Street"
        city = "Shanghai"
        price = 500
        star = 3
    } | ConvertTo-Json
    
    $newHotel = Invoke-RestMethod -Uri "$BASE_URL/hotel/create" -Method POST -Body $testHotelData -ContentType "application/json" -Headers $merchantHeaders
    Write-Host "Created Hotel ID: $($newHotel.data.id)"

    # ========== 5. 驳回酒店 ==========
    Write-Host "`n=== 5. Reject Hotel ===" -ForegroundColor Green
    $rejectData = @{
        hotel_id = $newHotel.data.id
        status = 2
        reject_reason = "酒店图片不清晰，地址信息不完整，请补充完整资料后重新提交"
    } | ConvertTo-Json
    
    $reject = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/audit" -Method POST -Body $rejectData -ContentType "application/json" -Headers $headers
    Write-Host "Reject Result: $($reject.msg)"
    Write-Host "Reject Reason: $($reject.data.reject_reason)"

    # ========== 6. 查看被驳回的酒店列表 ==========
    Write-Host "`n=== 6. Get Rejected Hotels ===" -ForegroundColor Green
    $rejected = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/rejected?page=1&limit=10" -Method GET -Headers $headers
    Write-Host "Rejected Hotels Count: $($rejected.data.total)"
    $rejected.data.list | Format-Table -Property id, name, status, reject_reason
}

# ========== 7. 获取平台统计数据 ==========
Write-Host "`n=== 7. Get Platform Stats ===" -ForegroundColor Green
$stats = Invoke-RestMethod -Uri "$BASE_URL/admin/stats" -Method GET -Headers $headers
Write-Host "Platform Statistics:"
$stats.data | Format-List

Write-Host "`n=== All Tests Completed ===" -ForegroundColor Cyan
