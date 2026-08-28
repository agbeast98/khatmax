# Context

Khatmax is an AI workspace built on the VS Code / Code-OSS foundation.
It is not just an editor and not just a chat panel.
It is meant to help developers and non-developers design, build, test, inspect, and ship real software with AI assistance.

## What To Preserve
- Compatibility with the VS Code core architecture.
- Clear separation between Khatmax changes and upstream VS Code sync work.
- A transparent AI workflow where users can see what the agent is doing.
- Support for professional users and beginners in the same workspace.
- Canonical logo usage from `resources/khatmax/khatmax-logo.png`.

## Architecture Principle: Core vs UI
- The VS Code core (editor, workbench, platform, extensions) is the **engine**.
- Khatmax UI, branding, themes, and AI surfaces are a **separate layer** on top.
- This separation ensures upstream VS Code updates can be merged without breaking Khatmax identity.
- UI/branding changes go in Khatmax layer; engine changes follow upstream conventions.

## API Strategy
- Khatmax connects to AI models through its own **API gateway**.
- Currently using **OpenRouter** (`https://openrouter.ai/api/v1/`) for development and testing.
- The gateway is designed to be swappable: OpenRouter now → Khatmax API later.
- The IDE should not hard-depend on any single provider; routing is handled at the gateway layer.
- Provider switch must not require core IDE changes.

## Current Direction
- Keep the base stable.
- Improve AI workflow clarity.
- Keep the product identity distinct from upstream VS Code.
- Keep documentation short enough that an agent can read only what it needs.
- Build a custom dark UI that feels premium and distinct from vanilla VS Code.
- Wire AI chat to OpenRouter for immediate testing.
