---
id: 003
title: Generate Font Loading Tasks
stage: tasks
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.tasks
labels: [tasks, font-loading, nextjs, tailwind4]
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

Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
Spec: S-4 / Font Loading
Plan: Use phase plan from /sp.plan for S-4
---
## TASK FORMAT
TASK-[N]: [Action verb] [description]
File: [exact path from repo root]
Change: [exact code to write or modify]
Done: [specific verifiable condition]
---
## TASK LIST
TASK-1: Import JetBrains Mono from next/font/google
File: frontend/app/layout.tsx
Done: Import present at top of file, variable '--font-mono' configured
TASK-2: Import Geist Sans from next/font/google
File: frontend/app/layout.tsx
Done: Import present at top of file, variable '--font-sans' configured
TASK-3: Apply font variables to <html> className
File: frontend/app/layout.tsx
Done: <html> className includes both jetbrainsMono.variable and geistSans.variable S-3 content (ThemeProvider, FAWT) intact
TASK-4: Update fontFamily mono token to use CSS variable
File: frontend/tailwind.config.ts
Done: mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace']
TASK-5: Update fontFamily sans token to use CSS variable
File: frontend/tailwind.config.ts
Done: sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif']
TASK-6: Add Font Setup section to README.md
File: frontend/README.md (create if absent)
Done: EC-001 documented — next/font network failure and offline/CI fallback explained
TASK-7: Verify --font-mono resolves in browser
Action: Open DevTools > Elements > <html> Computed styles > --font-mono
Done: Value shows JetBrains Mono
TASK-8: Verify --font-sans resolves in browser
Action: Open DevTools > Elements > <html> Computed styles > --font-sans
Done: Value shows Geist Sans
TASK-9: Verify font fallback chain (EC-002)
Action: DevTools > Network > block *.woff2 Reload page, inspect rendered font
Done: Monospace fallback renders correctly, no invisible text (FOIT)
TASK-10: Run full TypeScript verification
Run: cd frontend && tsc --noEmit
Done: EXACTLY 0 TypeScript errors
TASK-11: Run Lighthouse performance check
Done: 0 render-blocking font resources CLS contribution from fonts = 0
Generate exact code for TASK-1 through TASK-6. TASK-7 through TASK-11 are verification steps — provide exact DevTools or CLI instructions.

## Response snapshot

I have generated the actionable task list for S-4 / Font Loading.
- Created `specs/004-font-loading/tasks.md` following the strict checklist format.
- Tasks are organized by User Story (US1).
- Provided exact code for implementation tasks (T002-T006).
- Included detailed verification steps (T007-T011).
- Identified parallel implementation opportunities.

## Outcome

- ✅ Impact: Detailed roadmap for font loading implementation is ready.
- 🧪 Tests: n/a (Task generation phase)
- 📁 Files: 1 new file created in `specs/004-font-loading/`.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: The task list correctly bridges the gap between the high-level plan and specific code changes, ensuring all S-4 requirements are addressed.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
