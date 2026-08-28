# Project

This doc is the fast map of the repository.
Use it when you need to find the right area before editing code.

## Main Areas
- `src/` — core TypeScript source, including platform, editor, workbench, sessions, and server code.
- `extensions/` — built-in extensions that ship with the product.
- `build/` — build scripts, packaging, and release plumbing.
- `test/` — integration and system tests.
- `.vscode/` — workspace-level tooling, tasks, and launch settings.
- `.ai/` — agent-facing guidance and session memory.
- `.doc/` — personal build and release notes.
- `resources/khatmax/` — canonical Khatmax brand assets, including the logo.

## Important Khatmax Surfaces
- `src/vs/sessions/` — AI workspace and session-oriented surfaces.
- `src/vs/workbench/` — core UI and workbench behavior.
- `src/vs/platform/` — shared services and product-level infrastructure.
- `src/vs/server/` — server-side behavior.
- `product.json` and related branding files — product identity and build metadata.

## Use This Doc For
- Locating the right folder before making a change.
- Checking whether a change belongs in core, workbench, extension, or build code.
- Understanding which areas should stay aligned with upstream VS Code.
