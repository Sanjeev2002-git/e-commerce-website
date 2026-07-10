# Run this from inside D:\E-Commerce Website
# powershell -ExecutionPolicy Bypass -File apply.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Copy-Item "$root\backend\src\auth\services\redis-token.service.ts" `
  "backend\src\auth\services\redis-token.service.ts" -Force
Write-Host "✓ redis-token.service.ts replaced"

Copy-Item "$root\backend\src\catalog\categories\categories.service.ts" `
  "backend\src\catalog\categories\categories.service.ts" -Force
Write-Host "✓ categories.service.ts replaced"

Copy-Item "$root\web-app\app\categories\page.tsx" `
  "web-app\app\categories\page.tsx" -Force
Write-Host "✓ categories/page.tsx replaced"

Write-Host ""
Write-Host "Uninstalling ioredis..."
Set-Location backend
npm uninstall ioredis
Set-Location ..

Write-Host ""
Write-Host "Committing and pushing..."
git add .
git commit -m "Fix: remove Redis/ioredis, add category images"
git push origin master

Write-Host ""
Write-Host "All done! Now run: cd backend && npm run dev"
