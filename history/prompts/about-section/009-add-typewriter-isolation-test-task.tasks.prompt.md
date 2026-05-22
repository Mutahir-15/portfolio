---
id: 009
title: Add dedicated verification task for typewriter isolation
stage: tasks
date: 2026-05-23
surface: agent
model: gemini-2.0-flash-exp
feature: about-section
branch: 009-about-section
user: ADMINS
command: --fix G1
labels: ["testing", "verification", "typewriter", "isolation"]
links:
  spec: /specs/009-about-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-about-section/tasks.md
tests:
  - Manual verification of tasks.md content update
---

## Prompt

--fix G1

Issue:      G1 / MEDIUM / EC-002 lacks dedicated
            verification task
Finding:    EC-002 (simultaneous useTypewriter instances
            in HeroSection and AboutSection) has no
            dedicated task to verify independence.
            T024 (visual verification) is too broad
            to reliably catch a shared-state bug
            between two typewriter instances.

Action:     Add TASK-24a as a dedicated isolation
            verification task for EC-002.

Insert as TASK-24a after TASK-24:

  TASK-24a: Verify useTypewriter instance isolation
  File:     Browser DevTools — no code change

  Test procedure:
    Step 1 — Scroll to mid-page where both
      HeroSection and AboutSection are partially
      visible simultaneously (zoom out if needed
      to see both on screen).

    Step 2 — Observe both typewriter instances:
      HeroSection typewriter: cycling role strings
        'Spec-Driven Developer', 'Agentic AI Engineer'
        etc. at typeSpeed: 80
      AboutSection typewriter: cycling greetings
        'Hello, World!', 'Marhaba!', etc. at
        typeSpeed: 60

    Step 3 — Verify independence:
      [ ] Both typewriters animate simultaneously
      [ ] Neither pauses when the other is typing
      [ ] Neither resets when the other completes
          a cycle
      [ ] Switching theme (dark/light) does not
          reset either typewriter state
      [ ] Both continue after a browser tab switch
          and return (visibility change event)

    Step 4 — DevTools check:
      Open React DevTools
      Inspect HeroSection component → hooks
      Inspect AboutSection component → hooks
      Expected: each has its OWN useState instances
      for displayText, phase, currentIndex
      No shared state visible between components

  Done:
    - Both typewriters animate independently ✓
    - No shared state between instances ✓
    - Theme toggle does not reset either instance ✓

Update tasks.md task count:
  Previous total: 24 tasks
  After G1 fix:   25 tasks (TASK-24a inserted)

Create a PHR for this fix at:
  history/prompts/about-section/

## Response snapshot

Added a dedicated isolation verification task (T024a) to `specs/009-about-section/tasks.md` to address issue G1. This task provides a detailed manual testing procedure and React DevTools inspection steps to ensure that the `useTypewriter` hook instances in `HeroSection` and `AboutSection` operate independently without shared state or timing conflicts.

## Outcome

- ✅ Impact: Medium. Improved verification rigor for a specific edge case (EC-002) identified in the spec.
- 🧪 Tests: Verified `tasks.md` update.
- 📁 Files: Modified `specs/009-about-section/tasks.md`.
- 🔁 Next prompts: Continue with implementation of About Section.
- 🧠 Reflection: While the hook is naturally isolated by React's architecture, explicit verification tasks prevent regression and ensure that any future refactoring (e.g., moving to a global state or context) is done with isolation in mind.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
