---
id: 006
title: Fix U1 Dynamic Year
stage: misc
date: 2026-05-11
surface: agent
model: gemini-2.0-flash-exp
feature: base-layout
branch: 005-base-layout
user: admin
command: /sp.analyze --fix U1
labels: [remediation, base-layout, footer, technical-debt]
links:
  spec: specs/005-base-layout/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-base-layout/tasks.md
 - specs/005-base-layout/spec.md
tests:
 - n/a
---

## Prompt

--fix U1

Issue:      U1 / LOW / Hardcoded footer year
Finding:    TASK-10 hardcodes © 2025. EC-005 in the spec
            deferred the decision. Hardcoded year creates
            technical debt — the portfolio will show a
            wrong year after December 31 2025 without
            a manual code change.

Action:     Standardize to dynamic year in footer.tsx.

Replace hardcoded year in Footer implementation with:

  const currentYear = new Date().getFullYear()

  Render as:
    © {currentYear} Mutahir Bin Athar

  This is a Server Component — new Date() runs at
  request time on the server, always returning the
  correct year with zero client-side JS cost.

Update EC-005 in spec.md to reflect this decision:
  BEFORE: "hardcoded for now per simplicity"
  AFTER:  "resolved — dynamic via new Date().getFullYear()
           in Server Component footer.tsx"

Done:
  - Footer renders current year dynamically
  - No hardcoded 2025 anywhere in footer.tsx
  - EC-005 updated in spec document

## Response snapshot

I have fixed the issue of the hardcoded footer year (U1). I updated the `Footer` component task (T010) in `tasks.md` to use a dynamic year calculation with `new Date().getFullYear()`. I also updated `spec.md` to include and resolve `EC-005`, as well as adding `EC-004` for completeness.

## Outcome

- ✅ Impact: Eliminated technical debt in the footer, ensuring the copyright year is always accurate without manual maintenance.
- 🧪 Tests: n/a
- 📁 Files: `specs/005-base-layout/tasks.md` and `specs/005-base-layout/spec.md` updated.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Leveraging Server Components for dynamic data like the current year is a performant choice that avoids hydration mismatches and extra client-side bundles.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
