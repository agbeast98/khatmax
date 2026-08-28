# Khatmax AI — Vision Document

## یک خط: AI که واقعاً کار انجام میده

Khatmax AI یک agent کاملاً خودمختار هست که با یک دستور ساده، تمام کار رو از صفر تا صد انجام میده.
فرقش با Cursor و Kiro: اونها پیشنهاد میدن — این یکی **انجام** میده.

---

## مدل تجاری

- کاربر حساب Khatmax میسازه (سایت ما)
- Login میکنه تو IDE
- AI فعال میشه — بدون API key، بدون تنظیم
- اشتراک ماهیانه (free tier + pro + enterprise)
- Backend ما: routing هوشمند بین مدل‌ها (Claude, GPT-4o, Llama, ...)

---

## دو حالت عملکرد

### 🟢 Normal Mode (پیش‌فرض)
- AI قبل از هر action مهم تأیید میخواد
- فایل ویرایش → نشون میده diff → تأیید
- Terminal → نشون میده command → تأیید
- Delete/destructive → حتماً تأیید

### 🔴 Auto Mode
- کاربر سوئیچ میکنه به Auto
- هشدار نشون داده میشه: **"AI دسترسی کامل داره"**
- بعد از تأیید، AI بدون توقف همه کار رو انجام میده
- فقط نتیجه نهایی رو گزارش میده
- کاربر هر لحظه میتونه Stop بزنه

---

## قابلیت‌های کامل

### Core (فاز ۱)
| قابلیت | توضیح |
|--------|-------|
| Chat | مکالمه هوشمند با context پروژه |
| File Read/Write/Create/Delete | خوندن و نوشتن فایل |
| Terminal Execution | اجرای هر دستور shell |
| Code Search | جستجو در کل workspace |
| Multi-Model | انتخاب مدل (Claude, GPT-4o, Llama, ...) |
| Streaming | پاسخ real-time |

### Advanced (فاز ۲)
| قابلیت | توضیح |
|--------|-------|
| Auto Testing | خودش test مینویسه و اجرا میکنه |
| Bug Detection & Fix | خودش مشکل رو پیدا و حل میکنه |
| Package Management | npm/pip/... install خودکار |
| Git Operations | commit, push, branch, PR |
| Multi-File Refactor | یکجا چند فایل رو refactor میکنه |
| Project Scaffold | از صفر پروژه بسازه (Next.js, React, ...) |

### Premium (فاز ۳)
| قابلیت | توضیح |
|--------|-------|
| Live UI Preview | UI بسازه و preview زنده نشون بده |
| Deploy | مستقیم deploy کنه (Vercel, AWS, ...) |
| Voice Command | با صدا دستور بده |
| Image Input | اسکرین‌شات بده، باگ رو fix کنه |
| Multi-Agent | چند agent موازی کار کنن |
| Memory | حافظه بلندمدت: پروژه، ترجیحات، الگوها |

---

## UX: ساده و قدرتمند

### برای کاربر تازه‌کار
```
[Chat Input]: "یک landing page بساز با React و Tailwind"

→ AI خودش:
  1. پروژه React میسازه
  2. Tailwind نصب میکنه
  3. Component‌ها مینویسه
  4. Preview نشون میده

[Result]: "آماده‌ست! Preview رو ببین."
```

### برای developer حرفه‌ای
```
[Chat Input]: "auth system اضافه کن با JWT و refresh token"

→ AI خودش:
  1. فایل‌های مرتبط رو پیدا میکنه
  2. Route/middleware مینویسه
  3. Database schema آپدیت میکنه
  4. Test مینویسه
  5. Test اجرا میکنه
  6. اگه fail شد، fix میکنه

[Result]: "Auth system آماده‌ست. ۱۲ فایل تغییر کرد. Tests: ✅ all passing"
```

---

## تفاوت با رقبا

| ویژگی | ChatGPT | Cursor | Kiro | **Khatmax AI** |
|--------|---------|--------|------|----------------|
| Chat | ✅ | ✅ | ✅ | ✅ |
| File Edit | ❌ | ✅ | ✅ | ✅ |
| Terminal | ❌ | ✅ | ✅ | ✅ |
| Auto Mode | ❌ | ❌ | Partial | ✅ Full |
| Test Auto | ❌ | ❌ | ❌ | ✅ |
| Bug Auto-Fix | ❌ | ❌ | ❌ | ✅ |
| Deploy | ❌ | ❌ | ❌ | ✅ |
| Voice | ❌ | ❌ | ❌ | ✅ |
| Multi-Agent | ❌ | ❌ | ❌ | ✅ |
| Free tier | ❌ | ❌ | ❌ | ✅ |
| No API key needed | ❌ | ❌ | ❌ | ✅ |
| Project Scaffold | ❌ | ❌ | ❌ | ✅ |
| Memory | ❌ | ❌ | Partial | ✅ |
| Image Input | ❌ | ✅ | ❌ | ✅ |

---

## Authentication Flow

```
1. کاربر Khatmax باز میکنه
2. Chat panel خالی → دکمه "Login to Khatmax"
3. Browser باز میشه → login/signup در khatmax.dev
4. OAuth callback → token ذخیره میشه
5. Chat فعال میشه — مدل‌ها لود میشن
6. آماده استفاده
```

---

## Backend Architecture (سمت سرور — بعداً)

```
User (IDE) → Khatmax API Gateway → Model Router → Provider
                                         ↓
                                   ┌─────────────┐
                                   │ Claude      │
                                   │ GPT-4o      │
                                   │ Llama       │
                                   │ Custom      │
                                   └─────────────┘
```

- Gateway: auth, rate limiting, billing, logging
- Router: بر اساس task نوع مدل انتخاب میکنه (یا کاربر دستی انتخاب میکنه)
- Billing: per-token یا subscription

---

## فازبندی توسعه

### Phase 1: MVP Chat (هفته ۱-۳)
**هدف:** Chat کار کنه، streaming، multi-model
- Extension scaffold
- Login/Auth (فعلاً API key — OAuth بعداً)
- ChatProvider → OpenRouter
- Streaming responses
- Model selection
- product.json update (حذف Copilot)

### Phase 2: Tools & Agent (هفته ۴-۶)
**هدف:** AI بتونه action انجام بده
- File tools (read, write, create, delete)
- Terminal execution
- Code search
- Normal/Auto mode switch
- Progress reporting
- User confirmation flow

### Phase 3: Smart Agent (هفته ۷-۹)
**هدف:** AI هوشمندتر بشه
- Auto test generation + execution
- Bug detection + auto-fix
- Package install
- Git operations (commit, push, PR)
- Multi-file refactor
- Project scaffolding

### Phase 4: Premium Features (هفته ۱۰-۱۲)
**هدف:** ویژگی‌های unique
- Live UI preview
- Deploy integration
- Voice command
- Image input (screenshot → fix)
- Khatmax OAuth (حذف API key)

### Phase 5: Intelligence (آینده)
**هدف:** AI واقعاً هوشمند
- Multi-agent collaboration
- Long-term memory
- Project understanding graph
- Auto-routing بین مدل‌ها
- Khatmax API gateway (backend خودمون)

---

## نکات فنی مهم

1. **Extension باید built-in باشه** — شیپ بشه با هر build
2. **بدون dependency به Copilot** — کاملاً مستقل
3. **Gateway abstraction** — فعلاً OpenRouter، بعداً Khatmax API
4. **Secure** — credentials encrypted، sandbox for tools
5. **Fast** — streaming mandatory، lazy loading
6. **Offline fallback** — اگه نت نبود، graceful degrade

---

## ساختار نهایی Extension

```
extensions/khatmax-ai/
├── package.json
├── src/
│   ├── extension.ts              ← entry point
│   ├── auth/
│   │   ├── authService.ts        ← login/logout/token
│   │   └── tokenStore.ts         ← secure storage
│   ├── provider/
│   │   ├── chatProvider.ts       ← ILanguageModelChatProvider
│   │   ├── models.ts             ← model registry
│   │   └── tokenCounter.ts       ← token estimation
│   ├── gateway/
│   │   ├── khatmaxGateway.ts     ← main API client
│   │   ├── openRouterAdapter.ts  ← OpenRouter specifics (temp)
│   │   ├── streamParser.ts       ← SSE handling
│   │   └── types.ts              ← shared types
│   ├── agent/
│   │   ├── agentLoop.ts          ← main agent execution loop
│   │   ├── planner.ts            ← task decomposition
│   │   └── modeManager.ts        ← Normal/Auto mode
│   ├── tools/
│   │   ├── toolRegistry.ts       ← tool definitions
│   │   ├── fileTools.ts          ← file operations
│   │   ├── terminalTools.ts      ← shell execution
│   │   ├── searchTools.ts        ← code search
│   │   ├── gitTools.ts           ← git operations
│   │   ├── packageTools.ts       ← npm/pip install
│   │   └── testTools.ts          ← test run/write
│   └── ui/
│       ├── modelSelector.ts      ← model picker
│       ├── modeToggle.ts         ← Normal/Auto switch
│       ├── statusBar.ts          ← connection status
│       └── progressView.ts       ← step-by-step display
├── tsconfig.json
└── esbuild.mts
```
