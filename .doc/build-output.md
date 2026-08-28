# راهنمای خروجی ساخت

از این فایل وقتی استفاده کن که بخواهی Khatmax را به‌صورت محلی build کنی و سریع به خروجی‌ها برسی.

## آماده‌سازی اولیه
1. وابستگی‌ها را نصب کن:
   ```powershell
   npm install
   ```
2. وضعیت تایپ‌های سورس را بررسی کن:
   ```powershell
   npm run typecheck-client
   ```

## دستورهای build
ساخت درخت برنامه دسکتاپ:
```powershell
npm run gulp vscode-win32-x64
```

ساخت نصاب کاربر ویندوز:
```powershell
npm run gulp vscode-win32-x64-user-setup
```

اگر روی سیستمی هستی که signing در دسترس دارد و نصاب امضا‌شده می‌خواهی:
```powershell
npm run gulp vscode-win32-x64-user-setup -- --sign
```

## محل خروجی‌ها
- درخت build برنامه: `D:\khateweb\projects\VSCode-win32-x64\`
- فایل اجرایی اصلی: `D:\khateweb\projects\VSCode-win32-x64\Khatmax.exe`
- نصاب کاربر: `D:\khateweb\projects\khatmax\.build\win32-x64\user-setup\KhatmaxSetup.exe`
- نصاب سیستمی: `D:\khateweb\projects\khatmax\.build\win32-x64\system-setup\KhatmaxSetup.exe`

## نحوه آپدیت برنامه نصب‌شده
اگر Khatmax از قبل نصب شده باشد، همان نصاب کاربر را دوباره اجرا کن:
```powershell
D:\khateweb\projects\khatmax\.build\win32-x64\user-setup\KhatmaxSetup.exe
```

این امن‌ترین مسیر برای آپدیت نسخه نصب‌شده است.
اگر به‌جای نصاب از نسخه portable استفاده می‌کنی، فایل‌های پوشه نصب‌شده را با درخت جدید `VSCode-win32-x64` جایگزین کن.

## چک‌لیست سریع
- اول درخت برنامه را build کن.
- بعد نصاب را بساز.
- نصاب را از مسیر خروجی بالا اجرا یا کپی کن.
- برای آپدیت نصب قبلی، همان نصاب را دوباره اجرا کن.
