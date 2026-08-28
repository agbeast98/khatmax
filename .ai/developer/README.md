# Developer

This doc is for people or agents changing code.
It is intentionally short and points to the rules that matter most.

## Working Rules
- Follow the VS Code coding conventions from `.github/copilot-instructions.md`.
- Keep changes localized to the layer they belong to.
- Respect dependency injection and disposables.
- Prefer existing patterns over new abstractions.
- Validate TypeScript before broader validation when code changes are involved.

## Practical Rules
- Do not mix feature changes with build-output cleanup.
- Do not leave temporary files behind.
- Keep work that touches upstream sync separate from Khatmax product changes.

