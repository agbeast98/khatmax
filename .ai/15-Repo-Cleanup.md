# Repo Cleanup Policy

## Goal
Keep Khatmax easy to sync with `microsoft/vscode` by separating:
- product changes that belong in git
- temporary build-only changes that must stay local

## What belongs in git
- `product.json`, branding, docs, and planned runtime behavior
- build files only when they are part of the product design
- changes that are required for long-term upstream sync

## What stays local
- patches inside `node_modules`
- one-off build hacks for the current machine
- temporary fixes for missing SDKs, tools, or environment setup
- generated files created only to make a local build pass

## Cleanup rules before commit
- Restore tracked files that were deleted by build steps.
- Delete untracked files created by local installs, especially extra `package-lock.json` files.
- Revert temporary build hacks before preparing a branch.
- Keep only the smallest possible diff for the product change.

## Branching rule
- `origin/main` is the Khatmax product branch.
- `upstream/main` is the source of truth from `microsoft/vscode`.
- Use a sync branch to merge upstream changes first, then merge that into product work.

## Workflow
1. Make the product change.
2. Run build or tests locally.
3. Remove any local-only fix that was only needed for the machine.
4. Clean the tree.
5. Commit only the real product diff.

## Review checkpoint
Before every commit, ask:
- Is this still needed after checkout on another machine?
- Does this reduce or increase upstream merge pain?
- Would I want this change in a future sync from VS Code?

