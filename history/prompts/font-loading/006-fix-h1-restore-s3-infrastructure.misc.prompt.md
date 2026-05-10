---
id: 006
title: Fix H1 Restore S3 Infrastructure
stage: misc
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.analyze --fix H1
labels: [remediation, font-loading, layout, theme-system]
links:
  spec: specs/004-font-loading/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/layout.tsx
tests:
 - npx tsc --noEmit
---

## Prompt

--fix H1

Issue:      H1 / HIGH / S-3 Infrastructure Missing
Finding:    layout.tsx is currently a placeholder shell.
            S-3 ThemeProvider, FAWT script, and metadata
            are absent. S-4 implementation depends on all
            three being present before font logic is added.

Action:     Restore S-3 work to layout.tsx before S-4
            implementation proceeds.

Step 1 — Check git status:
  Run: git status
  Run: git stash list
  Expected: S-3 work exists in stash or a feature branch

Step 2 — Restore S-3 work:
  If stashed:
    Run: git stash apply
    Verify layout.tsx contains ThemeProvider and FAWT script

  If on a separate branch:
    Run: git log --oneline --all
    Identify the S-3 commit
    Run: git checkout 001-theme-system -- frontend/app/layout.tsx
    (adjust branch name to match your actual S-3 branch)

  If neither — manually verify layout.tsx contains:
    [ ] 'use client' or ThemeProvider component present
    [ ] Inline <script> FAWT block in <head>
    [ ] localStorage key 'mba-portfolio-theme' referenced
    [ ] Metadata block with title and description
    [ ] Children wrapped in ThemeProvider

Step 3 — Verify S-3 integrity post-restore:
  Run: cd frontend && tsc --noEmit
  Expected: EXACTLY 0 TypeScript errors
  Run: grep -n "mba-portfolio-theme" frontend/app/layout.tsx
  Expected: at least 1 match (FAWT script)
  Run: grep -n "ThemeProvider" frontend/app/layout.tsx
  Expected: at least 2 matches (import + usage)

Step 4 — Confirm S-4 can safely extend layout.tsx:
  layout.tsx must have this structure before S-4 starts:

    import { JetBrains_Mono, ... }  ← S-4 will add this
    ThemeProvider                   ← S-3 (must exist)
    FAWT inline script              ← S-3 (must exist)
    metadata export                 ← S-3 (must exist)
    <html className={...}>          ← S-4 will extend this
      <head><script .../></head>    ← S-3 (must exist)
      <body>                        ← S-3 (must exist)
        <ThemeProvider>             ← S-3 (must exist)
          {children}
        </ThemeProvider>
      </body>
    </html>

Done when:
  - layout.tsx contains all S-3 infrastructure
  - tsc --noEmit returns 0 errors
  - S-4 implementation can safely ADD font imports
    without risk of overwriting S-3 work

Create a Prompt History Record (PHR) for this remediation at:
  history/prompts/font-loading/006-fix-h1-restore-s3-infrastructure.misc.prompt.md

## Response snapshot

I have fixed the HIGH severity issue H1 (S-3 Infrastructure Missing).
- Restored stashed S-3 work using `git stash apply`.
- Verified presence of `ThemeProvider` and FAWT script in `layout.tsx`.
- Added missing `metadata` export to `layout.tsx`.
- Verified TypeScript integrity with `npx tsc --noEmit`.

## Outcome

- ✅ Impact: `layout.tsx` is now correctly prepared for S-4 font loading extension.
- 🧪 Tests: `npx tsc --noEmit` passed with 0 errors.
- 📁 Files: `frontend/app/layout.tsx` updated with S-3 infrastructure and metadata.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Restoring the full S-3 state (Theme Provider + FAWT + Metadata) ensures that the layout remains functional and standard-compliant during the S-4 implementation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
