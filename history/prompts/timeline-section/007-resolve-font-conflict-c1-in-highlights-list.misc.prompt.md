---
id: 007
title: Resolve font conflict (C1) in highlights list
stage: misc
date: 2026-06-01
surface: agent
model: gemini-2.0-flash
feature: 011-timeline-section
branch: 011-timeline-section
user: Mutahir
command: /sp.analyze --fix C1
labels: ["fix", "constitution", "font-styling", "s-11"]
links:
  spec: specs/011-timeline-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/011-timeline-section/spec.md
 - specs/011-timeline-section/tasks.md
tests: []
---

## Prompt

--fix C1

Issue:      C1 / CRITICAL / Constitution Pillar III
            font violation in TASK-20 highlights list
Finding:    TASK-20 specifies font-mono for highlight
            list items. Constitution Pillar III states:
            "font-sans for body copy, descriptions,
            and paragraphs — font-mono reserved for
            headings, UI chrome, code, and badges."
            Highlights are descriptive content —
            they must use font-sans.

Action:     Update TASK-20 and spec.md FR-004
            highlights section to use font-sans.

Update TASK-20 in tasks.md:
  BEFORE:
    Done: '▸ ' prefix aria-hidden,
          each item font-mono terminal-xs,
          gap-1 between items

  AFTER:
    Done: '▸ ' prefix span aria-hidden="true"
          styled font-mono terminal-xs variant-color,
          item text font-sans terminal-xs muted-color,
          gap-1 between items

  Rationale for split styling:
    Prefix '▸ ':  font-mono (UI chrome — decorative)
    Item text:    font-sans (descriptive content)
    This matches the pattern used in AboutSection
    bio paragraphs (font-sans) vs command prompts
    (font-mono).

Update FR-004 in spec.md highlights section:
  BEFORE:
    Each highlight renders as a terminal list item:
      Prefix: '▸ ' in variant color
      Text:   highlight string in muted color
      Style:  font-mono terminal-xs

  AFTER:
    Each highlight renders as a terminal list item:
      Prefix: '▸ ' — font-mono terminal-xs
                     variant color, aria-hidden="true"
      Text:   highlight string — font-sans terminal-xs
                     muted color
    Rationale: prefix is UI chrome (font-mono),
    content is descriptive text (font-sans) per
    Constitution Pillar III.

Verify fix:
  grep -n "font-mono" in highlights rendering code
  Expected: only on the prefix span, not item text
  grep -n "font-sans" in highlights rendering code
  Expected: on the item text span

Create a PHR for this fix at:
  history/prompts/timeline-section/

## Response snapshot

Applied surgical fixes to `spec.md` and `tasks.md` to resolve the C1 constitution conflict. Updated the highlights list styling to use a split approach: `font-mono` for the decorative prefix (UI chrome) and `font-sans` for the highlight text (descriptive content), ensuring compliance with Pillar III.

## Outcome

- ✅ Impact: Resolved a critical constitution violation, ensuring consistent typography.
- 🧪 Tests: Visual check of task description; TSC will verify in execution phase.
- 📁 Files: specs/011-timeline-section/spec.md, specs/011-timeline-section/tasks.md
- 🔁 Next prompts: /sp.implement s-11
- 🧠 Reflection: Split styling for list items with decorative prefixes is a robust pattern for maintaining both the terminal aesthetic and readability/constitution compliance.

## Evaluation notes (flywheel)

- Failure modes observed: Initial regex failure in spec.md due to complex whitespace/input blocks.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
