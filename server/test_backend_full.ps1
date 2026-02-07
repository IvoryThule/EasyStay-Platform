# Full API Test Script (English Version)
# Run before: npm run dev
$BASE_URL = "http://localhost:3000/api"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   EasyStay Backend API Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# ========== 1. Public GET APIs ==========
Write-Host "`n[1] Hotel List (Public)" -ForegroundColor Green
$testHotelId = $null
$testRoomTypeId = $null

try {
    $hotels = Invoke-RestMethod -Uri "$BASE_URL/hotel/list?page=1&limit=5" -Method GET
    Write-Host "PASS: Hotel list success, total $($hotels.data.total)" -ForegroundColor Green
    if ($hotels.data.list.Count -gt 0) {
        $testHotelId = $hotels.data.list[0].id
        Write-Host "  - Test Hotel ID: $testHotelId"
    } else {
        Write-Host "WARN: No hotels found, subsequent tests may be skipped." -ForegroundColor Yellow
    }
} catch {
    Write-Host "FAIL: Hotel list failed: $_" -ForegroundColor Red
}

Write-Host "`n[2] Hotel Detail (Public)" -ForegroundColor Green
if ($testHotelId) {
    try {
        $hotelDetail = Invoke-RestMethod -Uri "$BASE_URL/hotel/detail/$testHotelId" -Method GET
        Write-Host "PASS: Hotel detail success" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Hotel detail failed: $_" -ForegroundColor Red
    }
}

Write-Host "`n[3] RoomType List (Public)" -ForegroundColor Green
if ($testHotelId) {
    try {
        $roomTypes = Invoke-RestMethod -Uri "$BASE_URL/hotel/roomtype/list?hotel_id=$testHotelId" -Method GET
        Write-Host "PASS: RoomType list success, count $($roomTypes.data.Count)" -ForegroundColor Green
        if ($roomTypes.data.Count -gt 0) {
            $testRoomTypeId = $roomTypes.data[0].id
            Write-Host "  - Test RoomType ID: $testRoomTypeId"
        }
    } catch {
        Write-Host "FAIL: RoomType list failed: $_" -ForegroundColor Red
    }
}

Write-Host "`n[4] Location (Public)" -ForegroundColor Green
try {
    $location = Invoke-RestMethod -Uri "$BASE_URL/system/location" -Method GET
    Write-Host "PASS: Location success" -ForegroundColor Green
} catch {
    Write-Host "FAIL: Location failed: $_" -ForegroundColor Red
}

# ========== 2. Auth APIs ==========
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Auth & Protected APIs" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Login User
Write-Host "`n[5] User Login" -ForegroundColor Green
$userLoginData = @{ username = "testuser"; password = "test123" } | ConvertTo-Json
$userToken = $null

try {
    $userLogin = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method POST -Body $userLoginData -ContentType "application/json"
    $userToken = $userLogin.data.token
    Write-Host "PASS: User login success" -ForegroundColor Green
} catch {
    Write-Host "WARN: User not found, registering..." -ForegroundColor Yellow
    $registerData = @{ username = "testuser"; password = "test123"; role = "user" } | ConvertTo-Json
    try {
        $register = Invoke-RestMethod -Uri "$BASE_URL/auth/register" -Method POST -Body $registerData -ContentType "application/json"
        $userToken = $register.data.token
        Write-Host "PASS: User registered and logged in" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: User registration failed: $_" -ForegroundColor Red
    }
}

$userHeaders = @{ Authorization = "Bearer $userToken" }

# User Orders
Write-Host "`n[6] Get User Orders" -ForegroundColor Green
if ($userToken) {
    try {
        $orders = Invoke-RestMethod -Uri "$BASE_URL/order/list" -Method GET -Headers $userHeaders
        Write-Host "PASS: Order list success" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Order list failed: $_" -ForegroundColor Red
    }
}

# ========== 3. Admin APIs ==========
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Admin APIs" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Login Admin
Write-Host "`n[7] Admin Login" -ForegroundColor Green
$adminLoginData = @{ username = "admin"; password = "admin123" } | ConvertTo-Json
$adminToken = $null

try {
    $adminLogin = Invoke-RestMethod -Uri "$BASE_URL/auth/login" -Method POST -Body $adminLoginData -ContentType "application/json"
    $adminToken = $adminLogin.data.token
    Write-Host "PASS: Admin login success" -ForegroundColor Green
} catch {
    Write-Host "WARN: Admin not found, registering..." -ForegroundColor Yellow
    $adminData = @{ username = "admin"; password = "admin123"; role = "admin" } | ConvertTo-Json
    try {
        $adminReg = Invoke-RestMethod -Uri "$BASE_URL/auth/register" -Method POST -Body $adminData -ContentType "application/json"
        $adminToken = $adminReg.data.token
        Write-Host "PASS: Admin registered" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Admin registration failed: $_" -ForegroundColor Red
    }
}

$adminHeaders = @{ Authorization = "Bearer $adminToken" }

# Pending Hotels
Write-Host "`n[8] Get Pending Hotels" -ForegroundColor Green
if ($adminToken) {
    try {
        $pending = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/pending?page=1&limit=10" -Method GET -Headers $adminHeaders
        Write-Host "PASS: Pending hotels list success, total $($pending.data.total)" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Pending hotels failed: $_" -ForegroundColor Red
    }
}

# Rejected Hotels
Write-Host "`n[9] Get Rejected Hotels" -ForegroundColor Green
if ($adminToken) {
    try {
        $rejected = Invoke-RestMethod -Uri "$BASE_URL/admin/hotel/rejected?page=1&limit=10" -Method GET -Headers $adminHeaders
        Write-Host "PASS: Rejected hotels list success" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Rejected hotels failed: $_" -ForegroundColor Red
    }
}

# Stats
Write-Host "`n[10] Get Stats" -ForegroundColor Green
if ($adminToken) {
    try {
        $stats = Invoke-RestMethod -Uri "$BASE_URL/admin/stats" -Method GET -Headers $adminHeaders
        Write-Host "PASS: Stats success" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: Stats failed: $_" -ForegroundColor Red
    }
}

Write-Host "`nDone." -ForegroundColor Cyan