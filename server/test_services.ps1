# 修复版测试脚本：强制 UTF-8 编码
$baseUrl = "http://localhost:3000/api"

# 辅助函数：发送 UTF-8 请求
function Invoke-PostUtf8 {
    param($Uri, $BodyObj, $Headers = @{})
    $json = $BodyObj | ConvertTo-Json -Compress -Depth 10
    # 关键：手动转换为 UTF-8 字节数组
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    
    return Invoke-RestMethod -Uri $Uri -Method Post -Headers $Headers -Body $bytes -ContentType "application/json; charset=utf-8" -TimeoutSec 60
}

# 1. 获取 Token
Write-Host "`r`n[1] Logging in to get Token..." -ForegroundColor Cyan
$loginBody = @{
    username = "admin"
    password = "admin123"
}

try {
    $loginUrl = "$baseUrl/auth/login"
    # 使用 UTF-8 函数登录
    $loginRes = Invoke-PostUtf8 -Uri $loginUrl -BodyObj $loginBody
    $token = $loginRes.data.token
    Write-Host "[OK] Login successful! Token Length: $($token.Length)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

$headers = @{
    Authorization = "Bearer $token"
}

# 2. 测试 IP 定位
Write-Host "`r`n[2] Testing IP Location..." -ForegroundColor Cyan

# 2.1 默认本地 IP
Write-Host "   -> Case A: Default Local IP"
try {
    $locUrl = "$baseUrl/system/location"
    $locRes = Invoke-RestMethod -Uri $locUrl -Method Get
    Write-Host "   [OK] Return: $($locRes.data.province) - $($locRes.data.city)" -ForegroundColor Green
} catch {
    Write-Host "   [ERROR] Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 2.2 指定测试 IP
Write-Host "   -> Case B: Mock IP (58.20.192.1)"
try {
    $locUrl = "$baseUrl/system/location?ip=58.20.192.1"
    $locRes = Invoke-RestMethod -Uri $locUrl -Method Get
    Write-Host "   [OK] Return: $($locRes.data.province) - $($locRes.data.city)" -ForegroundColor Green
    if ($locRes.data.province -eq "上海市" -and $locRes.data.city -eq "上海市") {
        Write-Host "   [WARN] Result is default Mock data. Check Server logs for 'INVALID_USER_IP'." -ForegroundColor Yellow
    }
} catch {
    Write-Host "   [ERROR] Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. 测试 AI 对话
Write-Host "`r`n[3] Testing AI Chat (GLM-4)..." -ForegroundColor Cyan
# 这里可以放心写中文了
$systemPrompt = "用一两句话形容一下湖南岳阳。包含'EasyStay'这个词。"
Write-Host "   Prompt: $systemPrompt" -ForegroundColor Gray

$aiBody = @{
    prompt = $systemPrompt
}

try {
    $startTime = Get-Date
    $aiUrl = "$baseUrl/ai/chat"
    
    # 使用 UTF-8 函数发送 AI 请求
    $aiRes = Invoke-PostUtf8 -Uri $aiUrl -Headers $headers -BodyObj $aiBody
    
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    Write-Host "[OK] AI Response (Time: $($duration)s):" -ForegroundColor Green
    # 打印中文结果
    Write-Host "   $($aiRes.data.content)" -ForegroundColor Yellow
} catch {
    Write-Host "[ERROR] AI Failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "   Details: $($_.ErrorDetails)" -ForegroundColor Red
    }
}

Write-Host "`r`n[DONE] Test Finished." -ForegroundColor Cyan