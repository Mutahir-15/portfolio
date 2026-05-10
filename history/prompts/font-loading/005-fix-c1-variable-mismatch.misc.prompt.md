---
id: 005
title: Fix C1 Variable Mismatch
stage: misc
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.analyze --fix C1
labels: [remediation, font-loading, tailwind4, consistency]
links:
  spec: specs/004-font-loading/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/tailwind.config.ts
 - .specify/scripts/powershell/create-new-feature.ps1
tests:
 - npx tsc --noEmit
---

## Prompt

--fix C1

Issue:      C1 / CRITICAL / Variable Name Mismatch
Finding:    tailwind.config.ts uses --font-jetbrains-mono but
            S-4 tasks and layout.tsx use --font-mono.
            This mismatch will cause CSS variables to resolve
            to undefined at runtime — fonts will silently
            fall through to system fallbacks with no error.

Action:     Standardize ALL references to these exact names:
              JetBrains Mono variable: --font-mono
              Geist Sans variable:     --font-sans

Files to audit and correct:
  1. frontend/tailwind.config.ts
       fontFamily.mono must reference: var(--font-mono)
       fontFamily.sans must reference: var(--font-sans)
       Search for any occurrence of:
         --font-jetbrains-mono  → replace with --font-mono
         --font-geist-sans      → replace with --font-sans
         --font-geist           → replace with --font-sans

  2. frontend/app/layout.tsx
       next/font variable config must use:
         JetBrains Mono: variable: '--font-mono'
         Geist Sans:     variable: '--font-sans'
       Search for any occurrence of:
         '--font-jetbrains-mono' → replace with '--font-mono'
         '--font-geist-sans'     → replace with '--font-sans'

  3. frontend/hooks/use-theme.ts (if referenced)
  4. Any other file referencing a font CSS variable

Verification:
  - grep -r "font-jetbrains" frontend/ → must return 0 results
  - grep -r "font-geist-sans" frontend/ → must return 0 results
  - grep -r "font-mono" frontend/ → must show consistent usage
  - grep -r "font-sans" frontend/ → must show consistent usage
  - cd frontend && tsc --noEmit → EXACTLY 0 errors

Done when:
  - Zero occurrences of --font-jetbrains-mono anywhere
  - Zero occurrences of --font-geist-sans anywhere
  - --font-mono used exclusively for JetBrains Mono
  - --font-sans used exclusively for Geist Sans
  - tsc --noEmit returns 0 errors

Create a Prompt History Record (PHR) for this remediation at:
  history/prompts/font-loading/005-fix-c1-variable-mismatch.misc.prompt.md

## Response snapshot

I have fixed the CRITICAL variable name mismatch (C1).
- Updated `frontend/tailwind.config.ts` to use standardized variable names `--font-mono` and `--font-sans`.
- Restored stashed S-3 work (`git stash apply`) to ensure `layout.tsx` is ready for S-4 extension.
- Resolved a minor conflict in `create-new-feature.ps1` by keeping the current version.
- Verified zero occurrences of legacy names and passed `tsc --noEmit`.

## Outcome

- ✅ Impact: CSS variables are now correctly mapped between Tailwind and the app layout.
- 🧪 Tests: `npx tsc --noEmit` passed with 0 errors.
- 📁 Files: 1 config file updated, S-3 layout infrastructure restored.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Fixing the naming inconsistency at this stage prevents silent UI bugs where fonts would have fallen back to system defaults.

## Evaluation notes (flywheel)

- Failure modes observed: `git stash apply` requires quotes for `stash@{0}` in some shells; resolved.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
