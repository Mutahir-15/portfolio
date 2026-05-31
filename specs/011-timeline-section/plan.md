# Implementation Plan: S-11 / Timeline Section

**Branch**: `011-timeline-section` | **Date**: 2026-05-31 | **Spec**: [specs/011-timeline-section/spec.md]
**Input**: Feature specification from `/specs/011-timeline-section/spec.md`

## Summary
Implement a complex, content-rich Timeline section showing the GIAIC learning journey. The implementation uses a vertical spine layout with alternating nodes on desktop and a single column on mobile. Cards are interactive (expand/collapse) and animated using Framer Motion (slide/fade entries, height transitions). The implementation strictly adheres to performance (60fps) and accessibility standards.

## Technical Context

**Language/Version**: TypeScript (Next.js 15)
**Primary Dependencies**: Tailwind CSS 4, Framer Motion
**Storage**: N/A (Static authoritative data provided in spec)
**Testing**: `tsc --noEmit`, Manual responsive/animation verification
**Target Platform**: Web (Responsive: Mobile < md, Desktop md+)
**Project Type**: Web application
**Performance Goals**: 60 fps animations, <800ms UI transitions
**Constraints**: Pillar IV compliance (transform/opacity only), Accessibility (ARIA), prefers-reduced-motion support
**Scale/Scope**: Single complex Organism component (`timeline-section.tsx`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Pillar I**: PascalCase components, kebab-case filenames, explicit Props interfaces.
- [x] **Pillar III**: Tailwind 4 tokens only, JetBrains Mono for headings, terminal colors.
- [x] **Pillar IV**: Framer Motion only, opacity/transform only, respects `prefers-reduced-motion`, `once: true` for scroll animations.
- [x] **Pillar VI**: Environment variables validated (N/A for this static section but checked).

## Project Structure

### Documentation (this feature)

```text
specs/011-timeline-section/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Decision log (Phase 0)
├── data-model.md        # Data interfaces and state (Phase 1)
├── quickstart.md        # Dev notes (Phase 1)
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Implementation tasks (Phase 2)
```

### Source Code (repository root)

```text
frontend/
└── components/
    └── sections/
        └── timeline-section.tsx  # Main implementation
```

**Structure Decision**: Single component implementation within the existing `frontend/components/sections/` directory as per S-11 requirements.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Implementation Phases

### Phase A — Define data and types at module level
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Ensure `timelineData` is authoritative and matches the spec exactly. Define variants outside the component to prevent re-renders.
- **Verification**: `tsc --noEmit` returns 0 errors for type definitions.

### Phase B — Implement section shell
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Apply `overflow-x: hidden` to the wrapper to prevent the spine from creating scrollbars on narrow viewports.
- **Verification**: Section heading renders with correct typography and green bar.

### Phase C — Implement vertical spine
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Spine must be absolute within a relative container. Transition from `left: 20px` (mobile) to `left: 50%` (desktop).
- **Verification**: Spine line is visible and correctly positioned on mobile and desktop.

### Phase D — Implement quarter node structure
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Use index % 2 to alternate sides on desktop. Connector dots must be centered on the spine.
- **Verification**: Nodes appear on alternating sides; dots align perfectly with the spine.

### Phase E — Implement card content
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Import `Badge` from `@/components/ui`. Ensure variant colors (green/cyan) are applied correctly to badges and highlights.
- **Verification**: All static card content (title, status, skills, highlights) renders with correct styling.

### Phase F — Implement expand/collapse
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Use `AnimatePresence` for height transitions. Ensure only one index can be stored in `expandedIndex`.
- **Verification**: Clicking a card expands it and collapses any other open card.

### Phase G — Implement Q4 active treatment
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Active pulse must use the `animate-glow-pulse` class from S-2 tokens. Check light mode contrast.
- **Verification**: Q4 card has a distinct left border, shadow, and pulsing badge.

### Phase H — Implement scroll animations
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Use `slideInLeft` for even, `slideInRight` for odd. Respect `prefers-reduced-motion`.
- **Verification**: Nodes animate in from sides on scroll; animations are disabled when reduced motion is preferred.

### Phase I — Accessibility audit
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: `aria-expanded` and `aria-controls` must be dynamically linked to the card IDs.
- **Verification**: Screen reader accessibility and keyboard navigation for expand/collapse.

### Phase J — Full verification
- **Files**: `frontend/components/sections/timeline-section.tsx`
- **Gotcha**: Check for hydration warnings and horizontal overflow.
- **Verification**: All SC-001 through SC-017 pass. `tsc` returns 0 errors.
