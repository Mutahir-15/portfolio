---
id: 010
title: Expand accessibility task with detailed requirements
stage: tasks
date: 2026-05-23
surface: agent
model: gemini-2.0-flash-exp
feature: about-section
branch: 009-about-section
user: ADMINS
command: --fix U1
labels: ["accessibility", "aria", "documentation", "consistency"]
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

--fix U1

Issue:      U1 / LOW / TASK-21 references undefined
            AC-001 to AC-008 without listing them
Finding:    tasks.md TASK-21 says "All 8 accessibility
            criteria met" but does not list what those
            criteria are. An implementer reading only
            tasks.md cannot complete this task without
            also reading spec.md. Tasks must be
            self-contained per Constitution Pillar I
            (single responsibility, completable
            independently).

Action:     Expand TASK-21 in tasks.md to explicitly
            list all 8 ARIA requirements inline.

Replace current TASK-21 with:

  TASK-21: Apply all ARIA attributes
  Files:   frontend/components/ui/terminal-window.tsx
           frontend/components/sections/about-section.tsx

  Apply each requirement explicitly:

  AC-001: Add id="about" to the section wrapper
    <section id="about" ...>
    Verify: document.getElementById('about') returns
    the section element

  AC-002: Confirm <h2> exists for screen reader outline
    The 'about_me' heading must be an <h2> tag — not
    a <div> or <span> styled to look like a heading
    Verify: grep -n "<h2" about-section.tsx

  AC-003: TerminalWindow title bar is decorative
    No aria-label needed on the title bar div
    Verify: no aria-label on .title-bar element

  AC-004: Traffic light dots container aria-hidden
    <div aria-hidden="true"> wrapping all 3 dots
    Verify: grep -n 'aria-hidden="true"' terminal-window.tsx

  AC-005: Greeting container aria-live
    <div aria-live="polite" aria-atomic="true">
      wrapping the useTypewriter displayText span
    Verify: grep -n 'aria-live' about-section.tsx

  AC-006: Blinking cursor aria-hidden
    The | cursor span must have aria-hidden="true"
    Verify: grep -n 'aria-hidden' about-section.tsx
    Expected: at least 1 result on the cursor span

  AC-007: Info cards are read-only — no role needed
    Cards use semantic <div> with no interactive
    elements — no additional ARIA required
    Verify: no button/link elements inside info cards

  AC-008: Color contrast verification
    Run browser DevTools accessibility checker on:
      - dark-green text on dark-bg background
      - dark-muted text on dark-surface background
      - light-green text on light-bg background
    All must pass 4.5:1 minimum contrast ratio

  Done:
    - All 8 criteria explicitly verified
    - No a11y errors in DevTools accessibility panel

Create a PHR for this fix at:
  history/prompts/about-section/

## Response snapshot

Expanded TASK-21 in `specs/009-about-section/tasks.md` to explicitly include all 8 accessibility criteria (AC-001 to AC-008) directly within the task description. This ensures the task is self-contained and provides clear implementation and verification steps for each requirement, adhering to the project's development standards.

## Outcome

- ✅ Impact: Low. Improved documentation clarity and ensured tasks are self-contained.
- 🧪 Tests: Verified `tasks.md` update.
- 📁 Files: Modified `specs/009-about-section/tasks.md`.
- 🔁 Next prompts: Continue with implementation of About Section.
- 🧠 Reflection: Tasks should always be descriptive enough to be completed without jumping between multiple documents, especially for critical requirements like accessibility.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
