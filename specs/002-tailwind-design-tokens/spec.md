# Feature Specification: S-2 / Tailwind Design Tokens (Hardened)

**Feature Branch**: `002-tailwind-design-tokens`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "Project: Mutahir Bin Athar — Personal Portfolio Spec: S-2 / Tailwind Design Tokens (v2 — post-analysis hardened)..."

## OBJECTIVE

Define and implement the complete design token system inside `tailwind.config.ts`. This is the single source of truth for every color, font, spacing, animation, and keyframe used across the entire portfolio. No component styling yet — tokens only. Every future spec will consume these tokens. No hardcoded hex values are ever allowed after this spec.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Single Source of Truth (Priority: P1)

As a developer, I want a single configuration file that defines all visual constants so that I can ensure 100% design consistency across all current and future components.

**Why this priority**: Without a foundation of tokens, the UI will inevitably drift into inconsistency, making maintenance difficult.

**Independent Test**: Can be verified by inspecting `tailwind.config.ts` and confirming all 58 tokens are present and correctly defined.

**Acceptance Scenarios**:

1. **Given** a design token is updated in the config, **When** the application reloads, **Then** all elements using that token must reflect the change immediately.
2. **Given** a new component is being developed, **When** adding styles, **Then** only tokens defined in `tailwind.config.ts` must be used.

---

### User Story 2 - Performance-Compliant Animations (Priority: P1)

As a visitor, I want to see smooth terminal animations that do not lag or cause high CPU usage so that the experience remains fluid even on lower-end devices.

**Why this priority**: Performance is a core pillar of the portfolio constitution. Layout-triggering animations are forbidden.

**Independent Test**: Verified by checking that all animation keyframes in `tailwind.config.ts` only target `transform` or `opacity`.

**Acceptance Scenarios**:

1. **Given** any animation is active, **When** viewed in the browser's performance tool, **Then** it must not trigger "Layout" or "Paint" recalculations.

---

### User Story 3 - Resilient Font Fallbacks (Priority: P2)

As a user with system-specific restrictions, I want the portfolio to remain readable and maintain its "terminal" aesthetic even if the primary web fonts fail to load.

**Why this priority**: Ensures accessibility and brand continuity in varied network/system conditions.

**Independent Test**: Verified by blocking `next/font` loading and confirming the browser falls back through the defined chain (Fira Code -> Consolas -> monospace).

**Acceptance Scenarios**:

1. **Given** font loading fails, **When** the page renders, **Then** a monospace fallback must be used for all UI elements.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implement dark and light color palettes (8 tokens each) under `theme.extend.colors.dark` and `theme.extend.colors.light`.
- **FR-002**: Implement `fontFamily` tokens for `mono` and `sans` stacks under `theme.extend.fontFamily`.
- **FR-003**: Implement terminal `fontSize` scale with **EXPLICIT** line-height values — no subjective descriptors. [FIX: A1]
- **FR-004**: Implement terminal `spacing` scale under `theme.extend.spacing`.
- **FR-005**: Implement terminal `borderRadius` scale under `theme.extend.borderRadius`.
- **FR-006**: Implement terminal `boxShadow` tokens under `theme.extend.boxShadow` (glow effects).
- **FR-007**: Implement animation and keyframe tokens under `theme.extend.animation` and `theme.extend.keyframes`.
- **FR-008**: Implement custom border width tokens: `terminal`: '1px' and `terminal-accent`: '2px'. [FIX: U1]
- **FR-009**: Implement custom screen breakpoint `terminal-sm` at `480px`.

### Performance Requirements

- **PR-001**: All animation tokens must conform to Constitution Pillar IV performance standards (60fps target).
- **PR-002**: Animations MUST NOT animate layout-triggering properties (width, height, top, left, margin, padding). Only `transform` and `opacity` are permitted targets. [FIX: A2]

### Key Entities

- **Design Token**: A named value (color, size, duration) representing a visual attribute.
- **Color Palette**: A collection of 8 semantic tokens for Dark and Light modes.
- **Typography Stack**: A prioritized list of font families with fallback logic. [FIX: U2]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `tailwind.config.ts` contains exactly 58 tokens across all token groups (Colors: 16, Font: 2, Size: 8, Spacing: 5, Radius: 4, BorderWidth: 2, Shadow: 5, Animation: 8, Keyframes: 7, Screens: 1).
- **SC-002**: Running `tsc --noEmit` from `/frontend` returns **EXACTLY 0 TypeScript errors**. [FIX: C1]
- **SC-003**: All 8 animation keyframes animate only `transform` and/or `opacity`. [FIX: A2]
- **SC-004**: All `fontSize` entries have explicit numeric `lineHeight` values (e.g., '1.5rem'). [FIX: A1]
- **SC-005**: Both `borderWidth` tokens present (FR-008 fulfilled).
