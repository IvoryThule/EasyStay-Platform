# Windows PowerShell script to test APIs
# Usage: ./test_api.ps1

$BaseUrl = "http://localhost:3000/api"

# 1. Login as Merchant
echo ">>> Logging in as Merchant..."
$LoginBody = @{
    username = "boss@hotel.com"
    password = "merchant123"
} | ConvertTo-Json

try {
    $LoginResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/login" -Method Post -Body $LoginBody -ContentType "application/json"
    $Token = $LoginResponse.data.token
    echo "Login Success! Token: $Token"
} catch {
    echo "Login Failed: $_"
    exit
}

# 2. Create Hotel (Authorized)
echo "`n>>> Creating Hotel..."
$HotelBody = @{
    name = "Test Hotel"
    address = "123 Test St"
    city = "Test City"
    price = 199
    star = 3
    tags = @("WiFi", "Parking")
} | ConvertTo-Json

try {
    $CreateResponse = Invoke-RestMethod -Uri "$BaseUrl/hotel/create" -Method Post -Body $HotelBody -ContentType "application/json" -Headers @{ Authorization = "Bearer $Token" }
    $HotelId = $CreateResponse.data.id
    echo "Hotel Created! ID: $HotelId"
} catch {
    echo "Create Failed: $_"
}

# 3. List Hotels (Public)
echo "`n>>> Listing Hotels..."
try {
    $ListResponse = Invoke-RestMethod -Uri "$BaseUrl/hotel/list" -Method Get
    echo "Accessing List: Success! Count: $($ListResponse.data.total)"
} catch {
    echo "List Failed: $_"
}

# 4. Get Detail (Public but checks status)
# Note: Created hotel has status=0 (under review), public access might fail or return 403 depending on logic
echo "`n>>> Getting Detail (ID: $HotelId)..."
try {
    $DetailResponse = Invoke-RestMethod -Uri "$BaseUrl/hotel/detail/$HotelId" -Method Get -Headers @{ Authorization = "Bearer $Token" } # Use token to see own hotel
    echo "Accessing Detail: Success! Name: $($DetailResponse.data.name)"
} catch {
    echo "Detail Access Failed (Expected if unauth): $_"
}
