# Feature Specification: S-2 / Tailwind Design Tokens

**Feature Branch**: `002-tailwind-design-tokens`  
**Created**: 2026-04-30  
**Status**: Draft  
**Input**: User description: "Project: Mutahir Bin Athar — Personal Portfolio Spec: S-2 / Tailwind Design Tokens..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Unified Visual Identity (Priority: P1)

As a developer, I want a single source of truth for the project's design system so that I can ensure every component follows the "Terminal" aesthetic without manual color picking or hardcoding values.

**Why this priority**: Design tokens are the foundation of the entire UI. Without them, components will have inconsistent colors, spacing, and typography.

**Independent Test**: Can be verified by inspecting the `tailwind.config.ts` file and confirming all required tokens (colors, fonts, spacing) are defined under the `theme.extend` key.

**Acceptance Scenarios**:

1. **Given** a new UI component is being built, **When** using Tailwind classes, **Then** terminal-specific tokens (e.g., `text-dark-green`, `p-terminal-md`) must be available and correctly typed.
2. **Given** the global configuration is updated, **When** the project is rebuilt, **Then** all components using those tokens must reflect the changes automatically.

---

### User Story 2 - Dark & Light Mode Support (Priority: P1)

As a user, I want the portfolio to support both "Terminal Night" and "Soft Terminal" themes so that I can comfortably view the content in different lighting conditions while maintaining the hacker/terminal vibe.

**Why this priority**: High-quality theme switching is a core requirement for a modern developer portfolio and enhances accessibility.

**Independent Test**: Can be verified by toggling the `.dark` class on the `<html>` element and confirming that background, text, and accent colors switch between the specified dark and light palettes.

**Acceptance Scenarios**:

1. **Given** the application is in dark mode, **When** viewing any page, **Then** the background must be `#0a0f0a` and primary text must be `#c8ffc8`.
2. **Given** the application is in light mode, **When** viewing any page, **Then** the background must be `#f0f4f0` and primary text must be `#0a1a0a`.

---

### User Story 3 - Immersive Terminal Experience (Priority: P2)

As a visitor, I want to see terminal-inspired animations like scanlines, blinking cursors, and glowing pulses so that the portfolio feels like a functional command-line interface.

**Why this priority**: These animations provide the "polish" and "micro-interactions" that distinguish the portfolio as a high-end terminal-themed site.

**Independent Test**: Can be verified by applying animation classes (e.g., `animate-scanline`, `animate-blink`) to elements and observing the keyframe behaviors.

**Acceptance Scenarios**:

1. **Given** a terminal component, **When** the `animate-scanline` class is applied, **Then** a vertical scanning effect must move across the viewport.
2. **Given** an active element in dark mode, **When** it has a glow effect, **Then** the `terminal-green` or `terminal-cyan` box shadows must be visible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define a dual-palette color system (Dark/Light) under `theme.extend.colors`.
- **FR-002**: System MUST implement a "Terminal" typography scale for both `mono` (JetBrains Mono) and `sans` (Geist Sans) families.
- **FR-003**: System MUST provide terminal-specific font sizes (e.g., `terminal-xs` to `terminal-4xl`) with optimized line heights.
- **FR-004**: System MUST define terminal-specific spacing increments (`terminal-xs` to `terminal-xl`) for consistent UI layout.
- **FR-005**: System MUST implement sharp border radii (`2px` to `8px`) to maintain the terminal's boxy aesthetic.
- **FR-006**: System MUST define custom animations and keyframes for `scanline`, `blink`, `fade-up`, `glow-pulse`, and `matrix-fall`.
- **FR-007**: System MUST support a custom `terminal-sm` screen breakpoint at `480px`.

### Key Entities

- **Design Token**: A named value representing a visual attribute (color, font, size).
- **Theme Palette**: A collection of color tokens specifically for Dark or Light modes.
- **Animation Suite**: A set of keyframes and timing functions for terminal-inspired effects.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the visual system is defined in `tailwind.config.ts` with zero hardcoded hex values in future component code.
- **SC-002**: The `frontend/` project passes `tsc --noEmit` with the custom Tailwind configuration active.
- **SC-003**: Dark mode switching changes 100% of the visible primary surface and text colors between the two defined palettes.
- **SC-004**: Custom animations (Scanline, Blink) run at 60fps without noticeable performance degradation on mobile devices.
