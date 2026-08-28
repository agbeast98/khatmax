# Khatmax AI Docs

This folder is the entry point for both humans and agents.
Read the minimum set needed for the task. Do not open every file by default.

## Reading Order
1. `context/README.md` — what Khatmax is, what it is not, and the current product direction.
2. `role/README.md` — how an agent should behave in this repository.
3. One domain file only, based on the task:
   - `branding/README.md`
   - `project/README.md`
   - `git/README.md`
   - `developer/README.md`
   - `frontend/README.md`
   - `frontend/brief.md`
   - `deploy/README.md`
   - `migration/README.md`
   - `roadmap/README.md`
   - `notes/README.md`
4. `memory/current.md` — only when continuing an existing thread or restoring context.

## Token Rules
- Start with the smallest relevant doc set.
- Prefer one topic doc over several general docs.
- If a decision becomes stable, move it into the right topic doc and out of memory.
- If a change touches generated output, verify `git/README.md` before editing.

## Source Of Truth
- `context/README.md` defines the product direction.
- `branding/README.md` defines logo and visual identity rules.
- `project/README.md` defines the current repo map and key surfaces.
- `git/README.md` defines version-control rules.
- `memory/current.md` defines the live session state.

## Legacy Files
The flat markdown files in `.ai/` are retained for reference during migration.
Prefer the folder-based docs above for new work.
