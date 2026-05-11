---
id: 007
title: Fix C1 Reduced Motion
stage: misc
date: 2026-05-11
surface: agent
model: gemini-2.0-flash-exp
feature: base-layout
branch: 005-base-layout
user: admin
command: /sp.analyze --fix L1
labels: [remediation, base-layout, accessibility, framer-motion]
links:
  spec: specs/005-base-layout/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-base-layout/tasks.md
tests:
 - n/a
---

## Prompt

--fix L1

Issue:      L1 / LOW / Constitution IV violation
Finding:    Navbar hide/show (translateY) and mobile menu
            (opacity + translateY) use Framer Motion but
            neither checks prefers-reduced-motion.
            Constitution Pillar IV mandates ALL Framer
            Motion animations wrap with useReducedMotion().

Action:     Add useReducedMotion check to Navbar for both
            the scroll hide/show animation and the mobile
            menu animation.

Update TASK-7 and TASK-9 in tasks.md:

  TASK-7 update — Navbar scroll animation:
    Import useReducedMotion from framer-motion.
    Define at top of Navbar component:
      const prefersReducedMotion = useReducedMotion()

    Navbar Framer Motion variants must check this flag:

      const navbarVariants = {
        visible: {
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.3
          }
        },
        hidden: {
          y: prefersReducedMotion ? 0 : '-100%',
          transition: {
            duration: prefersReducedMotion ? 0 : 0.3
          }
        }
      }

    When prefersReducedMotion is true:
      - Navbar does NOT hide on scroll down
      - Navbar stays permanently visible
      - No translateY transform applied
    Rationale: hiding navigation from reduced-motion
    users is a UX accessibility violation — they cannot
    scroll back up to trigger show if animation is
    the trigger mechanism.

  TASK-9 update — Mobile menu animation:
    Reuse the same prefersReducedMotion constant.
    Mobile menu Framer Motion variants:

      const menuVariants = {
        open: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.2
          }
        },
        closed: {
          opacity: prefersReducedMotion ? 1 : 0,
          y: prefersReducedMotion ? 0 : -8,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.2
          }
        }
      }

    When prefersReducedMotion is true:
      - Menu appears/disappears instantly (no animation)
      - isMenuOpen state still controls visibility
      - Use display none via conditional render
        instead of opacity animation

Done:
  - useReducedMotion imported from framer-motion
  - Navbar scroll hide/show disabled when reduced
    motion is preferred
  - Mobile menu animates only when reduced motion
    is not preferred
  - Constitution Pillar IV fully satisfied
  - tsc --noEmit returns EXACTLY 0 errors

## Response snapshot

I have fixed the issue of missing `prefers-reduced-motion` checks (L1/C1). I updated the `Navbar` component tasks (T006 and T008) in `tasks.md` to include logic for importing and using `useReducedMotion()`. The updated logic ensures that animations are disabled and the Navbar remains visible for users who prefer reduced motion, satisfying Constitution Pillar IV.

## Outcome

- ✅ Impact: Improved accessibility and ensured compliance with project performance and animation standards.
- 🧪 Tests: n/a
- 📁 Files: `specs/005-base-layout/tasks.md` updated.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Proactively checking for reduced motion preferences is a core part of building inclusive and professional-grade user interfaces.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
