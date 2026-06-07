---
id: 011
title: Update TASK-22 aria-controls accessibility
stage: misc
date: 2026-06-07
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: 011-timeline-section
branch: null
user: ADMINS
command: /fix L1
labels: ["accessibility", "aria", "tasks"]
links:
  spec: specs/011-timeline-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/011-timeline-section/tasks.md
tests:
  - none
---

## Prompt

--fix L1

Issue:      L1 / LOW / TASK-22 aria-controls missing
            explicit id synchronization on panel
Finding:    TASK-22 mentions aria-controls on the
            button but does not explicitly state that
            the target panel MUST have a matching id
            attribute. aria-controls is meaningless
            without the corresponding id on the panel.
            Screen readers use aria-controls to jump
            to the controlled element — if the id
            is absent the association silently breaks.

Action:     Update TASK-22 to explicitly require
            matching id on the controlled panel.

Replace current TASK-22 with:

  TASK-22: Apply aria-expanded + aria-controls +
           matching panel id
  File:    frontend/components/sections/
           timeline-section.tsx

  Required implementation for each quarter node:

    <!-- Toggle button -->
    <button
      onClick={() => toggleExpand(index)}
      aria-expanded={expandedIndex === index}
      aria-controls={`quarter-${index}-content`}
      className="..."
    >
      {expandedIndex === index
        ? '[- collapse]'
        : '[+ expand]'}
    </button>

    <!-- Controlled panel — id MUST match -->
    <AnimatePresence>
      {expandedIndex === index && (
        <motion.div
          id={`quarter-${index}-content`}
          role="region"
          aria-label={`${event.title} details`}
          ...
        >
          {/* description + highlights */}
        </motion.div>
      )}
    </AnimatePresence>

  Critical requirements:
    1. button aria-controls value EXACTLY matches
       the panel id value — same template literal
       quarter-${index}-content
    2. Panel has role="region" to make it a
       landmark when expanded
    3. Panel has aria-label describing its content
    4. When panel is unmounted (AnimatePresence exit)
       aria-controls points to a non-existent id —
       this is acceptable per ARIA spec when the
       controlled element is conditionally rendered

  Verification:
    Tab to any expand button → press Enter
    Open browser accessibility tree (DevTools →
    Accessibility panel)
    Expected: button shows aria-expanded: true,
    aria-controls: "quarter-0-content" (or index)
    Panel shows id: "quarter-0-content",
    role: "region"

Create a PHR for this fix at:
  history/prompts/timeline-section/

After that commit and push it to th repo.

## Response snapshot

Updated `TASK-22` in `specs/011-timeline-section/tasks.md` to include explicit `id` synchronization for `aria-controls`, `role="region"`, and `aria-label` for the controlled panel, ensuring proper accessibility as per ARIA standards.

## Outcome

- ✅ Impact: Corrected a potential accessibility regression where aria-controls would be orphaned without a matching id on the panel.
- 🧪 Tests: none (documentation update)
- 📁 Files: specs/011-timeline-section/tasks.md
- 🔁 Next prompts: Continue implementation of timeline-section.
- 🧠 Reflection: Explicitly defining the synchronization between control and target in the task list prevents implementation gaps.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
