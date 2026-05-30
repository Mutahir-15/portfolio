# Implementation Plan: Skills Section (S-10)

**Branch**: `010-skills-section` | **Date**: 2026-05-30 | **Spec**: [specs/010-skills-section/spec.md](spec.md)
**Input**: Feature specification for a categorized Skills section and a reusable Badge component.

## Summary

Implement a categorized technology skills section (Languages, Frameworks, AI/ML, Tools) using a new reusable `Badge` atom. The section will feature staggered scroll animations using Framer Motion and a terminal-inspired visual design consistent with the portfolio theme.

## Technical Context

**Language/Version**: TypeScript (Next.js 15 App Router)
**Primary Dependencies**: Tailwind CSS 4, Framer Motion
**Storage**: N/A (Static constants)
**Testing**: `tsc --noEmit`, Manual responsive verification (320px+), Lighthouse Performance Audit
**Target Platform**: Web (Cross-browser, Mobile-first)
**Project Type**: Web application
**Performance Goals**: 60fps animations, layout-shift-free hovers
**Constraints**: `prefers-reduced-motion` support, WCAG 2.1 AA contrast compliance
**Scale/Scope**: 15 skills across 4 categories; 1 reusable UI component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict TypeScript**: `strict: true` enforced, explicit Props interfaces.
- [x] **File Naming**: `kebab-case` for `badge.tsx` and `skills-section.tsx`.
- [x] **Component Naming**: `PascalCase` components, `camelCase` hooks.
- [x] **Atomic Design**: `Badge` in `components/ui`, `SkillsSection` in `components/sections`.
- [x] **Styling**: Tailwind CSS 4 exclusively, using theme tokens.
- [x] **Animations**: Framer Motion exclusively, transform-only whileHover.
- [x] **Performance**: Images (if any) via `next/image`, CLS < 0.1.
- [x] **Accessibility**: Focus rings, ARIA hidden on decorative icons, `prefers-reduced-motion`.

## Project Structure

### Documentation (this feature)

```text
specs/010-skills-section/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this static feature)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   └── index.ts
│   └── sections/
│       ├── skills-section.tsx
│       └── index.ts
└── lib/
    └── utils.ts
```

**Structure Decision**: Web application frontend-only for this phase. Follows atomic design pattern (ui/sections).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. Implementation follows established portfolio architectural standards.

## Implementation Phases

### Phase A — Implement Badge atom
- **Exact files touched**: `frontend/components/ui/badge.tsx`
- **Key implementation gotcha**: Ensure `whileHover` uses `scale` only to avoid layout triggers. Variant colors must pull from Tailwind 4 theme tokens.
- **Verification**: Render `Badge` with each variant (green, cyan, muted) and size (sm, md) in a temporary test page or isolation.

### Phase B — Update ui/index.ts barrel
- **Exact files touched**: `frontend/components/ui/index.ts`
- **Key implementation gotcha**: Ensure default and named exports are consistent with other components.
- **Verification**: Confirm `import { Badge } from '@/components/ui'` resolves in VS Code without errors.

### Phase C — Define skills data structure
- **Exact files touched**: `frontend/components/sections/skills-section.tsx` (defined outside component)
- **Key implementation gotcha**: Use `as const satisfies SkillCategory[]` for maximum type safety and narrowing.
- **Verification**: `tsc --noEmit` should pass with the typed constant.

### Phase D — Implement SkillsSection shell
- **Exact files touched**: `frontend/components/sections/skills-section.tsx`
- **Key implementation gotcha**: ID `skills` must be exactly as specified for anchor navigation. Heading underline must be 60px wide and green.
- **Verification**: Section renders with visible heading and correct vertical padding.

### Phase E — Implement category grid layout
- **Exact files touched**: `frontend/components/sections/skills-section.tsx`
- **Key implementation gotcha**: Use `grid-cols-2` on `md` and above; `flex-col` on mobile. Ensure `gap-8` spacing.
- **Verification**: Check layout at 375px (mobile) and 1440px (desktop).

### Phase F — Render skill badges from data
- **Exact files touched**: `frontend/components/sections/skills-section.tsx`
- **Key implementation gotcha**: Map over `skillCategories` and `category.skills` nestedly. Assign correct variant/size props to `Badge`.
- **Verification**: 15 badges are visible across the 4 blocks.

### Phase G — Implement scroll animations
- **Exact files touched**: `frontend/components/sections/skills-section.tsx`
- **Key implementation gotcha**: Stagger delay (0.15s) must be applied via `containerVariant` to category blocks. heading uses `fadeUpVariant`.
- **Verification**: Refresh page, scroll to section, verify staggered fade-up.

### Phase H — Accessibility audit
- **Exact files touched**: `frontend/components/ui/badge.tsx`, `frontend/components/sections/skills-section.tsx`
- **Key implementation gotcha**: `aria-hidden="true"` on decorative dot and icons. Verify `tabIndex={0}` on badges for future-proofing.
- **Verification**: Screen reader (VoiceOver/NVDA) announces section heading and badge labels correctly.

### Phase I — Full verification
- **Exact files touched**: All modified files.
- **Key implementation gotcha**: Check long labels (EC-001) on 320px wide viewports. Unicode glyphs (EC-003) must render correctly.
- **Verification**: `tsc --noEmit` is clean. Lighthouse Accessibility score ≥ 95. SC-001 through SC-015 validated.
