# Khatmax IDE — Roadmap کامل تبدیل به IDE اختصاصی

## وضعیت فعلی (انجام شده ✅)
- Fork VS Code/Code-OSS
- Branding: نام "Khatmax"، product.json، installer
- Theme Khatmax Dark (navy/teal/purple)
- حذف Copilot branding (244+ فایل)
- Extension khatmax-ai scaffold (detect شده)
- Welcome page اختصاصی
- Dev mode script

---

## Phase 1: Chat عملیاتی (اولویت ۱ — الان)

### 1.1 Settings UI اختصاصی
- [ ] Input field برای API key (OpenRouter)
- [ ] Dropdown مدل‌ها (10 مدل default)
- [ ] دکمه "Test Connection"
- [ ] ذخیره امن با SecretStorage

### 1.2 Chat Functionality
- [ ] وقتی پیام بفرستی → به OpenRouter بره
- [ ] Streaming response (real-time)
- [ ] Markdown rendering تو chat
- [ ] Code blocks با syntax highlighting
- [ ] Copy button روی code blocks
- [ ] Stop button (cancel request)

### 1.3 Chat UI اختصاصی
- [ ] Welcome state: لوگو + "Describe what to build"
- [ ] Loading state: animated dots با رنگ teal
- [ ] Error state: پیام خطا + retry button
- [ ] User message bubble (dark)
- [ ] AI message bubble (lighter)
- [ ] Model indicator (کدوم مدل جواب داده)

---

## Phase 2: Agent Tools (هفته ۲-۳)

### 2.1 File Operations
- [ ] read_file → خوندن فایل workspace
- [ ] write_file → نوشتن/ایجاد فایل
- [ ] delete_file → حذف (با تأیید)
- [ ] list_files → لیست directory
- [ ] Diff view قبل از apply تغییرات

### 2.2 Terminal
- [ ] run_command → اجرای shell command
- [ ] Output capture (stdout/stderr)
- [ ] Auto-detect خطا و پیشنهاد fix

### 2.3 Code Intelligence
- [ ] search_code → grep در workspace
- [ ] find_references → پیدا کردن usage
- [ ] get_diagnostics → خطاهای TypeScript/ESLint

### 2.4 Normal/Auto Mode
- [ ] Toggle button تو chat header
- [ ] Normal: confirm قبل از هر action
- [ ] Auto: همه رو بدون تأیید انجام بده
- [ ] Warning dialog وقتی Auto فعال میشه

---

## Phase 3: UX Premium (هفته ۴-۵)

### 3.1 Inline Chat (مثل Cursor Ctrl+K)
- [ ] Ctrl+K → inline chat باز بشه تو editor
- [ ] انتخاب کد + "Explain" / "Refactor" / "Fix"
- [ ] Diff inline نشون بده
- [ ] Accept/Reject buttons

### 3.2 Code Completions (Autocomplete)
- [ ] Tab completion هوشمند
- [ ] Multi-line suggestion
- [ ] Ghost text (gray text)
- [ ] Accept با Tab، Reject با Esc

### 3.3 Smart Actions
- [ ] Right-click menu: "Ask Khatmax AI"
- [ ] "Generate Test" button بالای functions
- [ ] "Fix This" روی خطاهای diagnostic
- [ ] "Explain" روی code selection

### 3.4 Context Panel
- [ ] نشون دادن فایل‌هایی که AI داره میخونه
- [ ] Token usage meter
- [ ] Cost estimation

---

## Phase 4: ویژگی‌های Unique (هفته ۶-۸)

### 4.1 Project Scaffolding
- [ ] بگو "React app with Tailwind بساز" → کل پروژه بسازه
- [ ] Template gallery (Next.js, Express, Django, ...)
- [ ] Interactive wizard

### 4.2 Auto Testing
- [ ] خودش test file بسازه
- [ ] اجرا کنه
- [ ] اگه fail شد، fix کنه و دوباره اجرا کنه

### 4.3 Git Integration
- [ ] Auto commit message generation
- [ ] PR description generation
- [ ] Branch management
- [ ] Merge conflict resolution

### 4.4 Live Preview
- [ ] Built-in browser preview
- [ ] Hot reload
- [ ] Screenshot → "fix this UI"

---

## Phase 5: Auth & Backend (هفته ۹-۱۰)

### 5.1 Khatmax Account
- [ ] OAuth login (khatmax.dev)
- [ ] Subscription tiers (free/pro/enterprise)
- [ ] Usage dashboard
- [ ] API key management

### 5.2 Backend Gateway
- [ ] Khatmax API endpoint (بجای OpenRouter مستقیم)
- [ ] Smart model routing
- [ ] Rate limiting
- [ ] Cost tracking per user

### 5.3 Cloud Features
- [ ] Session sync between devices
- [ ] Shared workspaces
- [ ] Team collaboration

---

## Phase 6: Intelligence (هفته ۱۱-۱۲+)

### 6.1 Memory
- [ ] حافظه بلندمدت: پروژه، ترجیحات
- [ ] Project understanding graph
- [ ] Personal coding style learning

### 6.2 Multi-Agent
- [ ] Frontend agent + Backend agent + Test agent
- [ ] موازی کار کنن
- [ ] Coordinator agent

### 6.3 Voice
- [ ] Voice input (صحبت کن → code بنویسه)
- [ ] Voice commands

### 6.4 Image
- [ ] Screenshot paste → UI generation
- [ ] Design to code
- [ ] Error screenshot → auto fix

---

## مقایسه با Cursor (هدف: بهتر باشیم)

| Feature | Cursor | Khatmax (هدف) |
|---------|--------|---------------|
| Chat | ✅ | ✅ (Phase 1) |
| Inline edit (Ctrl+K) | ✅ | ✅ (Phase 3) |
| Tab completion | ✅ | ✅ (Phase 3) |
| Multi-model | ✅ | ✅ (Phase 1) |
| File edit | ✅ | ✅ (Phase 2) |
| Terminal | ✅ | ✅ (Phase 2) |
| Auto mode | ❌ | ✅ (Phase 2) |
| Project scaffold | ❌ | ✅ (Phase 4) |
| Auto testing | ❌ | ✅ (Phase 4) |
| Live preview | ❌ | ✅ (Phase 4) |
| Voice | ❌ | ✅ (Phase 6) |
| Image input | ❌ | ✅ (Phase 6) |
| Multi-agent | ❌ | ✅ (Phase 6) |
| Memory | ❌ | ✅ (Phase 6) |
| Free tier | ❌ | ✅ (Phase 5) |
| No API key (subscription) | ❌ | ✅ (Phase 5) |
| Self-hosted option | ❌ | ✅ (آینده) |

---

## ترتیب اجرا (Session بعدی)

**Session بعدی → Phase 1.1 + 1.2:**
1. Settings page: API key input + model dropdown
2. Chat input → OpenRouter → streaming response
3. Stop button

**بعد از اون → Phase 1.3:**
4. Chat UI مدرن (bubbles, code blocks, animations)

**بعد → Phase 2:**
5. File/Terminal tools

---

## دستور توسعه

```powershell
# Compile
npm run gulp -- compile-client

# Run dev
scripts\khatmax-dev.bat

# Build extension
cd extensions\khatmax-ai && node esbuild.mjs

# Full build (installer)
npm run gulp vscode-win32-x64
```
