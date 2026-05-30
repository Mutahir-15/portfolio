# Tasks: Skills Section (S-10)

**Input**: Design documents from `/specs/010-skills-section/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] Update ui barrel export in `frontend/components/ui/index.ts`
      Done: `export * from './badge'` added to barrel.
- [ ] T002 [P] Update sections barrel export in `frontend/components/sections/index.ts`
      Done: `export * from './skills-section'` added to barrel.

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Implement `BadgeProps` interface in `frontend/components/ui/badge.tsx`
      Done: Interface typed with 4 fields — label, variant, size, className — all with correct types and defaults.
      Change:
      ```typescript
      interface BadgeProps {
        label: string;
        variant?: 'green' | 'cyan' | 'muted';
        size?: 'sm' | 'md';
        className?: string;
      }
      ```
- [ ] T004 Implement Badge base styles in `frontend/components/ui/badge.tsx`
      Done: inline-flex, font-mono, border-terminal, rounded-terminal-md, 150ms transition.
- [ ] T005 Implement Badge size variants in `frontend/components/ui/badge.tsx`
      Done: md: px-3 py-1.5 terminal-sm, sm: px-2 py-1 terminal-xs.
- [ ] T006 [P] Define Skill and SkillCategory interfaces in `frontend/components/sections/skills-section.tsx`
      Done: Both interfaces typed correctly, tsc accepts with 0 errors.
- [ ] T007 Define skillCategories typed constant in `frontend/components/sections/skills-section.tsx`
      Done: All 4 categories, all 15 skills, correct variants per category, 'as const satisfies SkillCategory[]'.
- [ ] T008 [P] Define animation variants in `frontend/components/sections/skills-section.tsx`
      Done: `fadeUpVariant` and `containerVariant` defined at module level.

---

## Phase 3: User Story 1 - View Skill Inventory (Priority: P1) 🎯 MVP

**Goal**: Implement the basic Skills section with categorized grid and skill badges.

**Independent Test**: Section renders at `#skills` with all 15 skills categorized correctly.

- [ ] T009 [US1] Implement Badge variant styles in `frontend/components/ui/badge.tsx`
      Done: Green and Cyan idle/hover states for dark/light modes.
- [ ] T010 [US1] Implement dot indicator in `frontend/components/ui/badge.tsx`
      Done: 1.5x1.5 rounded span, hidden for muted variant, aria-hidden="true".
- [ ] T011 [US1] Implement SkillsSection shell and heading in `frontend/components/sections/skills-section.tsx`
      Done: 'use client', id="skills", section heading pattern with 60px green bar.
- [ ] T012 [US1] Implement category grid layout and blocks in `frontend/components/sections/skills-section.tsx`
      Done: 2x2 grid (desktop), flex-col (mobile), category headers with icons.
- [ ] T013 [US1] Render skill badges from data in `frontend/components/sections/skills-section.tsx`
      Done: Map `skillCategories` to UI, all 15 badges render with correct props.

---

## Phase 4: User Story 2 - Interactive Feedback (Priority: P2)

**Goal**: Add hover micro-interactions to skill badges.

**Independent Test**: Badges scale up and glow on hover.

- [ ] T014 [US2] Implement Badge hover animation in `frontend/components/ui/badge.tsx`
      Done: Framer Motion whileHover scale: 1.05, duration 150ms, transform-only.
- [ ] T015 [US2] Implement Badge muted variant in `frontend/components/ui/badge.tsx`
      Done: No dot, no hover glow, muted colors.

---

## Phase 5: User Story 3 - Engaging Entry Animation (Priority: P3)

**Goal**: Add staggered scroll-in animations for the section and categories.

**Independent Test**: Section and blocks stagger correctly when scrolled into view.

- [ ] T016 [US3] Implement scroll animation on heading in `frontend/components/sections/skills-section.tsx`
      Done: fadeUpVariant triggers whileInView.
- [ ] T017 [US3] Implement stagger animation on categories in `frontend/components/sections/skills-section.tsx`
      Done: containerVariant on parent, fadeUpVariant on category blocks.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T018 [P] Apply `useReducedMotion` checks in `frontend/components/ui/badge.tsx` and `frontend/components/sections/skills-section.tsx`
      Done: Animations skipped when `useReducedMotion()` is true.
- [ ] T019 [P] Accessibility final audit in both files
      Done: ARIA attributes (AC-001 to AC-007) verified.
- [ ] T020 [P] TypeScript verification
      Done: Run `cd frontend && npx tsc --noEmit`. 0 errors.
- [ ] T021 Visual verification
      Done: Manual check of responsive layout (320px), icon rendering, and dark/light modes.

---

## Dependencies & Execution Order

- **Phase 1 & 2** are foundational and block all user stories.
- **Phase 3 (US1)** is the MVP and can be tested once complete.
- **Phase 4 (US2)** and **Phase 5 (US3)** enhance the UI and depend on Phase 3.
- **Phase 6** is final polish and verification.

## Implementation Details

### Badge Component Skeleton (T003-T010, T014-T015)
```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'green' | 'cyan' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge = ({ label, variant = 'green', size = 'md', className }: BadgeProps) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    green: "bg-dark-surface text-dark-text border-dark-border hover:border-dark-green hover:text-dark-green hover:shadow-terminal-green dark:bg-dark-surface dark:text-dark-text dark:border-dark-border dark:hover:border-dark-green dark:hover:text-dark-green dark:hover:shadow-terminal-green",
    cyan: "bg-dark-surface text-dark-text border-dark-border hover:border-dark-cyan hover:text-dark-cyan hover:shadow-terminal-cyan",
    muted: "bg-dark-surface text-dark-muted border-dark-border hover:border-white/20"
  };

  const sizes = {
    md: "px-3 py-1.5 text-xs",
    sm: "px-2 py-1 text-[10px]"
  };

  const dotColors = {
    green: "bg-dark-green",
    cyan: "bg-dark-cyan",
    muted: ""
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "inline-flex items-center gap-2 font-mono border rounded-terminal-md cursor-default transition-all duration-150",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {variant !== 'muted' && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} aria-hidden="true" />
      )}
      {label}
    </motion.div>
  );
};
```

### SkillsSection Data & Variants (T006-T008, T012)
```tsx
interface Skill {
  label: string;
  variant: 'green' | 'cyan';
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

const skillCategories = [
  {
    name: 'Languages',
    icon: 'λ',
    skills: [
      { label: 'TypeScript', variant: 'green' },
      { label: 'Python', variant: 'green' },
      { label: 'JavaScript', variant: 'green' },
    ],
  },
  // ... rest of categories
] as const satisfies SkillCategory[];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
```
