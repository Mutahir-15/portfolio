---
id: 007
title: Fix G1 Deterministic Security Audit
stage: misc
date: 2026-05-12
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: environment-variables
branch: 006-environment-variables
user: agent
command: /sp.analyze --fix G1
labels: ["security", "audit", "deterministic", "grep"]
links:
  spec: /specs/006-environment-variables/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-environment-variables/tasks.md
tests:
 - T021
---

## Prompt

--fix G1

Issue:      G1 / LOW / Audit task open-ended and manual
Finding:    TASK-16 (security audit) lists what to check
            but the grep commands are incomplete or absent.
            An open-ended audit is non-deterministic —
            different developers run different checks
            and get different confidence levels.

Action:     Replace open-ended audit task with exact
            deterministic grep commands covering all
            four audit dimensions.

Replace current TASK-16 entirely with:

  TASK-16: Run deterministic security audit
  File:    frontend/ and backend/ (recursive grep)

  ── AUDIT 1: No raw process.env in frontend ──────────
  Run:
    grep -rn "process\.env" frontend/ \
      --include="*.ts" --include="*.tsx" \
      | grep -v "lib/env.ts"

  Expected: 0 lines of output
  Fail condition: any result means a component is
  reading env vars directly — Constitution VI violation

  ── AUDIT 2: No os.environ in backend ────────────────
  Run:
    grep -rn "os\.environ" backend/ \
      --include="*.py" \
      | grep -v "lib/config.py"

  Expected: 0 lines of output
  Fail condition: any result means a route/agent is
  reading env vars directly — Constitution VI violation

  ── AUDIT 3: No frontend exposure of backend secrets ─
  Run:
    grep -rn "GEMINI_API_KEY\|RESEND_API_KEY" frontend/ \
      --include="*.ts" --include="*.tsx" \
      --include="*.env*" --include="*.json"

  Expected: 0 lines of output
  Fail condition: any result = critical security leak

  ── AUDIT 4: No hardcoded API keys or tokens ─────────
  Run:
    grep -rEn \
      "(AIza|sk-|rk_live|rk_test|Bearer [A-Za-z0-9])" \
      frontend/ backend/ \
      --include="*.ts" --include="*.tsx" \
      --include="*.py" \
      --exclude-dir=".git" \
      --exclude-dir="node_modules"

  Expected: 0 lines of output
  Pattern explanation:
    AIza     → Google/Gemini API key prefix
    sk-      → OpenAI-style key prefix
    rk_live  → Resend live key prefix
    rk_test  → Resend test key prefix
    Bearer * → Hardcoded auth token

  ── AUDIT 5: Confirm settings singleton is sole export ─
  Run:
    grep -n "^settings = Settings()" backend/lib/config.py

  Expected: exactly 1 match
  Fail: 0 matches = singleton not instantiated
        2+ matches = multiple instances created

  Done:
    - All 5 audits return expected results
    - Any failure stops implementation immediately
    - All audit commands documented in PHR

Create a Prompt History Record (PHR) for this fix at:
  history/prompts/env-variables/007-fix-g1-deterministic-audit.misc.prompt.md

## Response snapshot

I have applied the fix for issue G1 (Deterministic Security Audit). I replaced the open-ended audit task T021 in `tasks.md` with five specific, deterministic grep commands. These commands audit for raw environment access, secret exposure, hardcoded keys, and singleton integrity. This ensures the security audit is repeatable and provides high-confidence verification.

## Outcome

- ✅ Impact: Replaced manual audit steps with deterministic verification commands, improving the reliability and security of the environment variable implementation.
- 🧪 Tests: T021 (Deterministic Security Audit) updated in task list.
- 📁 Files: tasks.md modified.
- 🔁 Next prompts: /sp.implement to begin implementation.
- 🧠 Reflection: Deterministic verification is the key to ensuring security standards are met consistently across different environments and developers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
