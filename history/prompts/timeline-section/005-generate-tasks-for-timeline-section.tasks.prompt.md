---
id: 014
title: Generate tasks for timeline section
stage: tasks
date: 2026-06-01
surface: agent
model: gemini-2.0-flash
feature: 011-timeline-section
branch: 011-timeline-section
user: Mutahir
command: /sp.tasks
labels: ["tasks", "timeline", "s-11"]
links:
  spec: specs/011-timeline-section/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/011-timeline-section/tasks.md
tests:
 - npx tsc --noEmit
---

## Prompt

Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.

Context for task generation: Spec: S-11 / Timeline Section Plan: Use phase plan from /sp.plan for S-11 --- ## TASK FORMAT TASK-[N]: [Action verb] [description] File: [exact path from repo root] Change: [exact code to write] Done: [specific verifiable condition] --- ## TASK LIST TASK-1: Define TimelineEvent interface File: frontend/components/sections/timeline-section.tsx Done: Interface typed with 7 fields, status union 'completed'|'active', variant union 'green'|'cyan', tsc accepts with 0 errors TASK-2: Define timelineData constant File: frontend/components/sections/timeline-section.tsx Done: All 4 quarters populated from spec, defined at module level, typed as TimelineEvent[], tsc accepts with 0 errors TASK-3: Define fadeUpVariant at module level File: frontend/components/sections/timeline-section.tsx Done: Matches @skill/framer-animation exactly: hidden: opacity 0 y 20, visible: opacity 1 y 0, 0.5s easeOut TASK-4: Define slideInLeft variant at module level File: frontend/components/sections/timeline-section.tsx Done: hidden: opacity 0 x -30, visible: opacity 1 x 0, 0.5s easeOut TASK-5: Define slideInRight variant at module level File: frontend/components/sections/timeline-section.tsx Done: hidden: opacity 0 x 30, visible: opacity 1 x 0, 0.5s easeOut TASK-6: Implement TimelineSection shell File: frontend/components/sections/timeline-section.tsx Done: 'use client', id="timeline", py-terminal-xl, PageWrapper, overflow-x-hidden on section TASK-7: Implement section heading File: frontend/components/sections/timeline-section.tsx Done: @skill/section-heading pattern: '// section' + 'journey' h2 + 60px green bar, fadeUpVariant applied TASK-8: Implement timeline container + spine File: frontend/components/sections/timeline-section.tsx Done: relative container, absolute spine line 2px, desktop left:50%, mobile left:20px, dark/light colors TASK-9: Implement node alternating layout File: frontend/components/sections/timeline-section.tsx Done: even index → left side desktop, odd index → right side desktop, all right on mobile (flex-col) TASK-10: Implement connector dot File: frontend/components/sections/timeline-section.tsx Done: w-4 h-4 circle on spine, color matches event.variant, aria-hidden="true" TASK-11: Implement active pulse ring on Q4 dot File: frontend/components/sections/timeline-section.tsx Done: Extra span behind dot, animate-glow-pulse class, aria-hidden="true", hidden when useReducedMotion() true TASK-12: Implement quarter label + period File: frontend/components/sections/timeline-section.tsx Done: '[Q1]' format in variant color font-mono bold, period in muted terminal-xs TASK-13: Implement card shell File: frontend/components/sections/timeline-section.tsx Done: bg-dark-surface border, rounded-terminal-lg p-6, hover border color transition 150ms TASK-14: Implement Q4 active card treatment File: frontend/components/sections/timeline-section.tsx Done: border-l-4 border-l-dark-green on active card, shadow-terminal-green, only when status === 'active' TASK-15: Implement card title + status badge File: frontend/components/sections/timeline-section.tsx Done: <h3> in font-mono terminal-lg, [completed] or [active ▶] badge, active badge bg-dark-green text-dark-bg TASK-16: Implement skills badges in card File: frontend/components/sections/timeline-section.tsx Done: Badge component from S-10, event.variant passed as variant prop, size="sm", flex flex-wrap gap-2 TASK-17: Implement expandedIndex state File: frontend/components/sections/timeline-section.tsx Done: useState<number | null>(null), toggleExpand function that sets null when same index clicked again, sets new index when different card TASK-18: Implement collapsible content wrapper File: frontend/components/sections/timeline-section.tsx Done: AnimatePresence wraps motion.div, height 0→auto, opacity 0→1, 0.3s duration, instant when useReducedMotion() true TASK-19: Implement description paragraph File: frontend/components/sections/timeline-section.tsx Done: font-sans terminal-sm leading-relaxed, muted color, inside collapsible div TASK-20: Implement highlights list File: frontend/components/sections/timeline-section.tsx Done: '▸ ' prefix aria-hidden, each item font-mono terminal-xs, gap-1 between items, inside collapsible div TASK-21: Implement expand/collapse toggle button File: frontend/components/sections/timeline-section.tsx Done: '[+ expand]' / '[- collapse]' text, font-mono terminal-xs variant color, py-3 minimum touch target (EC-002), cursor-pointer, always visible TASK-22: Apply aria-expanded + aria-controls File: frontend/components/sections/timeline-section.tsx Done: aria-expanded={isExpanded} on button, aria-controls="quarter-{index}-content", id="quarter-{index}-content" on panel TASK-23: Implement scroll animations on nodes File: frontend/components/sections/timeline-section.tsx Done: Even nodes: slideInLeft variant, odd nodes: slideInRight variant, mobile: fadeUpVariant, delay: index * 0.1s, whileInView once:true margin:'-80px', all skipped when useReducedMotion() TASK-24: Apply all ARIA attributes File: frontend/components/sections/timeline-section.tsx Done: AC-001 through AC-008 all applied, aria-hidden on dots, prefix, pulse TASK-25: Update sections barrel export File: frontend/components/sections/index.ts Done: TimelineSection exported from barrel TASK-26: TypeScript verification Run: cd frontend && tsc --noEmit Done: EXACTLY 0 TypeScript errors TASK-27: Visual + interaction verification Done: SC-001 through SC-017 confirmed EC-001: Q4 glow visible in light mode EC-002: toggle button ≥ 44px height EC-003: only 1 card open at a time EC-005: no horizontal scroll at any width Generate exact implementation code for TASK-1 through TASK-25. TASK-26 and TASK-27 are verification tasks — provide exact CLI commands and browser checks.

The tasks.md should be immediately executable - each task must be specific enough that an LLM can complete it without additional context.

## Response snapshot

Generated actionable, dependency-ordered tasks.md for the Timeline Section (S-11) following the user story organization and strict checklist format.

## Outcome

- ✅ Impact: High - Defines the roadmap for the most complex static section of the portfolio.
- 🧪 Tests: TSC verification tasks included.
- 📁 Files: Created specs/011-timeline-section/tasks.md
- 🔁 Next prompts: /sp.implement s-11
- 🧠 Reflection: Successfully integrated skills (@skill/section-heading, @skill/framer-animation) into the task definitions to ensure consistency.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
