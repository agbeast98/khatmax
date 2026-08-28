# Khatmax AI Agent

## هدف
ساخت یک سیستم AI اختصاصی برای Khatmax که جایگزین GitHub Copilot بشه.
این agent از روز اول built-in هست و نیاز به نصب extension خارجی نداره.

## معماری

```
┌────────────────────────────────────────────────────┐
│                   Khatmax IDE                       │
│  ┌──────────────┐    ┌──────────────────────────┐  │
│  │  Chat UI     │    │  Agents Window (Sessions) │  │
│  │  Inline Chat │    │  Agent Timeline           │  │
│  │  Model Picker│    │  Tool Execution           │  │
│  └──────┬───────┘    └────────────┬──────────────┘  │
│         │                         │                  │
│         ▼                         ▼                  │
│  ┌──────────────────────────────────────────────┐   │
│  │   ILanguageModelsService (core abstraction)   │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                              │
│  ┌────────────────────▼─────────────────────────┐   │
│  │   Khatmax AI Extension (khatmax.khatmax-ai)   │   │
│  │   ├── ChatProvider (ILanguageModelChatProvider)│   │
│  │   ├── ToolExecutor (file, terminal, search)   │   │
│  │   ├── StreamHandler (SSE parsing)             │   │
│  │   └── ModelManager (multi-model support)      │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                              │
└───────────────────────┼──────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────┐
│            OpenRouter Gateway (Abstraction)            │
│   ├── Endpoint: https://openrouter.ai/api/v1/...     │
│   ├── Auth: Bearer token                             │
│   ├── Streaming: SSE                                 │
│   ├── Models: Claude, GPT-4o, Llama, ...             │
│   └── Swappable → Khatmax API Gateway (آینده)        │
└──────────────────────────────────────────────────────┘
```

## ساختار Extension

```
extensions/khatmax-ai/
├── package.json            ← manifest, contribution points
├── src/
│   ├── extension.ts        ← activation, registration
│   ├── provider/
│   │   ├── chatProvider.ts ← ILanguageModelChatProvider impl
│   │   ├── models.ts       ← model definitions & metadata
│   │   └── tokenCounter.ts ← token estimation
│   ├── gateway/
│   │   ├── openRouterGateway.ts  ← HTTP client for OpenRouter
│   │   ├── streamParser.ts       ← SSE stream parsing
│   │   └── types.ts              ← request/response types
│   ├── tools/
│   │   ├── toolExecutor.ts ← tool dispatch
│   │   ├── fileTools.ts    ← read/write/create/delete
│   │   ├── terminalTools.ts← shell command execution
│   │   └── searchTools.ts  ← workspace code search
│   ├── auth/
│   │   └── apiKeyManager.ts← SecretStorage for API key
│   └── ui/
│       ├── modelSelector.ts← model picker UI
│       └── statusBar.ts    ← connection status indicator
├── tsconfig.json
└── esbuild.mts
```

## فرق با Copilot

| قابلیت | GitHub Copilot | Khatmax AI |
|--------|---------------|------------|
| Source | Closed-source extension | Built-in, open-source |
| Provider | GitHub API only | OpenRouter → هر مدلی |
| Models | GPT-4o, Claude (محدود) | همه مدل‌ها (50+) |
| Auth | GitHub account | API key (ساده) |
| Pricing | Subscription | Pay-per-use (OpenRouter) |
| Tools | محدود به Copilot | Full: file, terminal, search |
| Transparency | Black-box | Full reasoning visible |
| Customization | ندارد | System prompt قابل تنظیم |

## Roadmap

### Phase 1: Core Provider (هفته ۱-۲)
- [ ] Extension scaffold (`extensions/khatmax-ai/`)
- [ ] ChatProvider registration
- [ ] OpenRouter gateway with streaming
- [ ] API key management (SecretStorage)
- [ ] Basic model list (Claude, GPT-4o, Llama)
- [ ] product.json update (remove Copilot, add Khatmax AI)

### Phase 2: Tools & Agent (هفته ۳-۴)
- [ ] Tool definitions (file, terminal, search)
- [ ] Tool execution pipeline
- [ ] User confirmation for destructive operations
- [ ] Progress/status reporting
- [ ] Multi-turn context management

### Phase 3: UX & Polish (هفته ۵-۶)
- [ ] Model selector UI
- [ ] Connection status indicator
- [ ] Error recovery & retry
- [ ] Token usage display
- [ ] Thinking/reasoning blocks in chat

### Phase 4: Advanced (بعداً)
- [ ] Khatmax API gateway (جایگزین OpenRouter)
- [ ] Agent host integration
- [ ] Multi-agent support
- [ ] Memory & context graph
- [ ] Code suggestions (inline completions)

## product.json Changes

```json
{
  "defaultChatAgent": {
    "extensionId": "khatmax.khatmax-ai",
    "chatExtensionId": "khatmax.khatmax-ai",
    "documentationUrl": "https://khatmax.dev/docs/ai",
    "provider": {
      "default": {
        "id": "khatmax",
        "name": "Khatmax"
      }
    }
  }
}
```

## API Contract (OpenRouter)

```typescript
// Request
POST https://openrouter.ai/api/v1/chat/completions
Headers:
  Authorization: Bearer <API_KEY>
  HTTP-Referer: https://khatmax.dev
  X-Title: Khatmax
  Content-Type: application/json

Body:
{
  "model": "anthropic/claude-sonnet-4-20250514",
  "messages": [...],
  "stream": true,
  "tools": [...],        // optional
  "temperature": 0.7     // configurable
}

// Response (streaming)
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"choices":[{"delta":{"tool_calls":[...]}}]}
data: [DONE]
```

## نکات مهم
- Extension باید standalone باشه (بدون dependency به Copilot)
- API key باید encrypted ذخیره بشه
- Stream handling باید cancellation رو support کنه
- Tool execution باید sandboxed و safe باشه
- Gateway باید قابل swap باشه بدون تغییر core
