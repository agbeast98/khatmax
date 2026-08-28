# Current Memory

## وضعیت
- Branding: DONE (Copilot حذف، Khatmax AI جایگزین)
- Theme: DONE (Khatmax Dark navy/teal)
- Extension khatmax-ai: scaffold ساخته شده، detect میشه
- Dev mode: `scripts\khatmax-dev.bat`
- **Phase 1.3: Chat UI اختصاصی — DONE ✅**
  - Welcome state با لوگو و features grid
  - Chat bubbles (user/AI) با animation
  - Code blocks با syntax highlighting + copy button
  - Loading animation (teal dots)
  - Stop button
  - Settings overlay (API key + model dropdown)
  - Model indicator badge
  - Clear chat button
  - Simulated responses (بدون API واقعی)

## Task فعلی (از FULL-ROADMAP.md)
انجام همه کارهای UI/UX و ساختاری — بدون اتصال AI و اشتراک:
- ~~Phase 1.3: Chat UI اختصاصی~~ ✅ DONE
- Phase 2.4: Normal/Auto mode toggle
- Phase 3.1: Inline Chat UI (Ctrl+K)
- Phase 3.3: Smart Actions (right-click menu)
- Phase 3.4: Context panel
- Phase 4.1: Project scaffold wizard UI

## اتصال AI و اشتراک (بعداً — الان انجام نمیدیم):
- OpenRouter API connection
- Streaming responses
- Subscription/OAuth
- Backend gateway

## دستورات
```
npm run gulp -- compile-client
scripts\khatmax-dev.bat
cd extensions\khatmax-ai && node esbuild.mjs
```
