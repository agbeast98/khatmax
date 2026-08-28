# حذف کامل Copilot Branding — Plan دقیق

## مشکلات فعلی (از screenshot)

1. ❌ Modal "Build with AI Agents" → "Sign in to use GitHub Copilot"
2. ❌ لوگو splash نشون نمیده (Khatmax Dev متنی)
3. ❌ Sign In button بالا سمت راست → GitHub OAuth
4. ❌ "Copilot CLI" text تو modal
5. ❌ "Tailor Copilot to your project" text تو modal
6. ❌ chat panel "Build with Agent" → Copilot reference

## ریشه مشکلات

### مشکل ۱: Modal "Build with AI Agents"
- **Source:** `src/vs/workbench/contrib/chat/browser/chatSetup/chatSetupWelcome.ts`
- **Action:** این walkthrough modal باید غیرفعال بشه (بعداً خودمون میسازیم)
- **How:** setting `chat.setupWelcomeEnabled` رو false کنیم یا contribution رو disable

### مشکل ۲: لوگو نشون نمیده
- **Source:** `src/vs/code/electron-browser/workbench/workbench.ts` (splash)
- **Source:** `src/vs/workbench/browser/parts/sidebar/sidebarPart.ts` (sidebar)
- **Source:** `src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStarted.ts` (welcome)
- **Problem:** `FileAccess.asBrowserUri('resources/khatmax/khatmax-logo.png')` قبل از `_VSCODE_FILE_ROOT` initialization صدا زده میشه در splash. تو بقیه جاها OK.
- **Fix splash:** از `configuration.appRoot` + `vscode-file://` protocol استفاده کنیم
- **Fix sidebar:** FileAccess تو `updateStyles()` صدا زده میشه — باید timing OK باشه

### مشکل ۳: Sign In button
- **Source:** `src/vs/workbench/contrib/chat/browser/chatSetup/chatSetupContributions.ts`
- **Shows:** Title bar sign-in button (top right)
- **Reads:** `defaultChat.provider.default.name` → "Khatmax" (ما عوض کردیم)
- **But:** sign-in flow هنوز GitHub OAuth رو trigger میکنه
- **Fix:** Sign-in button رو نگه داریم ولی text رو عوض کنیم + flow رو به "coming soon" بفرستیم

### مشکل ۴: Remaining "Copilot" strings
- **Source:** فایل‌هایی که regex ما miss کرده (shorthands, compound words)
- **Fix:** دقیق‌تر grep و replace

## مراحل اجرا (به ترتیب)

### Step 1: غیرفعال کردن modal "Build with AI Agents"
- Find: chatSetupWelcome registration
- Disable: remove the walkthrough contribution or set flag to false

### Step 2: حذف ALL "Copilot" strings (شامل تمام patterns)
- Patterns to search:
  - `Copilot` (standalone)
  - `copilot` (in IDs — skip these, only UI text)
  - `GitHub Copilot` (already done but missed some)
  - `Copilot CLI` → `Khatmax Agent`
  - `Copilot Chat` → `Khatmax AI`
  - `copilot_` (tool IDs — keep)
- Scope: ALL of `src/vs/workbench/` and `src/vs/sessions/` (excluding tests)

### Step 3: Fix لوگو
- Splash: use proper vscode-file:// URL
- Welcome: verify FileAccess works after init
- Sidebar: verify CSS var works

### Step 4: Fix Sign In flow
- Button text: "Sign in to Khatmax" (verify it changed)
- Click action: show message "Khatmax auth coming soon, use API key"

### Step 5: Compile + Test
- `npm run gulp -- compile-client`
- `scripts\khatmax-dev.bat`
- Verify: no Copilot text anywhere visible
