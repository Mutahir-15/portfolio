---
id: 009
title: Resolve ambiguous spacing tokens (M1)
stage: misc
date: 2026-06-01
surface: agent
model: gemini-2.0-flash
feature: 011-timeline-section
branch: 011-timeline-section
user: Mutahir
command: /sp.analyze --fix M1
labels: ["fix", "design-tokens", "spacing", "s-11"]
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

--fix M1

Issue:      M1 / MEDIUM / "standard padding" ambiguous
            in TASK-5 (section shell implementation)
Finding:    TASK-5 uses the phrase "standard padding"
            instead of the explicit S-2 token
            py-terminal-xl. An implementer reading
            only tasks.md would not know which padding
            value to use — they might apply py-16,
            py-20, or another arbitrary value.

Action:     Replace "standard padding" with explicit
            token reference in TASK-5.

Update TASK-5 in tasks.md:
  BEFORE:
    Done: 'use client', id="timeline",
          standard padding, PageWrapper,
          overflow-x-hidden on section

  AFTER:
    Done: 'use client' directive on line 1
          id="timeline" on section element
          py-terminal-xl (maps to 96px / 6rem
          from S-2 spacing tokens) vertical padding
          PageWrapper wrapping all content
          overflow-x-hidden on section element
          Verify: computed padding-top and
          padding-bottom = 96px in DevTools

Add token reminder comment in implementation:
  // py-terminal-xl = 6rem = 96px (S-2 spacing token)
  // Do not substitute py-16, py-20, or arbitrary values
  <section
    id="timeline"
    className="py-terminal-xl overflow-x-hidden"
  >

Create a PHR for this fix at:
  history/prompts/timeline-section/

Then, commit and push it to the repo.

## Response snapshot

Updated `tasks.md` to resolve M1 ambiguity by explicitly referencing the `py-terminal-xl` spacing token in the section shell task (T005/TASK-6). Added specific verification criteria (96px/6rem) to ensure implementation accuracy against the S-2 design system.

## Outcome

- ✅ Impact: Prevented design drift by clarifying spacing token usage in the core section shell.
- 🧪 Tests: N/A (Documentation fix)
- 📁 Files: specs/011-timeline-section/tasks.md
- 🔁 Next prompts: /sp.implement s-11
- 🧠 Reflection: Precise token references in tasks are critical for ensuring the final UI matches the design intent without constant cross-referencing of architectural plans.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
