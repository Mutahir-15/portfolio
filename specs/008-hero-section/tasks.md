# Tasks: Hero Section (S-8)

**Input**: Design documents from `/specs/008-hero-section/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/hooks.md

## Organization
Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Update sections barrel export in `frontend/components/sections/index.ts`
  - **Action**: Export `HeroSection` from the barrel file.
  - **Code**: `export * from './hero-section';`
  - **Done**: `HeroSection` is available for import from `@/components/sections`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the `useTypewriter` hook which is a dependency for multiple sections.

- [ ] T002 Implement `UseTypewriterOptions` and `UseTypewriterReturn` interfaces in `frontend/hooks/use-typewriter.ts`
  - **Action**: Define the interfaces as specified in `data-model.md`.
  - **Code**:
    ```typescript
    export interface UseTypewriterOptions {
      strings: string[];
      typeSpeed: number;
      deleteSpeed: number;
      pauseDuration: number;
      loop: boolean;
    }
    export interface UseTypewriterReturn {
      displayText: string;
      isTyping: boolean;
      isDeleting: boolean;
      currentIndex: number;
    }
    ```
  - **Done**: Interfaces are exported and correctly typed.

- [ ] T003 Implement `useTypewriter` state machine (Typing phase) in `frontend/hooks/use-typewriter.ts`
  - **Action**: Implement the `useTypewriter` hook using `useState` and `useEffect` with `setTimeout`.
  - **Change**: Characters added one by one at `typeSpeed`.
  - **Done**: Text types forward until it matches the target string.

- [ ] T004 Implement `useTypewriter` state machine (Pausing phase) in `frontend/hooks/use-typewriter.ts`
  - **Action**: Add logic to pause at the end of a string for `pauseDuration`.
  - **Done**: Animation stays at full string for the specified duration.

- [ ] T005 Implement `useTypewriter` state machine (Deleting phase) in `frontend/hooks/use-typewriter.ts`
  - **Action**: Add logic to delete characters at `deleteSpeed` and advance to the next string.
  - **Done**: Hook cycles through the `strings` array correctly.

- [ ] T006 [P] Add prefers-reduced-motion to `useTypewriter` in `frontend/hooks/use-typewriter.ts`
  - **Action**: Use `useReducedMotion()` to skip animation if preferred.
  - **Change**: Return `strings[0]` immediately if `isReducedMotion` is true.
  - **Done**: Animation is skipped when system setting is active.

- [ ] T007 [P] Add edge case guards (EC-002, EC-003) in `frontend/hooks/use-typewriter.ts`
  - **Action**: Handle empty arrays and single-string arrays.
  - **Done**: Hook is robust against malformed input.

---

## Phase 3: User Story 1 - Brand Identity & Role Communication (Priority: P1) 🎯 MVP

**Goal**: Deliver the core Hero content: Mutahir's name and role typewriter.

**Independent Test**: Load the page; name and typewriter should render and animate.

- [ ] T008 [US1] Implement HeroSection shell and layer stack in `frontend/components/sections/hero-section.tsx`
  - **Action**: Setup the full-viewport container with relative positioning and z-index layers.
  - **Code**:
    ```tsx
    'use client';
    import { PageWrapper } from '../layout/page-wrapper';
    export const HeroSection = () => {
      return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
          {/* Layers will go here */}
          <PageWrapper className="relative z-10 text-center">
            {/* Content will go here */}
          </PageWrapper>
        </section>
      );
    };
    ```
  - **Done**: Base layout is centered and full-screen.

- [ ] T009 [P] [US1] Implement terminal prompt prefix (FR-004) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add `> whoami` with Framer Motion fade-in.
  - **Done**: Prompt renders in monospace with a 0.3s delay.

- [ ] T010 [US1] Implement name heading (FR-005) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add `<h1>Mutahir Bin Athar</h1>` with `fadeUp` animation.
  - **Done**: Heading is responsive (terminal-4xl to 2xl) and properly weighted.

- [ ] T011 [US1] Implement typewriter line and bio tagline (FR-006, FR-007) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Integrate `useTypewriter` hook and render role text with a blinking cursor.
  - **Done**: Role titles cycle correctly; bio tagline renders below.

**Checkpoint**: Brand identity is complete and testable.

---

## Phase 4: User Story 2 - Navigation and Calls to Action (Priority: P2)

**Goal**: Enable visitors to navigate to projects and download CV.

**Independent Test**: Click buttons and verify scroll/download behavior.

- [ ] T012 [P] [US2] Implement primary CTA button (FR-008) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add "View Projects" button with smooth scroll to `#projects`.
  - **Done**: Button has terminal green theme and triggers scroll.

- [ ] T013 [P] [US2] Implement secondary CTA button (FR-008) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add "Download CV" button linking to `/cv.pdf`.
  - **Done**: Button has bordered terminal style and triggers download attempt.

**Checkpoint**: CTAs are functional.

---

## Phase 5: User Story 3 - Visual Immersion & Atmosphere (Priority: P3)

**Goal**: Add the ambient Matrix rain and CRT effects.

**Independent Test**: Verify Matrix rain visibility and scanline overlay in dark mode.

- [ ] T014 [US3] Implement `startMatrixRain` function in `frontend/components/sections/hero-section.tsx`
  - **Action**: Implement the vanilla JS canvas animation logic.
  - **Done**: Function manages columns, drops, and drawing characters.

- [ ] T015 [US3] Implement Matrix Rain component integration in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add `<canvas>` element and `useEffect` to trigger the animation.
  - **Done**: Animation runs in background (z-0) and respects theme colors.

- [ ] T016 [P] [US3] Implement scanline overlay and scroll indicator (FR-003, FR-009) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add the horizontal gradient overlay and the bouncing scroll hint.
  - **Done**: CRT effect visible in dark mode; scroll indicator bounces and hides on scroll.

- [ ] T017 [P] [US3] Add prefers-reduced-motion to Matrix rain in `frontend/components/sections/hero-section.tsx`
  - **Action**: Disable canvas animation if reduced motion is preferred.
  - **Done**: Background remains static/empty when system setting is active.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T018 Apply all ARIA attributes (AC-001 to AC-009) in `frontend/components/sections/hero-section.tsx`
  - **Action**: Add `aria-live`, `aria-hidden`, and `aria-label` to relevant elements.
  - **Done**: Component passes basic accessibility check.

- [ ] T019 Run TypeScript verification
  - **Command**: `cd frontend && npx tsc --noEmit`
  - **Done**: 0 errors.

- [ ] T020 Perform Visual & Performance check
  - **Action**: Verify SC-001 to SC-014 in browser. Run Lighthouse.
  - **Done**: 60fps achieved, performance >= 90.

---

## Dependencies & Execution Order

1. **Phase 1 & 2** (Setup & Foundational) must be done first.
2. **Phase 3 (US1)** is the MVP and should be completed before US2/US3.
3. **Phase 4 & 5** can be done in any order but US3 adds the most complexity.
4. **Phase 6** is the final quality gate.

## Parallel Execution Example: User Story 1
- Developer A: T009 (Terminal Prompt) & T010 (Name Heading)
- Developer B: T011 (Typewriter integration)

## Implementation Strategy
- **MVP**: Complete Phase 1-3. This delivers the name and roles.
- **Full**: Complete all phases to deliver the high-fidelity immersive experience.
