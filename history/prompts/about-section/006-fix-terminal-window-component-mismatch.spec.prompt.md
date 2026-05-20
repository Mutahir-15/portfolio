---
id: 006
title: Fix TerminalWindow Component Mismatch C1
stage: spec
date: 2026-05-20
surface: agent
model: gemini-2.0-flash
feature: about-section
branch: 009-about-section
user: admin
command: --fix C1
labels: ["fix", "about-section", "terminal-window", "client-component"]
links:
  spec: specs/009-about-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/009-about-section/spec.md
 - frontend/components/ui/terminal-window.tsx
tests:
 - grep -n "Server Component" frontend/components/ui/terminal-window.tsx
 - grep -n "'use client'" frontend/components/ui/terminal-window.tsx
---

## Prompt

--fix C1

Issue:      C1 / CRITICAL / Server vs Client Component
            mismatch in TerminalWindow
Finding:    spec.md line 30 declares TerminalWindow as a Server Component. plan.md Phase A correctly opts into 'use client' for Framer Motion whileInView. This contradiction means the implementer has conflicting instructions — the spec (higher authority) says Server, the plan says Client. Without this fix the implementer will likely follow the spec and produce a broken component.

Action:     Update spec.md to explicitly declare TerminalWindow as a Client Component.

In spec.md COMPONENT SPEC 1 — TerminalWindow:

  BEFORE:
    File: frontend/components/ui/terminal-window.tsx
    Type: Server Component (no interactivity needed)

  AFTER:
    File: frontend/components/ui/terminal-window.tsx
    Type: Client Component ('use client')
    Rationale: Framer Motion whileInView requires access to the Intersection Observer API which is only available in the browser. Per Constitution Pillar IV — components using Framer Motion whileInView must be Client Components. Note: TerminalWindow has no server-side data needs so the Client Component designation has zero cost and eliminates the contradiction.

Update PR-001 in spec.md:

  BEFORE:
    PR-001: TerminalWindow is a Server Component when animate={false} — no 'use client' needed. When animate={true} it uses Framer Motion whileInView — requires 'use client'. Resolution: make TerminalWindow always a Client Component since it always animates in production use. Mark 'use client'.

  AFTER:
    PR-001: TerminalWindow is a Client Component. 'use client' directive is required at the top of terminal-window.tsx unconditionally. The animate prop controls whether Framer Motion animation runs — it does NOT control whether the component is a Server or Client Component. Both animate={true} and animate={false} render in the client.

Verify fix:
  grep -n "Server Component" frontend/components/ui/terminal-window.tsx
  Expected: 0 results

  grep -n "'use client'" frontend/components/ui/terminal-window.tsx
  Expected: line 1 — 'use client'

Create a PHR for this fix at: history/prompts/about-section/

## Response snapshot

I have updated `specs/009-about-section/spec.md` to resolve the contradiction by explicitly declaring `TerminalWindow` as a Client Component. I updated both the `COMPONENT SPEC 1` section and the `PR-001` planning constraint to ensure consistency across the specification. I also updated the `frontend/components/ui/terminal-window.tsx` stub to include the `'use client'` directive.

## Outcome

- ✅ Impact: Resolved a critical mismatch in the component specification that would have led to broken code during implementation.
- 🧪 Tests: Verified that the stub file now contains the 'use client' directive and does not mention 'Server Component'.
- 📁 Files: Updated `specs/009-about-section/spec.md` and `frontend/components/ui/terminal-window.tsx`.
- 🔁 Next prompts: Continue with the implementation of the About section (Phase 2).
- 🧠 Reflection: The spec had a deep contradiction between its "Type" declaration and the requirements for Framer Motion. Fixing it at the spec level prevents implementation errors.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): N/A
