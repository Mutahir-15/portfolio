# Tasks: About Section (S-9)

**Input**: Design documents from `/specs/009-about-section/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Basic barrel update and structure check.

- [ ] T001 Update ui/index.ts barrel export in frontend/components/ui/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the reusable `TerminalWindow` atom component.

- [ ] T002 Implement TerminalWindowProps interface in frontend/components/ui/terminal-window.tsx
- [ ] T003 Implement TerminalWindow title bar in frontend/components/ui/terminal-window.tsx
- [ ] T004 Implement traffic light dots in frontend/components/ui/terminal-window.tsx
- [ ] T005 Implement TerminalWindow title text in frontend/components/ui/terminal-window.tsx
- [ ] T006 Implement TerminalWindow content area in frontend/components/ui/terminal-window.tsx
- [ ] T007 Implement TerminalWindow entry animation in frontend/components/ui/terminal-window.tsx

---

## Phase 3: User Story 4 - Immersive Technical Brand (Priority: P3)

**Goal**: Establish the section's visual container, heading pattern, and command prompt aesthetic.

**Independent Test**: Verify the section renders with the correct code-comment heading and terminal window frame.

- [ ] T008 [US4] Implement AboutSection shell in frontend/components/sections/about-section.tsx
- [ ] T009 [US4] Implement section heading pattern (FR-004) in frontend/components/sections/about-section.tsx
- [ ] T010 [US4] Implement two-column grid layout in frontend/components/sections/about-section.tsx
- [ ] T011 [US4] Implement $ cat mutahir.txt command line in frontend/components/sections/about-section.tsx

---

## Phase 4: User Story 1 - Identity & Professional Journey (Priority: P1) 🎯 MVP

**Goal**: Present Mutahir's bio, location, and GIAIC status.

**Independent Test**: Verify bio text and location lines are accurate and readable.

- [ ] T012 [US1] Implement bio paragraphs (3 paragraphs) in frontend/components/sections/about-section.tsx
- [ ] T013 [US1] Implement current focus line in frontend/components/sections/about-section.tsx
- [ ] T014 [US1] Implement location line in frontend/components/sections/about-section.tsx

---

## Phase 5: User Story 2 - Multilingual Greeting & Global Presence (Priority: P2)

**Goal**: Add dynamic multilingual greetings with typewriter effect.

**Independent Test**: Observe the greeting line cycling through English, Arabic, and Urdu strings.

- [ ] T015 [US2] Implement animated greeting with useTypewriter in frontend/components/sections/about-section.tsx
- [ ] T016 [US2] Implement EC-001 Arabic font-sans wrapper in frontend/components/sections/about-section.tsx

---

## Phase 6: User Story 3 - Rapid Skill & Status Scanning (Priority: P2)

**Goal**: Display quick-fact info cards.

**Independent Test**: Verify four info cards render with correct labels and values.

- [ ] T017 [US3] Implement info card component structure in frontend/components/sections/about-section.tsx
- [ ] T018 [US3] Implement all 4 info cards in frontend/components/sections/about-section.tsx
- [ ] T019 [P] [US3] Implement stagger animation on info cards in frontend/components/sections/about-section.tsx

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, final animations, and verification.

- [ ] T020 Implement scroll animations on all elements in frontend/components/sections/about-section.tsx
- [ ] T021 Apply all ARIA attributes (AC-001 to AC-008) in frontend/components/sections/about-section.tsx
- [ ] T022 Update sections barrel export in frontend/components/sections/index.ts
- [ ] T023 TypeScript verification via `cd frontend && tsc --noEmit`
- [ ] T024 Visual verification of SC-001 through SC-015

---

## Detailed Task Implementation

### TASK-1 to TASK-7: TerminalWindow (Foundational)

**TASK-1 (T002): Implement TerminalWindowProps**
```typescript
// frontend/components/ui/terminal-window.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
  animate?: boolean;
}
```

**TASK-2 to TASK-6 (T003-T007): TerminalWindow Component**
```typescript
export default function TerminalWindow({
  title,
  children,
  className = '',
  showDots = true,
  animate = true,
}: TerminalWindowProps) {
  const isReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !isReducedMotion;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        bg-light-surface dark:bg-dark-surface 
        border border-light-border dark:border-dark-border 
        rounded-terminal-lg overflow-hidden 
        dark:shadow-terminal-green
        ${className}
      `}
    >
      {/* Title Bar */}
      <div className="h-10 px-4 flex items-center justify-between bg-light-surface/50 dark:bg-dark-surface/50 border-b border-light-border dark:border-dark-border">
        <div className="flex gap-2" aria-hidden={!showDots}>
          {showDots && (
            <>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28ca41' }} />
            </>
          )}
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">
            {title}
          </span>
        </div>
        <div className="w-12" /> {/* Spacer to center title */}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}
```

**TASK-7 (T001): Barrel Export**
```typescript
// frontend/components/ui/index.ts
export { default as TerminalWindow } from './terminal-window';
```

---

### TASK-8 to TASK-20: AboutSection (User Stories)

**TASK-8 (T008): AboutSection Shell**
```typescript
// frontend/components/sections/about-section.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/layout/page-wrapper';
import { TerminalWindow } from '@/components/ui';
import { useTypewriter } from '@/hooks/use-typewriter';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function AboutSection() {
  const isReducedMotion = useReducedMotion();
  // ... (implementation continues)
}
```

**TASK-9 (T009): Section Heading**
```tsx
<div className="mb-12">
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="font-mono text-light-text-secondary dark:text-dark-text-secondary mb-1"
  >
    // section
  </motion.p>
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-3xl font-mono text-light-primary dark:text-dark-primary inline-block"
  >
    about_me
  </motion.h2>
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: 60 }}
    viewport={{ once: true }}
    className="h-1 bg-light-primary dark:bg-dark-primary mt-1"
  />
</div>
```

**TASK-12 to TASK-16 (T012-T016): Terminal Content**
```tsx
const { displayText } = useTypewriter({
  strings: ["Hello, World! 👋", "Marhaba! مرحبا 👋", "Assalam o Alaikum! 🌙"],
  typeSpeed: 60,
  deleteSpeed: 30,
  pauseDuration: 3000,
});

// Inside TerminalWindow:
<div className="font-mono text-sm mb-4">
  <span className="text-light-text-secondary dark:text-dark-text-secondary">$</span>{" "}
  <span className="text-light-primary dark:text-dark-primary">cat mutahir.txt</span>
</div>

<div className="mb-6 min-h-[1.5rem]" aria-live="polite">
  <span className={displayText.includes('مرحبا') || displayText.includes('السلام') ? 'font-sans' : 'font-mono'}>
    {displayText}
  </span>
  <span className="animate-cursor-blink ml-1 border-r-2 border-light-primary dark:border-dark-primary" aria-hidden="true" />
</div>

<div className="space-y-3 font-sans text-base text-light-text-secondary dark:text-dark-text-secondary">
  <p>I am Mutahir Bin Athar, a software engineer passionate about building intelligent, human-centric applications.</p>
  <p>Currently enrolled in the Governor Sindh Initiative for Agentic AI (GIAIC), Quarter 4, pushing the boundaries of autonomous agents.</p>
  <p>I thrive on Spec-Driven Development (SDD), ensuring every line of code serves a verified architectural purpose.</p>
</div>

<div className="mt-8 space-y-2 font-mono text-sm">
  <p className="text-light-primary dark:text-dark-primary">
    {">"} Currently focused on: <span className="text-light-text-primary dark:text-dark-text-primary">AIDD</span>
    <span className="animate-cursor-blink ml-1" aria-hidden="true">|</span>
  </p>
  <p className="text-light-text-secondary dark:text-dark-text-secondary">
    {">"} Location: Karachi, Pakistan 🇵🇰
  </p>
</div>
```

**TASK-17 to TASK-19 (T017-T019): Info Cards**
```tsx
const infoItems = [
  { label: 'Program', value: 'GIAIC', subValue: 'Agentic AI' },
  { label: 'Quarter', value: '04', subValue: 'In Progress' },
  { label: 'Location', value: 'Karachi', subValue: 'Pakistan' },
  { label: 'Focus', value: 'AIDD', subValue: 'Engineering' },
];

// Grid Layout:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
  <TerminalWindow title="mutahir.txt">
    {/* ... bio content ... */}
  </TerminalWindow>
  
  <div className="space-y-4">
    {infoItems.map((item, i) => (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 * i }}
        className="p-4 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-terminal-lg"
      >
        <p className="text-xs font-mono text-light-text-secondary dark:text-dark-text-secondary">{item.label}</p>
        <p className="text-xl font-mono text-light-primary dark:text-dark-primary">{item.value}</p>
        <p className="text-xs font-sans text-light-text-secondary dark:text-dark-text-secondary">{item.subValue}</p>
      </motion.div>
    ))}
  </div>
</div>
```

---

## Dependencies & Execution Order

1. **Foundational (T001-T007)**: Must complete first to provide the visual container and exports.
2. **User Story 4 (T008-T011)**: Establish the layout and basic section structure.
3. **User Story 1 & 2 (T012-T016)**: Implement the core bio and animated greeting. These can run in parallel if split by component region.
4. **User Story 3 (T017-T019)**: Implement the info cards.
5. **Polish (T020-T024)**: Final a11y, animations, and verification.

---

## Implementation Strategy

### MVP First (User Story 1 & 4)
Focus on rendering the `TerminalWindow` with the bio text first to fulfill the core identity requirement.

### Incremental Delivery
Add the multilingual typewriter effect (US2) and info cards (US3) as secondary increments once the static content is stable.

---

## Notes
- `rounded-terminal-lg` is 8px.
- `shadow-terminal-green` is used for the dark mode glow effect.
- `aria-live="polite"` is CRITICAL for the typewriter greeting.
- Ensure `useReducedMotion` is passed to all motion components.
