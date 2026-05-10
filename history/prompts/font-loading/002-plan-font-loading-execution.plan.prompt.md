---
id: 002
title: Plan Font Loading Execution
stage: plan
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.plan
labels: [plan, font-loading, nextjs, tailwind4]
links:
  spec: specs/004-font-loading/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-font-loading/plan.md
 - specs/004-font-loading/research.md
 - specs/004-font-loading/quickstart.md
 - GEMINI.md
tests:
 - n/a
---

## Prompt

/sp.plan Spec:    S-4 / Font Loading
Goal:    Plan ordered execution for font loading implementation.
         Two files touched — layout.tsx extended, 
         tailwind.config.ts updated.

---

## PLANNING CONSTRAINTS

- layout.tsx from S-3 must NOT be overwritten — only
  the font loading logic is added at the top and
  the font variables are appended to <html> className
- tailwind.config.ts fontFamily update (FR-004) must
  happen AFTER font variables are defined in layout.tsx
  so the connection is verifiable end-to-end
- Both font configurations must be verified in DevTools
  before spec is closed — tsc alone is not sufficient
- EC-001 (build-time failure) must be documented
  in README.md as part of this spec

---

## REQUESTED PLAN OUTPUT

Phase A — Add JetBrains Mono to layout.tsx
           Import from next/font/google
           Configure: variable, subsets, weights, display, preload
           Verify: --font-mono variable defined

Phase B — Add Geist Sans to layout.tsx
           Import from next/font/google
           Configure: variable, subsets, weights, display, preload
           Verify: --font-sans variable defined

Phase C — Apply font variables to <html> className
           Extend existing className without breaking
           S-3 ThemeProvider or FAWT script
           Verify: both variables present on <html> in DevTools

Phase D — Update tailwind.config.ts fontFamily tokens
           Replace font name strings with CSS variable
           references per FR-004
           Verify: Tailwind font-mono and font-sans classes
           resolve to correct loaded fonts

Phase E — Document EC-001 in README.md
           Font setup section with offline/CI fallback note

Phase F — Full verification
           tsc --noEmit: 0 errors
           Lighthouse: 0 render-blocking resources
           DevTools: both CSS variables resolve correctly
           SC-001 through SC-011 confirmed

Each phase must list:
- Exact files touched
- Key risk to watch for
- Verification step before moving to next phase

## Response snapshot

I have generated the implementation plan for S-4 / Font Loading.
- Created `specs/004-font-loading/plan.md` with a phased execution strategy.
- Created `specs/004-font-loading/research.md` resolving key technical decisions.
- Created `specs/004-font-loading/quickstart.md` for team onboarding.
- Updated `GEMINI.md` context with new technologies.
- Verified plan against Constitution Principles III and IV.

## Outcome

- ✅ Impact: Strategic roadmap established for safe and performant font integration.
- 🧪 Tests: n/a (Planning phase)
- 📁 Files: 3 new files created in `specs/004-font-loading/`, 1 global file updated.
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: The planning phase correctly identified the need to append font variables to the existing S-3 layout rather than overwriting it.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
