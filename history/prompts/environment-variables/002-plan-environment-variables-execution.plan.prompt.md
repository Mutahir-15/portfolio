---
id: 002
title: Plan Environment Variables Execution
stage: plan
date: 2026-05-12
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: environment-variables
branch: 006-environment-variables
user: agent
command: /sp.plan
labels: ["planning", "environment-variables", "zod", "pydantic"]
links:
  spec: /specs/006-environment-variables/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-environment-variables/research.md
 - specs/006-environment-variables/data-model.md
 - specs/006-environment-variables/quickstart.md
 - specs/006-environment-variables/plan.md
tests:
 - none
---

## Prompt

/sp.plan Spec:    S-6 / Environment Variables
Goal:    Plan ordered execution for env validation system.
         Two independent subsystems — frontend (Zod) and
         backend (Pydantic) — plus security hardening.

---

## PLANNING CONSTRAINTS

- Frontend and backend subsystems are independent —
  they can be planned in parallel but implemented
  sequentially for clarity
- Zod must be installed before env.ts is written
- server-only package must be installed before
  the import is added to env.ts
- config.py must be complete before main.py startup
  guard is added (FR-014 depends on FR-013)
- .gitignore verification (SR-001) must happen
  before .env files are created locally —
  never commit secrets accidentally
- Both example files must be finalized BEFORE
  the actual .env files are created locally
  so the developer can copy-and-fill correctly

---

## REQUESTED PLAN OUTPUT

Phase A — Security pre-check
           Verify .gitignore entries for .env files
           Add missing entries before any .env created
           Verify: grep confirms entries present

Phase B — Install frontend dependencies
           npm install zod (if not present)
           npm install server-only (if not present)
           Verify: both packages in package.json

Phase C — Finalize frontend example file
           Write frontend/.env.local.example
           with all comments and variable entries
           Verify: file contains NEXT_PUBLIC_API_URL

Phase D — Implement frontend/lib/env.ts
           Zod schema, parse, error handling,
           type export, server-only import
           Verify: tsc --noEmit 0 errors

Phase E — Finalize backend example file
           Write backend/.env.example with all
           comments, required + optional vars
           Verify: file contains all 6 variables

Phase F — Implement backend/lib/config.py
           Settings class, field_validator,
           __repr__ masking, singleton instance
           Verify: python import succeeds with valid .env

Phase G — Add startup guard to backend/main.py
           Try/except around settings import
           RuntimeError with [ENV ERROR] message
           Verify: startup fails loudly when .env absent

Phase H — Full verification
           SC-001 through SC-013 confirmed
           tsc --noEmit: 0 errors
           Python import test: success + failure cases

Each phase must list:
- Exact files touched
- Security risk to watch for
- Verification step before next phase

## Response snapshot

I have executed the /sp.plan workflow for Feature S-6. I created research.md (deciding on Zod and Pydantic-Settings), data-model.md (defining schemas), and quickstart.md. Finally, I produced a comprehensive plan.md that breaks down the implementation into the requested eight phases (A-H), addressing security risks and verification steps for each.

## Outcome

- ✅ Impact: Strategic implementation plan created for environment variable validation, ensuring security and type safety across the stack.
- 🧪 Tests: none (planning stage)
- 📁 Files: research.md, data-model.md, quickstart.md, plan.md created/updated.
- 🔁 Next prompts: /sp.tasks to break the plan into actionable tasks.
- 🧠 Reflection: Validating configuration at the extreme edges of the application (startup/import) is the most effective way to prevent runtime surprises.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell PHR script missing; fell back to agent-native creation.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Ensure Windows/PowerShell versions of all SpecKit Plus scripts are available.
