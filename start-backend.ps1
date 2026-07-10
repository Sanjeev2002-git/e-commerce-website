$redisPath = "C:\Users\SANJEEV S CHAKRAPANI\AppData\Local\Microsoft\WinGet\Packages\taizod1024.redis-windows-fork_Microsoft.Winget.Source_8wekyb3d8bbwe\Redis-8.8.0-Windows-x64-msys2"

Write-Host "Stopping any old Redis processes..."
Get-Process | Where-Object { $_.ProcessName -like "*redis*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

Write-Host "Starting Redis in the background..."
Start-Process -FilePath "$redisPath\redis-server.exe" -WindowStyle Hidden
Start-Sleep -Seconds 2

$pong = & "$redisPath\redis-cli.exe" ping
Write-Host "Redis says: $pong"

Write-Host "Starting backend on port 4000..."
Set-Location "D:\E-Commerce Website\backend"
npm run dev
