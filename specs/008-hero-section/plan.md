# Implementation Plan: Hero Section (S-8)

**Branch**: `008-hero-section` | **Date**: 2026-05-17 | **Spec**: [specs/008-hero-section/spec.md](spec.md)

## Summary
Implement a high-impact, terminal-themed Hero section for the portfolio. This involves a custom `useTypewriter` hook for dynamic role communication, a high-performance HTML5 Canvas "Matrix rain" animation, and a polished UI using Framer Motion and Tailwind CSS 4. The implementation will prioritize accessibility and performance, respecting system-level reduced motion preferences.

## Technical Context

**Language/Version**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: Tailwind CSS 4, Framer Motion
**Storage**: N/A
**Testing**: `tsc --noEmit`, manual visual verification, Lighthouse
**Target Platform**: Web (Cross-browser compatible)
**Project Type**: Web Application
**Performance Goals**: 60fps animation, < 0.1 CLS, Lighthouse Performance >= 90
**Constraints**: Respect `prefers-reduced-motion`, Component < 150 lines
**Scale/Scope**: organism-level section component + shared custom hook

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Principle I: Strict TypeScript, kebab-case filenames, PascalCase components.
- [x] Principle II: Next.js 15 App Router, Atomic design (sections).
- [x] Principle III: Tailwind CSS 4 design tokens, Dark/Light mode support.
- [x] Principle IV: Framer Motion for animations, `useReducedMotion` support.

## Project Structure

### Documentation (this feature)

```text
specs/008-hero-section/
├── spec.md              # Requirements
├── plan.md              # This file
├── research.md          # Implementation investigations
├── data-model.md        # Interface definitions
├── quickstart.md        # Dev & Test flow
└── contracts/           # Hook and Component signatures
    └── hooks.md
```

### Source Code

```text
frontend/
├── hooks/
│   └── use-typewriter.ts
├── components/
│   ├── sections/
│   │   └── hero-section.tsx
│   └── ui/
│       └── matrix-rain.tsx  # (If extracted for line limit)
```

## Complexity Tracking

*No violations identified.*

---

## Implementation Phases

### Phase A — Implement `hooks/use-typewriter.ts`
- **Goal**: Create a reusable typewriter hook with a robust state machine.
- **Tasks**:
  - Implement `TYPING`, `PAUSING`, `DELETING` states.
  - Handle `prefers-reduced-motion` for static fallback.
  - Address `EC-002` (empty array) and `EC-003` (single string).
- **Files**: `frontend/hooks/use-typewriter.ts`
- **Gotcha**: Ensure `setTimeout` is cleaned up correctly on every effect run to avoid overlapping timers.
- **Verification**: Manually verify cycle logic (type -> pause -> delete -> next) in a test component.

### Phase B — Implement Matrix Rain Canvas Logic
- **Goal**: Create a performant matrix rain animation.
- **Tasks**:
  - Implement `startMatrixRain` standalone function.
  - Setup `requestAnimationFrame` loop with character drop logic.
  - Apply theme-specific opacity and colors.
  - Handle `EC-001` (null context guard).
- **Files**: `frontend/components/sections/hero-section.tsx` (initially)
- **Gotcha**: Canvas must resize correctly with the window; use `aria-hidden="true"`.
- **Verification**: Confirm animation runs at 60fps and stops when switching to a non-hero page or enabling reduced motion.

### Phase C — Implement `HeroSection` Structure
- **Goal**: Setup the visual scaffolding and layout.
- **Tasks**:
  - Use `min-h-screen`, `flex`, `items-center`, `justify-center`.
  - Layer stack: Canvas (z-0) -> Scanline (z-1) -> Content (z-10).
  - Use `PageWrapper` for horizontal padding.
- **Files**: `frontend/components/sections/hero-section.tsx`
- **Gotcha**: Ensure `pt-16` accounts for the fixed Navbar.
- **Verification**: Check layout on mobile/desktop; ensure no horizontal scroll.

### Phase D — Implement Hero Content (FR-004 to FR-007)
- **Goal**: Add terminal-themed text elements with Framer Motion.
- **Tasks**:
  - Add `> whoami` prompt.
  - Add `<h1>` name heading.
  - Integrate `useTypewriter` with blinking cursor.
  - Add bio tagline.
- **Files**: `frontend/components/sections/hero-section.tsx`
- **Gotcha**: `aria-live="polite"` must be on the typewriter container.
- **Verification**: Confirm entrance animations (fadeUp) and typewriter correctness.

### Phase E — Implement CTA Buttons (FR-008)
- **Goal**: Add functional primary and secondary buttons.
- **Tasks**:
  - Style buttons with terminal theme tokens.
  - Implement smooth scroll to `#projects`.
  - Implement download for `/cv.pdf`.
- **Files**: `frontend/components/sections/hero-section.tsx`
- **Gotcha**: Download might 404 until Phase 5; this is acceptable.
- **Verification**: Click "View Projects" and verify scroll behavior.

### Phase F — Implement Scroll Indicator (FR-009)
- **Goal**: Add a bouncing hint at the bottom.
- **Tasks**:
  - Implement `y` oscillation with Framer Motion.
  - Add scroll listener to hide indicator after 100px.
- **Files**: `frontend/components/sections/hero-section.tsx`
- **Gotcha**: Cleanup scroll listener on unmount.
- **Verification**: Scroll down and confirm the indicator fades/hides.

### Phase G — Accessibility Audit
- **Goal**: Ensure the component is usable by all.
- **Tasks**:
  - Apply `aria-hidden` to decorative elements (canvas, cursor, scroll indicator).
  - Verify heading hierarchy (`<h1>`).
  - Check button `aria-labels`.
- **Files**: `frontend/components/sections/hero-section.tsx`
- **Gotcha**: Screen readers should announce the roles via the `aria-live` region.
- **Verification**: Run axe-core or Chrome Lighthouse.

### Phase H — Full Verification
- **Goal**: Final quality check.
- **Tasks**:
  - Run `tsc --noEmit`.
  - Verify SC-001 through SC-014.
  - Confirm Lighthouse Performance score.
- **Files**: All feature files.
- **Gotcha**: No hydration mismatches should appear in the console.
- **Verification**: SUCCESS CRITERIA met.
