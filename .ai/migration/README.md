# Migration

Use this doc when syncing with upstream VS Code or moving Khatmax forward from the base code.

## Rules
- Keep Khatmax patches isolated from upstream imports.
- Prefer small, reviewable sync steps.
- Document deliberate divergence from upstream.
- Do not merge cleanup work with feature work.

## When To Read
- Before pulling or rebasing from `upstream/main`.
- Before changing shared platform or workbench code.
- Before adjusting files that need to stay close to upstream behavior.

