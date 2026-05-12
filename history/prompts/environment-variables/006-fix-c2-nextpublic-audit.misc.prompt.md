---
id: 006
title: Fix C2 NEXT_PUBLIC_ Secret Exposure Audit
stage: misc
date: 2026-05-12
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: environment-variables
branch: 006-environment-variables
user: agent
command: /sp.analyze --fix C2
labels: ["security", "audit", "nextjs", "secrets"]
links:
  spec: /specs/006-environment-variables/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-environment-variables/tasks.md
tests:
 - T016b
---

## Prompt

--fix C2

Issue:      C2 / LOW / NEXT_PUBLIC_ misuse check too generic
Finding:    SR-005 says "no future secret vars may use
            NEXT_PUBLIC_ prefix" but the current audit task
            only checks this generically. A developer could
            accidentally add NEXT_PUBLIC_GEMINI_API_KEY and
            it would ship to the client bundle undetected.

Action:     Add a specific grep task targeting known secret
            variable names with NEXT_PUBLIC_ prefix.

Insert as TASK-16b after TASK-16a:

  TASK-16b: Audit for NEXT_PUBLIC_ secret exposure
  File:     frontend/ (recursive grep)

  Run these exact commands:

    # Check 1 — known secret names with NEXT_PUBLIC_ prefix
    grep -r "NEXT_PUBLIC_GEMINI" frontend/
    grep -r "NEXT_PUBLIC_RESEND" frontend/
    grep -r "NEXT_PUBLIC_API_KEY" frontend/
    grep -r "NEXT_PUBLIC_SECRET" frontend/
    grep -r "NEXT_PUBLIC_TOKEN" frontend/
    grep -r "NEXT_PUBLIC_PASSWORD" frontend/
    grep -r "NEXT_PUBLIC_PRIVATE" frontend/

    Expected result for ALL commands: 0 matches
    Any match = CRITICAL security violation

    # Check 2 — all NEXT_PUBLIC_ vars defined in codebase
    grep -r "NEXT_PUBLIC_" frontend/ --include="*.ts" \
      --include="*.tsx" -h | sort -u

    Expected output: only NEXT_PUBLIC_API_URL
    Any unknown NEXT_PUBLIC_ var = review required

    # Check 3 — env.ts is only file reading process.env
    grep -rn "process\.env" frontend/ --include="*.ts" \
      --include="*.tsx"

    Expected: only frontend/lib/env.ts in results

  Add to .env.local.example as a comment warning:
    # SECURITY: Never prefix secret keys with NEXT_PUBLIC_
    # NEXT_PUBLIC_ vars are visible in the browser bundle
    # Only NEXT_PUBLIC_API_URL is intentionally public

  Done:
    - All 7 secret-pattern greps return 0 results
    - Only NEXT_PUBLIC_API_URL found in Check 2
    - Only lib/env.ts found in Check 3
    - Warning comment added to .env.local.example

Create a Prompt History Record (PHR) for this fix at:
  history/prompts/env-variables/006-fix-c2-nextpublic-audit.misc.prompt.md

## Response snapshot

I have applied the fix for issue C2 (NEXT_PUBLIC_ secret exposure audit). I inserted `T016b` into `tasks.md` with specific grep-based audit commands to detect accidental exposure of secrets in the frontend bundle. These checks cover known secret patterns, overall `NEXT_PUBLIC_` usage, and centralizing `process.env` access. I also noted the requirement to add a security warning to the `.env.local.example` file.

## Outcome

- ✅ Impact: Hardened the security posture by adding specific, automated audit steps to prevent accidental secret leakage to the client-side.
- 🧪 Tests: T016b (Security Audit) added to task list.
- 📁 Files: tasks.md modified.
- 🔁 Next prompts: /sp.implement to begin implementation.
- 🧠 Reflection: Proactive auditing of prefix-based environment variable systems is essential in Next.js to prevent unintentional exposure of server-side secrets.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
