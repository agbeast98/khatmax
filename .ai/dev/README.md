# Dev Guide — Khatmax

## اجرای Dev Mode

```powershell
cd d:\khateweb\projects\khatmax
scripts\khatmax-dev.bat
```

یا مستقیم:
```powershell
.build\electron\Khatmax.exe . --disable-extension=vscode.vscode-api-tests --disable-extension=GitHub.copilot --disable-extension=GitHub.copilot-chat
```

## بعد از تغییر source:
```powershell
npm run gulp -- compile-client
scripts\khatmax-dev.bat
```

## بعد از تغییر extension khatmax-ai:
```powershell
cd extensions\khatmax-ai
node esbuild.mjs
cd ..\..
scripts\khatmax-dev.bat
```

## اگه صفحه مشکی دیدی:
```powershell
Remove-Item out -Recurse -Force
npm run gulp -- compile-client
```

## OpenRouter API Key

1. برو به: https://openrouter.ai/keys
2. Sign up / Login کن
3. یه API key بساز (رایگان شروع میشه)
4. Key رو کپی کن (فرمت: `sk-or-v1-...`)

### تنظیم تو Khatmax:
فعلاً API key رو از طریق Settings وارد کن:
- `Ctrl+,` → search "khatmax"
- `khatmax.ai.gateway.baseUrl` = `https://openrouter.ai/api/v1`
- یا Command Palette: `Khatmax AI: Set API Key`

### تست مستقیم OpenRouter:
```powershell
$key = "sk-or-v1-YOUR-KEY-HERE"
$body = @{
    model = "anthropic/claude-sonnet-4-20250514"
    messages = @(@{role="user"; content="Hi"})
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://openrouter.ai/api/v1/chat/completions" `
    -Method POST `
    -Headers @{Authorization="Bearer $key"; "Content-Type"="application/json"} `
    -Body $body
```
