# 11 - Frontend

Frontend در Khatmax باید تجربه‌ای بسازد که هم برای AI قابل‌نمایش باشد و هم برای انسان قابل‌فهم. چون محصول ما یک IDE معمولی نیست، frontend باید بین قدرت، سادگی و شفافیت تعادل برقرار کند.

## هدف
- ساخت تجربه‌ی کاربری حرفه‌ای و قابل‌اعتماد
- نمایش روشن وضعیت AI و workspace
- پشتیبانی از کاربر حرفه‌ای و تازه‌کار
- هماهنگی کامل با هسته‌ی VS Code

## سطح‌های frontend
- `App Shell`
- `Workspace Layout`
- `Editor Panels`
- `Agent Panels`
- `Inspection Panels`
- `Runtime Panels`
- `Settings and Admin Views`

## اصول مهم
- UI باید هدف هر بخش را روشن کند.
- اطلاعات مهم نباید پنهان بماند.
- کاربر باید بتواند سریع حرکت کند.
- تغییرات AI باید در سطح UI قابل‌فهم باشند.
- تجربه نباید شلوغ یا گیج‌کننده شود.

## الگوی تجربه
- سمت چپ برای navigation و project context
- مرکز برای editor و task flow
- سمت راست برای AI, inspector, reasoning
- پایین برای terminal, logs, runtime, status

## رفتار با AI
- AI نباید فقط در chat دیده شود.
- AI باید در چند surface حضور داشته باشد.
- پاسخ AI باید به context و task وصل باشد.
- کاربر باید بتواند بین پیشنهاد، اجرا، توقف و اصلاح جابه‌جا شود.

## performance
- UI باید سبک و responsive باشد.
- rendering باید تا جای ممکن efficient باشد.
- stateهای پیچیده باید مدیریت‌پذیر بمانند.
- تجربه نباید با زیاد شدن panelها فرو بریزد.

## accessibility
- keyboard navigation باید کامل باشد.
- focus state باید واضح باشد.
- متن‌ها و آیکن‌ها باید قابل‌فهم باشند.
- حالت‌های سیستم باید برای کاربران مختلف قابل‌استفاده باشد.

## compatibility با VS Code
- frontend باید با هسته‌ی `Code - OSS` سازگار بماند.
- تغییرات نباید model تعامل اصلی را خراب کنند.
- هر extension یا view جدید باید با ساختار workbench هماهنگ باشد.

## نتیجه‌ی مطلوب
- تجربه‌ی واضح
- کنترل‌پذیری بالا
- UI مناسب برای AI workspace
- هم‌راستایی با هسته‌ی VS Code
