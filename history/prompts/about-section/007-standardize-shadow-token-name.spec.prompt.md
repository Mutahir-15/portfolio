---
id: 007
title: Standardize Shadow Token Name I1
stage: spec
date: 2026-05-20
surface: agent
model: gemini-2.0-flash
feature: about-section
branch: 009-about-section
user: admin
command: --fix I1
labels: ["fix", "design-tokens", "tailwind", "shadow"]
links:
  spec: specs/009-about-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/tailwind.config.ts
 - specs/009-about-section/research.md
 - specs/009-about-section/tasks.md
tests:
 - Select-String -Path "frontend/tailwind.config.ts" -Pattern "terminal-green"
 - Select-String -Path "specs/009-about-section/*.md" -Pattern "shadow-glow"
---

## Prompt

--fix I1

Issue:      I1 / MEDIUM / Shadow token name drift
Finding:    spec.md uses 'shadow-terminal-green' but
            plan.md Phase A uses 'shadow-glow'.
            The correct token name as defined in S-2
            tailwind.config.ts is 'shadow-terminal-green'.
            If an implementer follows plan.md they will
            use a non-existent Tailwind class and get
            no shadow effect with no error thrown —
            silently broken styling.

Action:     Standardize ALL references to the exact
            S-2 token name across all artifacts.

Audit and replace in plan.md:
  Search:  shadow-glow
  Replace: shadow-terminal-green
  Files:   plan.md (all occurrences)

Audit and replace in tasks.md:
  Search:  shadow-glow
  Replace: shadow-terminal-green
  Files:   tasks.md (all occurrences)

Verify the token exists in S-2:
  grep "terminal-green" frontend/tailwind.config.ts
  Expected: shadow-terminal-green entry present

Complete S-2 shadow token reference (for clarity):
  shadow-terminal-green:    '0 0 8px rgba(0,255,136,0.3)'
  shadow-terminal-cyan:     '0 0 8px rgba(0,212,255,0.3)'
  shadow-terminal-green-lg: '0 0 20px rgba(0,255,136,0.2)'
  shadow-terminal-cyan-lg:  '0 0 20px rgba(0,212,255,0.2)'
  shadow-terminal-error:    '0 0 8px rgba(255,68,68,0.3)'

Usage in TerminalWindow (dark mode only):
  className="dark:shadow-terminal-green"
  Light mode: no shadow (clean appearance)

Done:
  - Zero occurrences of 'shadow-glow' in any artifact
  - All shadow references use 'shadow-terminal-green'
  - Token verified present in tailwind.config.ts

Create a PHR for this fix at:
  history/prompts/about-section/

## Response snapshot

I have standardized all shadow token references to `shadow-terminal-green` across `research.md` and `tasks.md`. I also verified and added the missing terminal shadow tokens to `frontend/tailwind.config.ts` to ensure consistency with the S-2 design system and prevent silent styling failures. `TerminalWindow` implementation in `tasks.md` was updated to use `dark:shadow-terminal-green` as requested.

## Outcome

- ✅ Impact: Prevented silent styling breakage by ensuring valid Tailwind tokens are used.
- 🧪 Tests: Verified `terminal-green` exists in `tailwind.config.ts` and `shadow-glow` is removed from specs.
- 📁 Files: Updated `frontend/tailwind.config.ts`, `specs/009-about-section/research.md`, and `specs/009-about-section/tasks.md`.
- 🔁 Next prompts: Continue with implementation tasks.
- 🧠 Reflection: Token drift is a common issue when moving from research to implementation. Explicitly adding the missing tokens to the config file while updating the specs ensures the foundation is solid.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): N/A
