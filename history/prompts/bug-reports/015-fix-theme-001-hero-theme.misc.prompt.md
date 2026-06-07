---
id: 015
title: Fix Hero Section Theme Lock (THEME-001)
stage: misc
date: 2026-06-07
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: 011-timeline-section
branch: 011-timeline-section
user: ADMINS
command: /fix THEME-001
labels: ["bug", "theme", "fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/sections/hero-section.tsx
tests:
  - cd frontend && npx tsc --noEmit
---

## Prompt

--fix THEME-001

Bug:        THEME-001 / Hero section locked in dark mode
... [truncated]

## Response snapshot

Implemented the fix for THEME-001 by refactoring `HeroSection` to use the theme-aware paired pattern for all color-related Tailwind classes. Updated background, text, border, and shadow tokens to include both light and dark variants. Also applied the opacity fix to the scanline overlay to ensure it renders correctly in both themes. Verified that no orphaned dark tokens remain and that TypeScript verification passes.

## Outcome

- ✅ Impact: The Hero section now correctly responds to theme toggles, matching the behavior of other sections like About.
- 🧪 Tests: `tsc --noEmit` passed; verified absence of orphaned dark tokens and presence of light variants via `Select-String`.
- 📁 Files: frontend/components/sections/hero-section.tsx
- 🧠 Reflection: Systematic application of the paired variant pattern is essential for Tailwind-based theme systems. Hardcoded dark-only tokens in high-level components are a common source of theme locks.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
