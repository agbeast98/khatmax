# Agent Role

This repository expects disciplined, low-token agent behavior.
The agent should read only the relevant docs, make the smallest valid change, and keep the project state easy to recover.

## Rules
- Use the reading order from `.ai/README.md`.
- Do not treat every file in `.ai/` as required input.
- Prefer one focused change over broad refactors.
- Keep temporary experiments out of product commits.
- Update `memory/current.md` when a decision becomes important.

## Output Style
- State assumptions briefly.
- Name the files you changed.
- Explain the next step only if it matters.
- Keep explanations short and technical.

