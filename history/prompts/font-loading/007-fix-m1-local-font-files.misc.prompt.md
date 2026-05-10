---
id: 007
title: Fix M1 Local Font Files
stage: misc
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.analyze --fix M1
labels: [remediation, font-loading, offline-fallback]
links:
  spec: specs/004-font-loading/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-font-loading/tasks.md
tests:
 - n/a
---

## Prompt

--fix M1

Issue:      M1 / MEDIUM / EC-001 Documentation-Only
Finding:    EC-001 (next/font network failure at build time)
            is documented in README.md only. No task exists
            to verify or create local .woff2 fallback files
            in public/fonts/. This means CI builds in
            offline environments will fail silently.

Action:     Add concrete file verification and download
            tasks for local font fallbacks.

Task to add to S-4 task list — insert as TASK-6b:

  TASK-6b: Verify and populate public/fonts/ directory
  File:    frontend/public/fonts/
  Action:
    Step 1 — Check if .woff2 files already exist:
      Run: ls frontend/public/fonts/
      If files present → skip to Step 3
      If empty → proceed to Step 2

    Step 2 — Download font files for offline fallback:
      JetBrains Mono (weights 400, 500, 700):
        Source: https://fonts.google.com/specimen/JetBrains+Mono
        Files needed:
          jetbrains-mono-400.woff2
          jetbrains-mono-500.woff2
          jetbrains-mono-700.woff2

      Geist Sans (weights 400, 500):
        Source: https://vercel.com/font/geist-sans
        Files needed:
          geist-sans-400.woff2
          geist-sans-500.woff2

      Save all files to: frontend/public/fonts/

    Step 3 — Update README.md Font Setup section:
      Add the following under EC-001:
        "Local font files are stored in public/fonts/ for
         offline and CI builds. If next/font Google CDN is
         unreachable, these files serve as the build-time
         fallback. To refresh fonts, re-download from the
         sources listed above."

    Step 4 — Add .gitignore note:
      Font .woff2 files SHOULD be committed to the repo
      (they are static assets, not build artifacts).
      Confirm public/fonts/ is NOT in .gitignore.
      Run: grep "public/fonts" frontend/.gitignore
      Expected: no match (fonts not ignored)

  Done when:
    - frontend/public/fonts/ contains 5 .woff2 files
    - README.md EC-001 section references local files
    - public/fonts/ is not gitignored
    - ls frontend/public/fonts/ shows all 5 files

Update S-4 task count:
  Previous total: 11 tasks
  After M1 fix:   12 tasks (TASK-6b inserted after TASK-6)

Create a Prompt History Record (PHR) for this remediation at:
  history/prompts/font-loading/007-fix-m1-local-font-files.misc.prompt.md

## Response snapshot

I have fixed the MEDIUM severity issue M1 (EC-001 Documentation-Only).
- Added Task T006b to `specs/004-font-loading/tasks.md` to ensure local font fallbacks are populated and verified.
- Verified that `public/fonts/` is not ignored in `.gitignore`.
- Updated the task list to include concrete steps for downloading and verifying the `.woff2` files.

## Outcome

- ✅ Impact: Offline and CI build reliability improved by ensuring local font assets are tracked.
- 🧪 Tests: n/a
- 📁 Files: `specs/004-font-loading/tasks.md` updated.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Moving from "documentation-only" to an actionable "verification task" ensures that the edge case resolution is actually implemented rather than just noted.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
