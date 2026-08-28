# Requirements Document

## Introduction

Khatmax AI Agent is a fully autonomous AI assistant built into Khatmax IDE. Unlike Cursor or Kiro which primarily suggest code, Khatmax AI **executes** tasks end-to-end. Users authenticate via their Khatmax account (subscription-based, no API keys needed) and interact through two modes: Normal (with confirmations) and Auto (full autonomy). The agent connects to the Khatmax API gateway which routes to multiple AI models. It replaces GitHub Copilot entirely as the default AI system.

**Key differentiators from competition:**
- Full autonomy in Auto mode (file ops, terminal, git, deploy — no interruptions)
- Subscription-based auth (login → works, no API key setup)
- Guided onboarding with skippable tutorial modals
- Project scaffolding from a single prompt
- Auto test generation + bug detection + fix loop

## Glossary

- **Khatmax_Agent**: The built-in extension that registers as the default language model chat provider in Khatmax IDE, replacing GitHub Copilot.
- **OpenRouter_Gateway**: The API gateway layer that routes requests to OpenRouter (`https://openrouter.ai/api/v1/chat/completions`) and is designed to be swapped for a Khatmax-owned API without IDE changes.
- **Model_Selector**: The UI component that allows users to browse and switch between available AI models (Claude, GPT-4o, Llama, etc.) within the chat interface.
- **Chat_Provider**: The implementation of `ILanguageModelChatProvider` that registers with the language model service and handles request routing.
- **Tool_Executor**: The subsystem responsible for executing agent tools (file edits, terminal commands, code generation) on behalf of the AI model.
- **API_Key_Store**: The secure credential storage for OpenRouter API keys, using the VS Code secrets API.
- **Stream_Handler**: The component that processes Server-Sent Events (SSE) streaming responses from OpenRouter and converts them to VS Code language model response format.
- **Agent_Session**: A conversation instance within the Agents Window that maintains context, history, and tool state across multiple turns.

## Requirements

### Requirement 1: Extension Registration as Default Chat Agent

**User Story:** As a Khatmax user, I want the IDE to have its own AI agent out of the box, so that I do not need to install or configure GitHub Copilot.

#### Acceptance Criteria

1. WHEN Khatmax IDE starts, THE Khatmax_Agent SHALL register as a language model chat provider via `ILanguageModelsService.registerLanguageModelProvider()` with the vendor identifier `khatmax`.
2. THE Khatmax_Agent SHALL be declared as the `defaultChatAgent` in `product.json`, replacing the GitHub Copilot extension references.
3. WHEN the Khatmax_Agent registers, THE Chat_Provider SHALL emit available model metadata including model id, name, family, vendor, max input tokens, and max output tokens for each model.
4. IF the Khatmax_Agent fails to register during startup, THEN THE Khatmax_Agent SHALL log the failure reason and present a user-visible notification with a retry action.

### Requirement 2: OpenRouter API Gateway Integration

**User Story:** As a Khatmax developer, I want the AI provider to connect through an abstraction layer to OpenRouter, so that the backend can be swapped later without changing the IDE core.

#### Acceptance Criteria

1. THE OpenRouter_Gateway SHALL send chat completion requests to `https://openrouter.ai/api/v1/chat/completions` using the OpenAI-compatible request format.
2. WHEN a chat request is initiated, THE OpenRouter_Gateway SHALL include the HTTP headers `Authorization` (Bearer token), `HTTP-Referer` (Khatmax application URL), and `X-Title` (Khatmax).
3. THE OpenRouter_Gateway SHALL expose an interface that decouples the IDE from the specific API endpoint, allowing a different backend URL and authentication scheme to be substituted without modifying calling code.
4. IF the OpenRouter API returns an HTTP error status, THEN THE OpenRouter_Gateway SHALL map the error to a structured error object containing the HTTP status code, error type, and a user-readable message.
5. WHEN a request is sent, THE OpenRouter_Gateway SHALL include a configurable timeout defaulting to 60 seconds, after which it cancels the request and returns a timeout error.

### Requirement 3: Streaming Response Handling

**User Story:** As a Khatmax user, I want to see AI responses appear incrementally as they are generated, so that I get immediate feedback during long responses.

#### Acceptance Criteria

1. WHEN a chat request is sent, THE Stream_Handler SHALL request streaming mode (`stream: true`) from the OpenRouter API.
2. WHILE the OpenRouter API is streaming a response, THE Stream_Handler SHALL yield each content delta as an `IChatResponsePart` to the language model service in real time.
3. WHEN the stream emits a `[DONE]` sentinel, THE Stream_Handler SHALL finalize the response and signal completion to the caller.
4. IF the stream connection is interrupted before receiving `[DONE]`, THEN THE Stream_Handler SHALL emit an error event containing the partial response length and the disconnection reason.
5. WHEN a `CancellationToken` is cancelled by the user, THE Stream_Handler SHALL abort the underlying HTTP connection and stop yielding response parts.

### Requirement 4: Multi-Model Support and Selection

**User Story:** As a Khatmax user, I want to choose from multiple AI models (Claude, GPT-4o, Llama, etc.), so that I can pick the best model for each task.

#### Acceptance Criteria

1. WHEN the Khatmax_Agent initializes, THE Chat_Provider SHALL query the OpenRouter models endpoint and expose at minimum: Claude Sonnet 4, Claude Haiku 3.5, GPT-4o, GPT-4o-mini, and Llama 3.1 70B.
2. THE Model_Selector SHALL display each model with its name, provider family, context window size, and pricing tier.
3. WHEN the user selects a different model in the Model_Selector, THE Chat_Provider SHALL route subsequent requests to the selected model identifier on OpenRouter.
4. THE Chat_Provider SHALL persist the user's last selected model per workspace using the VS Code storage service, and restore that selection on next startup.
5. WHEN OpenRouter reports a model as unavailable or deprecated, THE Chat_Provider SHALL mark that model as disabled in the Model_Selector and display a notice to the user.

### Requirement 5: API Key Management

**User Story:** As a Khatmax user, I want to securely store my OpenRouter API key, so that my credentials are protected and I only need to enter the key once.

#### Acceptance Criteria

1. WHEN the user first activates the Khatmax_Agent without a stored API key, THE Khatmax_Agent SHALL prompt the user to enter their OpenRouter API key via an input dialog.
2. THE API_Key_Store SHALL persist the API key using the VS Code `SecretStorage` API, ensuring the key is encrypted at rest.
3. WHEN a stored API key is found, THE Khatmax_Agent SHALL validate it by sending a lightweight request to the OpenRouter API before marking the provider as ready.
4. IF the API key validation fails with a 401 or 403 status, THEN THE Khatmax_Agent SHALL clear the stored key, notify the user that the key is invalid, and re-prompt for a new key.
5. THE Khatmax_Agent SHALL provide a command `khatmax.ai.setApiKey` to allow the user to update the API key at any time through the command palette.

### Requirement 6: Chat Request Formation

**User Story:** As a Khatmax user, I want the AI to understand my conversation context including system prompts and tool definitions, so that responses are relevant to my coding task.

#### Acceptance Criteria

1. WHEN the Chat_Provider receives a `sendChatRequest` call, THE Chat_Provider SHALL map each `IChatMessage` to the OpenAI-compatible message format preserving role (system, user, assistant) and content.
2. THE Chat_Provider SHALL include tool definitions in the request body when the request options specify available tools, formatted as OpenAI function-calling schema.
3. WHEN a model response contains a tool call, THE Chat_Provider SHALL yield a tool-call response part containing the function name, arguments, and call identifier.
4. THE Chat_Provider SHALL enforce the model's maximum context window by truncating older messages from the conversation history while preserving the system prompt and the most recent user message.

### Requirement 7: Token Counting

**User Story:** As a Khatmax user, I want accurate token usage reporting, so that I can manage costs and understand context window utilization.

#### Acceptance Criteria

1. WHEN `provideTokenCount` is called, THE Chat_Provider SHALL estimate the token count for the given message using a tokenizer appropriate for the active model family.
2. THE Chat_Provider SHALL use tiktoken-compatible counting for GPT-family models and character-based estimation (4 characters per token) as a fallback for models without a dedicated tokenizer.
3. THE Chat_Provider SHALL report usage metadata (prompt tokens, completion tokens, total tokens) from the OpenRouter response headers or response body when available.

### Requirement 8: Agent Tool Capabilities

**User Story:** As a Khatmax user, I want the AI agent to perform actions like editing files, running terminal commands, and searching code, so that it can complete tasks autonomously.

#### Acceptance Criteria

1. THE Tool_Executor SHALL support file-system tools: read file, write file, create file, and delete file, executing operations via the VS Code `IFileService`.
2. THE Tool_Executor SHALL support terminal execution: run a shell command and return its stdout, stderr, and exit code.
3. THE Tool_Executor SHALL support code search: grep-style search across the workspace via `ISearchService`.
4. WHEN the AI model issues a tool call, THE Tool_Executor SHALL validate the tool name and arguments against the registered tool schema before execution.
5. IF a tool execution fails, THEN THE Tool_Executor SHALL return a structured error to the model containing the tool name, error type, and a descriptive message, allowing the model to retry or inform the user.
6. WHEN a tool targets a destructive operation (file delete, overwrite), THE Tool_Executor SHALL request user confirmation before executing, unless the user has opted into auto-approve mode.

### Requirement 9: Transparent AI Execution

**User Story:** As a Khatmax user, I want to see what the AI is doing at each step, so that I can understand its reasoning and intervene if needed.

#### Acceptance Criteria

1. WHILE the Khatmax_Agent is processing a multi-step task, THE Khatmax_Agent SHALL emit progress events indicating the current step name and its status (pending, running, completed, failed).
2. WHEN the AI model produces a reasoning or planning step, THE Khatmax_Agent SHALL surface it in the chat UI as a collapsible thinking block.
3. THE Khatmax_Agent SHALL provide a stop action that cancels the current agent operation at the next safe cancellation point.
4. WHEN a tool is executed, THE Khatmax_Agent SHALL display the tool name, input summary, and output summary in the chat timeline before continuing to the next step.

### Requirement 10: product.json Configuration Update

**User Story:** As a Khatmax maintainer, I want the product configuration to reference the Khatmax agent extension, so that the IDE uses Khatmax AI by default instead of Copilot.

#### Acceptance Criteria

1. THE `product.json` `defaultChatAgent.extensionId` SHALL be set to `khatmax.khatmax-ai`.
2. THE `product.json` `defaultChatAgent.chatExtensionId` SHALL be set to `khatmax.khatmax-ai-chat`.
3. THE `product.json` SHALL include Khatmax-specific URLs for documentation, privacy statement, and terms of service under the `defaultChatAgent` block.
4. THE `product.json` `defaultChatAgent.provider.default` SHALL reference `{ "id": "khatmax", "name": "Khatmax" }`.

### Requirement 11: Graceful Degradation and Error Recovery

**User Story:** As a Khatmax user, I want the AI system to handle failures gracefully, so that a temporary API issue does not crash my IDE or lose my work.

#### Acceptance Criteria

1. IF the OpenRouter API is unreachable, THEN THE OpenRouter_Gateway SHALL retry the request up to 3 times with exponential backoff (1s, 2s, 4s) before reporting failure.
2. IF all retry attempts fail, THEN THE Khatmax_Agent SHALL display an inline error in the chat view with the failure reason and a manual retry button.
3. WHILE the API is unreachable, THE Model_Selector SHALL display a connectivity warning indicator and disable new request submission.
4. IF a rate limit response (HTTP 429) is received, THEN THE OpenRouter_Gateway SHALL read the `Retry-After` header and delay the next request accordingly, informing the user of the wait duration.

### Requirement 12: Extension Packaging and Distribution

**User Story:** As a Khatmax maintainer, I want the AI agent to ship as a built-in extension, so that users have it available immediately after installation.

#### Acceptance Criteria

1. THE Khatmax_Agent SHALL be packaged as a VS Code extension under `extensions/khatmax-ai/` within the source tree.
2. THE Khatmax_Agent extension `package.json` SHALL declare the `languageModelChat` contribution point with vendor `khatmax`.
3. THE Khatmax_Agent SHALL be included in the `builtInExtensions` array in `product.json` so it ships with every Khatmax build.
4. THE Khatmax_Agent extension SHALL activate on the `onStartupFinished` activation event to avoid blocking IDE startup.


### Requirement 13: Khatmax Account Authentication

**User Story:** As a Khatmax user, I want to login with my Khatmax account so that AI works immediately without any API key configuration.

#### Acceptance Criteria

1. WHEN the user first opens the chat panel without being logged in, THE Khatmax_Agent SHALL display a branded login button "Login to Khatmax" with the Khatmax logo.
2. WHEN the user clicks login, THE Khatmax_Agent SHALL open the system browser to `https://khatmax.dev/auth/ide` with an OAuth authorization flow.
3. WHEN authentication completes, THE Khatmax_Agent SHALL receive and securely store the access token and refresh token using `SecretStorage`.
4. THE Khatmax_Agent SHALL automatically refresh the access token before expiry using the stored refresh token, without user interaction.
5. WHEN the user is logged in, THE chat panel SHALL immediately become active and display available models based on the user's subscription tier.
6. THE Khatmax_Agent SHALL provide a `khatmax.ai.logout` command to clear stored credentials and return to the login state.

### Requirement 14: Normal/Auto Mode Switch

**User Story:** As a Khatmax user, I want to switch between Normal mode (with confirmations) and Auto mode (full autonomy), so that I can choose my comfort level of AI independence.

#### Acceptance Criteria

1. THE Khatmax_Agent SHALL default to Normal mode on first use.
2. IN Normal mode, THE Khatmax_Agent SHALL request user confirmation before: writing/deleting files, executing terminal commands, installing packages, and performing git operations.
3. THE Khatmax_Agent SHALL provide a clearly visible toggle in the chat header to switch between Normal and Auto mode.
4. WHEN the user switches to Auto mode, THE Khatmax_Agent SHALL display a confirmation dialog stating: "AI will have full access to your workspace. It can create, edit, and delete files, run terminal commands, and perform git operations without asking. You can stop it anytime."
5. IN Auto mode, THE Khatmax_Agent SHALL execute all tool operations without individual confirmations, reporting actions in the timeline after completion.
6. THE Khatmax_Agent SHALL provide a prominent Stop button that cancels all pending operations immediately when clicked, regardless of mode.
7. THE mode selection SHALL be persisted per workspace using the VS Code storage service.

### Requirement 15: Onboarding Tutorial Modals

**User Story:** As a new Khatmax user, I want a guided introduction to the AI features so that I can quickly understand what Khatmax AI can do, with the option to skip if I already know.

#### Acceptance Criteria

1. WHEN a user opens Khatmax for the first time (no stored onboarding-complete flag), THE Khatmax_Agent SHALL display a multi-step onboarding modal overlay.
2. THE onboarding modal SHALL consist of 4-5 slides covering: Welcome/Login, Chat Basics, Auto Mode explanation, Tool capabilities overview, and a "Ready to start" final slide.
3. EACH onboarding slide SHALL include: a title, a brief description (max 2 sentences), a visual illustration or animation, a "Next" button, and a "Skip Tutorial" link.
4. WHEN the user completes or skips the onboarding, THE Khatmax_Agent SHALL set a `khatmax.onboarding.completed` flag in profile storage and never show the modal again.
5. THE Khatmax_Agent SHALL provide a command `khatmax.ai.showOnboarding` to re-trigger the onboarding modal at any time from the command palette.
6. THE onboarding modal SHALL be styled with the Khatmax Dark theme colors (teal accent, dark navy background) and include the Khatmax logo.
7. THE onboarding slides SHALL be smooth-animated with fade/slide transitions, respecting the user's reduced-motion preferences.

### Requirement 16: Subscription Tier Awareness

**User Story:** As a Khatmax user, I want the AI to respect my subscription tier limits, so that I understand what features are available to me.

#### Acceptance Criteria

1. WHEN the user authenticates, THE Khatmax_Agent SHALL fetch the user's subscription tier (free, pro, enterprise) from the Khatmax API.
2. THE Model_Selector SHALL only display models available for the user's subscription tier.
3. IF the user reaches their usage limit (messages/tokens per period), THEN THE Khatmax_Agent SHALL display a clear message indicating the limit was reached and offer an upgrade link.
4. IN free tier, Auto mode SHALL be limited to 10 autonomous actions per session before requiring re-confirmation.
5. THE Khatmax_Agent SHALL display the user's remaining quota in the status bar when below 20% of the period limit.

### Requirement 17: Copilot Removal from Default Configuration

**User Story:** As a Khatmax maintainer, I want GitHub Copilot references removed from the default product configuration so that Khatmax AI is the sole default AI provider.

#### Acceptance Criteria

1. THE `product.json` `defaultChatAgent` block SHALL reference `khatmax.khatmax-ai` instead of `GitHub.copilot`.
2. THE `product.json` SHALL NOT include GitHub Copilot in the `builtInExtensionsEnabledWithAutoUpdates` array.
3. THE `product.json` `trustedExtensionAuthAccess` SHALL reference Khatmax provider instead of GitHub.
4. THE Copilot extension (`extensions/copilot/`) SHALL be excluded from the build pipeline via the gulp configuration, reducing build size by ~2.4 GB.
5. THE `github-authentication` extension SHALL remain available but not be a required dependency for AI functionality.
