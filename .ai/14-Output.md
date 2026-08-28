# Output Guide

## هدف
این سند مسیر تولید خروجی اجرایی Khatmax را نگه می‌دارد تا هم انسان و هم Agent بدانند برای ساخت `exe` چه مرحله‌هایی لازم است، خروجی کجا ساخته می‌شود، و اگر build شکست خورد از کجا باید ادامه داد.

## خروجی مورد انتظار
- خروجی نهایی ویندوز باید با نام `KhatmaxSetup.exe` ساخته شود.
- مسیر خروجی بسته به نوع نصب در پوشه‌ی `VSCode-win32-x64\user-setup` یا `VSCode-win32-x64\system-setup` قرار می‌گیرد.
- فایل اجرایی نصب‌کننده باید از اسکریپت ویندوز و از روی پکیج build شده تولید شود، نه با کپی دستی فایل‌ها.

## پیش‌نیازها
- `Node.js` روی سیستم در دسترس باشد.
- `npm` کار کند.
- `Python` برای `node-gyp` در دسترس باشد.
- Visual Studio Build Tools یا Visual Studio با workload مربوط به C++ نصب باشد.
- وابستگی‌های ریشه، `build/` و پوشه‌های extensionهایی که build می‌شوند نصب شده باشند.

## ترتیب اجرا
1. نصب وابستگی‌های ریشه: `npm install`
2. نصب وابستگی‌های build: `cd build && npm install`
3. نصب وابستگی‌های extensionهایی که خطا می‌دهند.
4. ساخت target ویندوز: `npm run gulp -- vscode-win32-x64`
5. ساخت installer: `npm run gulp -- vscode-win32-x64-user-setup`

## نکات مهم
- اگر `node-gyp` خطا داد، معمولاً مشکل از `Python` یا Visual Studio Build Tools است.
- اگر `tsgo` روی extensionها خطا داد، آن extension به `node_modules` خودش نیاز دارد.
- اگر `user-setup` خطای نبودن `resources/app/product.json` داد، یعنی target اصلی `vscode-win32-x64` هنوز کامل نشده است.
- اگر build روی dependencyهای extensionها گیر کرد، باید همان extension را جداگانه `npm install` کرد.

## مسیرهای رایج خطا
- `extensions/css-language-features`
- `extensions/emmet`
- `extensions/extension-editing`
- `extensions/github-authentication`
- `extensions/microsoft-authentication`
- `extensions/html-language-features`

## مسیر عیب‌یابی
- اول dependency مربوط به آخرین extension خطادار را نصب کن.
- بعد build target را دوباره اجرا کن.
- اگر خطا جابه‌جا شد، همان الگو را ادامه بده تا build از مرحله‌ی typecheck عبور کند.
- اگر خطا به native module رسید، VS Build Tools را چک کن.

## معیار موفقیت
- پوشه‌ی `VSCode-win32-x64` ساخته شود.
- `resources/app/product.json` داخل خروجی وجود داشته باشد.
- `KhatmaxSetup.exe` در پوشه‌ی setup ساخته شود.
- installer بدون خطای packaging به پایان برسد.

## یادداشت برای Agent
- اگر build در هر مرحله شکست خورد، فقط همان dependency یا مرحله‌ی نزدیک به خطا را اصلاح کن.
- از renameهای گسترده و غیرلازم در build pipeline پرهیز کن.
- قبل از گزارش نهایی، مسیر واقعی فایل خروجی را با `rg` یا `Get-ChildItem` تأیید کن.
