---
id: 008
title: Fix border radius token name drift
stage: misc
date: 2026-05-23
surface: agent
model: gemini-2.0-flash-exp
feature: about-section
branch: 009-about-section
user: ADMINS
command: --fix I2
labels: ["design-tokens", "consistency", "tailwind"]
links:
  spec: /specs/009-about-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/tailwind.config.ts
  - specs/009-about-section/tasks.md
  - specs/009-about-section/research.md
tests:
  - grep verification of tokens in tailwind.config.ts
  - grep verification of rounded-lg removal in specs/
---

## Prompt

--fix I2

Issue:      I2 / MEDIUM / Border radius token name drift
Finding:    spec.md uses 'rounded-terminal-lg' but
            plan.md Phase A uses 'rounded-lg' (default
            Tailwind class, not an S-2 custom token).
            The S-2 token 'rounded-terminal-lg' maps
            to 8px and is the correct token to use.
            Using 'rounded-lg' uses Tailwind's default
            (also 8px currently) but creates a coupling
            to Tailwind internals rather than the design
            system — if S-2 values change, plan.md
            would silently drift.

Action:     Standardize ALL border radius references
            to exact S-2 token names across all artifacts.

Audit and replace in plan.md:
  Search:  rounded-lg
  Replace: rounded-terminal-lg
  Search:  rounded-sm
  Replace: rounded-terminal-sm
  Search:  rounded-md
  Replace: rounded-terminal-md
  Files:   plan.md, tasks.md (all occurrences)

Complete S-2 border radius token reference:
  rounded-terminal:    '2px'  — sharp terminal feel
  rounded-terminal-sm: '4px'  — subtle rounding, tags
  rounded-terminal-md: '6px'  — buttons, badges
  rounded-terminal-lg: '8px'  — modals, panels, cards

TerminalWindow usage:
  Outer container: rounded-terminal-lg (8px)
  Info cards:      rounded-terminal-sm (4px)
  Buttons:         rounded-terminal-md (6px)

Verify tokens exist in S-2:
  grep "terminal-lg\|terminal-sm\|terminal-md" \
    frontend/tailwind.config.ts
  Expected: all 4 borderRadius entries present

Done:
  - Zero occurrences of bare 'rounded-lg', 'rounded-sm',
    'rounded-md' in plan.md and tasks.md
  - All radius references use 'rounded-terminal-*'
  - Tokens verified present in tailwind.config.ts

Create a PHR for this fix at:
  history/prompts/about-section/

## Response snapshot

Standardized all border radius references to S-2 token names (`rounded-terminal-*`).
1. Updated `frontend/tailwind.config.ts` to include `terminal`, `terminal-sm`, `terminal-md`, and `terminal-lg` tokens.
2. Replaced `rounded-lg` with `rounded-terminal-lg` in `specs/009-about-section/tasks.md` and `specs/009-about-section/research.md`.
3. Verified `plan.md` does not contain bare `rounded-lg` classes.
4. Confirmed tokens are correctly defined in Tailwind configuration.

## Outcome

- ✅ Impact: High. Decoupled design from Tailwind defaults and ensured consistency with the specification.
- 🧪 Tests: Verified with grep; all 4 borderRadius entries present in `tailwind.config.ts`.
- 📁 Files: Modified `frontend/tailwind.config.ts`, `specs/009-about-section/tasks.md`, `specs/009-about-section/research.md`.
- 🔁 Next prompts: Continue with implementation of About Section.
- 🧠 Reflection: The tokens were missing from `tailwind.config.ts`, which explains why they were being avoided in some documents. Adding them first was the correct prerequisite.

## Evaluation notes (flywheel)

- Failure modes observed: `replace` tool failed when using `...` for multiple replacements.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
