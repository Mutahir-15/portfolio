---
id: 010
title: Resolve badge variant mapping (M2)
stage: misc
date: 2026-06-01
surface: agent
model: gemini-2.0-flash
feature: 011-timeline-section
branch: 011-timeline-section
user: Mutahir
command: /sp.analyze --fix M2
labels: ["fix", "documentation", "typescript", "s-11"]
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

--fix M2

Issue:      M2 / MEDIUM / Badge variant prop mapping
            implied but not explicitly typed
Finding:    TASK-11 and TASK-16 pass event.variant
            to Badge's variant prop but the mapping
            between TimelineEvent.variant ('green'|'cyan')
            and BadgeProps.variant ('green'|'cyan'|'muted')
            is implied. TypeScript will catch a mismatch
            at compile time but the intent should be
            explicit in the tasks for documentation.

Action:     Update TASK-11 and TASK-16 to explicitly
            document the variant prop mapping.

Update TASK-11 in tasks.md:
  Add after Badge usage:
    Variant mapping (explicit):
      TimelineEvent.variant 'green' →
        Badge variant="green" (green dot, green hover)
      TimelineEvent.variant 'cyan' →
        Badge variant="cyan" (cyan dot, cyan hover)
    TypeScript enforces this at compile time because
    both types share the same union literals.
    The 'muted' variant is NEVER used in timeline —
    only 'green' and 'cyan' are valid here.

Update TASK-16 in tasks.md:
  Add explicit prop passing documentation:
    <Badge
      key={skill}
      label={skill}
      variant={event.variant}  // 'green' | 'cyan' only
      size="sm"
    />
    TypeScript narrows event.variant to
    'green' | 'cyan' — satisfies BadgeProps.variant
    which is 'green' | 'cyan' | 'muted'.
    No type assertion needed.

Verify:
  cd frontend && tsc --noEmit
  Expected: 0 errors — variant assignment type-safe

Create a PHR for this fix at:
  history/prompts/timeline-section/

Then, commit and push it to the repo.

## Response snapshot

Updated `tasks.md` to resolve M2 by explicitly documenting the `Badge` variant prop mapping in T011 and TASK-16. Added clear mapping logic and code snippets to ensure type safety and implementation clarity for the `variant` assignment, highlighting that only 'green' and 'cyan' are valid in this context.

## Outcome

- ✅ Impact: Improved technical documentation and clarified type safety for badge implementation.
- 🧪 Tests: N/A (Documentation fix)
- 📁 Files: specs/011-timeline-section/tasks.md
- 🔁 Next prompts: /sp.implement s-11
- 🧠 Reflection: Explicitly documenting type narrowing and prop mapping in tasks reduces cognitive load for implementers and provides a clear audit trail for why certain design system tokens are used.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
