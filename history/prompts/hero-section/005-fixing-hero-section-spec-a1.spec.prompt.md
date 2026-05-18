---
id: 005
title: Fixing Hero Section Spec (A1)
stage: spec
date: 2026-05-18
surface: agent
model: gemini-2.0-flash
feature: hero-section
branch: 008-hero-section
user: ADMINS
command: --fix A1
labels: ["spec", "precision", "hero-section"]
links:
  spec: specs/008-hero-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/008-hero-section/spec.md
tests:
 - none
---

## Prompt

--fix A1

Issue:      A1 / LOW / "Subtle" is qualitative
Finding:    FR-002 uses the word "subtle" to describe
            matrix rain opacity and FR-003 describes
            scanlines as a "subtle CRT effect".
            These are non-measurable descriptors —
            two developers reading this could produce
            visibly different results.

Action:     Replace all qualitative descriptors with
            exact numeric values in spec.md.

Update FR-002 in spec.md — Matrix Rain opacity:
  BEFORE:
    opacity:
      Dark mode:  0.07  (very subtle, not distracting)
      Light mode: 0.04  (even more subtle on light bg)

  AFTER (no change to values — remove qualitative text):
    opacity:
      Dark mode:  0.07  — exact value, do not adjust
      Light mode: 0.04  — exact value, do not adjust
    Deviation rule: values outside 0.04–0.10 range
    require explicit approval — do not tweak for taste.

Update FR-003 in spec.md — Scanline overlay:
  BEFORE:
    "repeating linear gradient of alternating
     transparent / rgba(0,0,0,0.03) lines each 2px tall"

  AFTER (explicit, measurable):
    Background: repeating-linear-gradient(
      transparent 0px,
      transparent 1px,
      rgba(0,0,0,0.03) 1px,
      rgba(0,0,0,0.03) 2px
    )
    Line height: 2px (1px transparent + 1px tinted)
    Tint alpha:  0.03 — exact value, do not adjust
    Deviation rule: alpha outside 0.02–0.05 range
    requires explicit approval.

Update SC-006 in spec.md to include numeric targets:
  BEFORE:
    SC-006: Matrix rain visible (subtle) in dark mode,
            lighter in light mode

  AFTER:
    SC-006: Matrix rain canvas opacity = 0.07 in dark
            mode and 0.04 in light mode.
            Verified via browser DevTools:
              Inspect canvas element →
              Computed styles → opacity
            Expected values: 0.07 (dark), 0.04 (light)

Add SC-015 to spec.md:
  SC-015: Scanline overlay rgba alpha = 0.03
          Verified via DevTools computed background
          or by inspecting the inline style/class.

Create a PHR for this fix at:
  history/prompts/hero-section/

## Response snapshot

I have updated `specs/008-hero-section/spec.md` to remove qualitative descriptors and replace them with exact numeric values for the Matrix rain opacity and Scanline overlay. 

Key changes:
- Updated User Story 3 to include specific opacity (0.07/0.04) and alpha (0.03) targets.
- Refined FR-002 (Matrix Rain) with exact opacity values and a deviation rule (0.04-0.10 range).
- Refined FR-007 (Scanline Overlay) with the exact `repeating-linear-gradient` CSS and 0.03 alpha target.
- Added SC-006 and SC-015 to provide measurable success criteria and verification steps using browser DevTools.

## Outcome

- ✅ Impact: High. Improved spec precision prevents qualitative interpretation of visual effects.
- 🧪 Tests: none (spec change only)
- 📁 Files: specs/008-hero-section/spec.md
- 🔁 Next prompts: Continue with hero-section implementation.
- 🧠 Reflection: Removing "subtle" and replacing it with measurable values (opacity/alpha/gradients) makes the spec significantly more robust for engineering.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
