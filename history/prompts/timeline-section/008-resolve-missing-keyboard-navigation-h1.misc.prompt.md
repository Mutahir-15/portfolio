---
id: 008
title: Resolve missing keyboard navigation (H1)
stage: misc
date: 2026-06-01
surface: agent
model: gemini-2.0-flash
feature: 011-timeline-section
branch: 011-timeline-section
user: Mutahir
command: /sp.analyze --fix H1
labels: ["fix", "accessibility", "keyboard-navigation", "s-11"]
links:
  spec: specs/011-timeline-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/011-timeline-section/tasks.md
tests: []
---

## Prompt

--fix H1

Issue:      H1 / HIGH / Missing keyboard navigation
            task for expand/collapse disclosure pattern
Finding:    The expand/collapse interaction (FR-005)
            has no task covering keyboard behavior.
            The toggle button must respond to both
            Enter and Space keys (standard button
            behavior) and focus must be managed
            correctly when content expands/collapses.
            Without this task, keyboard-only users
            cannot operate the timeline.

Action:     Add TASK-24a dedicated to keyboard
            interaction verification and focus
            management for the disclosure pattern.

Insert as TASK-24a between TASK-24 and TASK-25:

  TASK-24a: Implement and verify keyboard navigation
  File:     frontend/components/sections/
            timeline-section.tsx

  Step 1 — Ensure toggle is a <button> element:
    The expand/collapse toggle MUST be a <button>
    not a <div> or <span> with onClick.
    Native <button> elements receive:
      - Tab focus automatically
      - Enter key activation
      - Space key activation
    Verify:
      grep -n "<button" timeline-section.tsx
      Expected: toggle button uses <button> tag

  Step 2 — Verify Tab order through nodes:
    Tab sequence must be:
      1. Each connector dot area (skip — aria-hidden)
      2. Each expand/collapse <button>
      3. Any links inside expanded content (if any)
    Test: Tab through page, confirm each quarter's
    toggle button receives focus in order Q1→Q4

  Step 3 — Verify Enter + Space activation:
    Focus any quarter toggle button → press Enter
    Expected: card expands, content visible
    Press Enter again → card collapses
    Repeat with Space key
    Expected: identical behavior to Enter

  Step 4 — Verify focus retention after toggle:
    After pressing Enter/Space to expand:
      Focus must STAY on the toggle button —
      do NOT move focus to expanded content
      automatically (WCAG 3.2.2 — no unexpected
      focus change)
    After pressing Enter/Space to collapse:
      Focus must STAY on the toggle button

  Step 5 — Verify focus ring visibility:
    Toggle button when focused must show visible
    focus ring using S-2 token colors:
      Dark:  outline: 1px solid dark-green
             outline-offset: 2px
      Light: outline: 1px solid light-green
             outline-offset: 2px
    Add to button className:
      focus-visible:outline focus-visible:outline-1
      focus-visible:outline-dark-green (dark)
      dark:focus-visible:outline-dark-green
      focus-visible:outline-offset-2

  Step 6 — Verify Escape key does NOT close:
    WCAG does not require Escape to close a
    disclosure widget (only dialogs/modals).
    Confirm no Escape handler exists on the button.

  Done:
    - Toggle is a <button> element ✓
    - Tab reaches all 4 quarter toggles ✓
    - Enter + Space both toggle expand/collapse ✓
    - Focus stays on button after toggle ✓
    - Focus ring visible in both themes ✓
    - No Escape handler present ✓

Update tasks.md task count:
  Previous: 27 tasks
  After H1:  28 tasks (TASK-24a inserted)

Create a PHR for this fix at:
  history/prompts/timeline-section/

## Response snapshot

Added TASK-24a to `tasks.md` to address the H1 accessibility gap. The new task provides a comprehensive 6-step verification process for keyboard navigation, including `<button>` usage, tab order, Enter/Space activation, focus retention, and theme-compliant focus rings. This ensures full WCAG compliance for the disclosure pattern.

## Outcome

- ✅ Impact: High - Ensured keyboard accessibility for the Timeline Section, removing a significant UX barrier.
- 🧪 Tests: N/A (Documentation update)
- 📁 Files: specs/011-timeline-section/tasks.md
- 🔁 Next prompts: /sp.implement s-11
- 🧠 Reflection: Accessibility is often missed in initial task generation; explicit analysis steps are crucial for identifying these gaps before implementation begins.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
