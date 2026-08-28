# 10 - Backend

Backend در Khatmax ستون پشتیبانی محصول است؛ جایی که authentication، model routing، workspace sync، deployment، monitoring و سایر سرویس‌های مرکزی مدیریت می‌شوند. چون محصول AI-first است، backend باید برای orchestration و کنترل، طراحی روشن و قابل‌گسترش داشته باشد.

## هدف
- مدیریت ارتباط بین IDE و سرویس‌های AI
- فراهم‌کردن abstraction برای providerهای مختلف
- نگه‌داری state و workspace sync
- پشتیبانی از deploy، billing، auth و monitoring

## بخش‌های مهم
- `Authentication`
- `AI Gateway`
- `Model Router`
- `Agent Manager`
- `Workspace Sync`
- `Memory`
- `Deploy`
- `Monitoring`
- `Billing`
- `Policy` و `Security`

## API اختصاصی Khatmax
- به‌جای اتصال مستقیم IDE به سرویس‌های مختلف، درخواست‌ها از طریق API مرکزی مدیریت می‌شوند.
- این لایه انتخاب مدل، routing، logging و کنترل رفتار را ساده‌تر می‌کند.
- API باید اجازه بدهد provider عوض شود بدون اینکه کل IDE تغییر کند.
- این معماری برای رشد آینده و service orchestration مهم است.

## پشتیبانی از providerها
- API اختصاصی باید با modelهای cloud و local سازگار باشد.
- اتصال به OpenAI، Anthropic، Gemini، OpenRouter، Ollama، LM Studio و serverهای سازمانی باید قابل‌تصور باشد.
- provider جدید نباید نیازمند بازنویسی core باشد.
- انتخاب provider باید قابل‌مدیریت و قابل‌تغییر باشد.

## workspace sync
- state پروژه باید بین بخش‌های مختلف هماهنگ بماند.
- تغییرات agent باید با محیط کاربر sync شود.
- context، history و memory باید ساختارمند باشند.
- sync نباید باعث پیچیدگی غیرضروری در UI شود.

## امنیت و کنترل
- درخواست‌های حساس باید محافظت شوند.
- access control باید روشن باشد.
- داده‌ها باید با توجه به سطح دسترسی مدیریت شوند.
- رفتار agent و backend باید auditable باشد.

## monitoring
- خطاها باید قابل‌ردگیری باشند.
- عملکرد سرویس‌ها باید قابل‌سنجش باشد.
- وضعیت providerها، gatewayها و taskها باید دیده شود.
- monitoring باید به تصمیم‌گیری کمک کند، نه فقط گزارش‌دادن.

## release-oriented backend
- backend باید برای scale و تغییر provider آماده باشد.
- زیرساخت باید قابل‌توسعه به cloud و enterprise باشد.
- معماری باید امکان چند محصول و چند سطح سرویس را بدهد.

## نتیجه‌ی مطلوب
- backend شفاف، امن و قابل‌گسترش
- abstraction مناسب برای مدل‌ها
- routing و orchestration قابل‌کنترل
- پایه‌ی مناسب برای AI-first product
