# Git

This doc defines version-control behavior for Khatmax.

## Branch Model
- `origin/main` is the Khatmax repository branch.
- `upstream/main` is the Microsoft VS Code source branch.
- Keep upstream sync work separate from product work whenever possible.

## Commit Hygiene
- Separate temporary build changes from real product changes.
- Do not leave generated files staged unless they are meant to ship.
- Before review, check that `git status` contains only intentional diffs.
- If a change is only for local build or debugging, restore it before finishing.

## Review Rule
- If a diff is hard to explain, it is probably mixed with unrelated work.
- Split it before continuing.

