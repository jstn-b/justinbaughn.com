---
name: ship
description: >-
  Commit and push changes to GitHub. Use when the user says "commit", "ship",
  "push", "deploy", "save progress", or asks to commit to GitHub.
---

# Ship

Stage all changes, generate a commit message from the diff, and push to `main`.

## Workflow

1. Run `git status` and `git diff --stat` to understand what changed
2. Stage everything: `git add -A`
3. Write a commit message:
   - One-line summary (imperative mood, max 72 chars)
   - Focus on *what* changed from the user's perspective, not implementation details
   - Examples: "add carousel hover slow-down", "update avatar video crop", "adjust section spacing"
4. Commit: `git commit -m "<message>"`
5. Push: `git push origin main`
6. Report the commit hash and confirm push succeeded

## Rules

- Never commit `.env`, credentials, or secrets
- If push fails due to remote changes, run `git pull --rebase` then push again
- If there are no changes to commit, say so and stop
- Group related changes into one commit; don't split micro-edits unless the user asks
