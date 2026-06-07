---
id: 014
title: Investigate Hero Section Theme Bug (THEME-001)
stage: misc
date: 2026-06-07
surface: agent
model: gemini-2.0-flash-thinking-preview
feature: 011-timeline-section
branch: 011-timeline-section
user: ADMINS
command: /bug THEME-001
labels: ["bug", "theme", "investigation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/sections/hero-section.tsx
  - frontend/components/ui/matrix-rain.tsx
  - frontend/app/layout.tsx
tests:
  - none
---

## Prompt

--bug THEME-001

Bug:        THEME-001 / Theme toggle not working
            on homepage (Hero section)
... [truncated]

## Response snapshot

Produced a structured diagnosis report for bug THEME-001. Identified the root cause as the usage of static dark theme tokens (e.g., `bg-dark-background`) in `HeroSection` without `light:` variants or `dark:` prefixes. Confirmed that the global theme system and `MatrixRain` component are working correctly, but `HeroSection` bypasses them by hardcoding dark variants.

## Outcome

- ✅ Impact: Diagnosis completed; root cause identified as incorrect Tailwind class implementation in HeroSection.
- 🧪 Tests: none
- 📁 Files: frontend/components/sections/hero-section.tsx, frontend/components/ui/matrix-rain.tsx
- 🧠 Reflection: Comparison with a "known good" section (AboutSection) was key to identifying the missing variant pattern.

## Evaluation notes (flywheel)

- Failure modes observed: `grep` not available (replaced with `Select-String`).
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
