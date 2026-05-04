# Research: S-2 / Tailwind Design Tokens

## Overview

The goal is to implement a complete design token system for a "Modern Terminal" aesthetic. This aesthetic is defined by sharp corners, monospace typography, and a "glowing" green/cyan color palette on a deep black background. Performance is critical, so all animations must avoid layout-triggering properties.

## Token Definitions

### Colors (16 total: 8 Dark, 8 Light)

Based on Constitution Pillar III and terminal standards.

| Semantic Name | Dark Hex | Light Hex | Notes |
|---------------|----------|-----------|-------|
| background    | #0a0f0a  | #f0f4f0   | Main background |
| surface       | #0f1a0f  | #e4ece4   | Cards, modals, sections |
| primary       | #00ff88  | #006633   | Terminal Green (Accent) |
| secondary     | #00d4ff  | #0077aa   | Cyber Cyan (Accent) |
| text-primary  | #c8ffc8  | #0a1a0a   | High contrast text |
| text-secondary| #7aab7a  | #2d5a2d   | Muted descriptions |
| border        | #1a2f1a  | #b0ccb0   | Structural lines |
| error         | #ff5555  | #cc0000   | Critical alerts |

### Typography (2 stacks)

| Stack | Families |
|-------|----------|
| mono  | JetBrains Mono, Fira Code, Consolas, monospace |
| sans  | Geist Sans, Inter, sans-serif |

### Font Sizes (8 entries)

All sizes have explicit numeric line heights (Constitution FIX: A1).

| Key | Size | Line Height |
|-----|------|-------------|
| xs  | 0.75rem | 1rem |
| sm  | 0.875rem| 1.25rem |
| base| 1rem    | 1.5rem |
| lg  | 1.125rem| 1.75rem |
| xl  | 1.25rem | 1.75rem |
| 2xl | 1.5rem  | 2rem |
| 3xl | 1.875rem| 2.25rem |
| 4xl | 2.25rem | 2.5rem |

### Spacing (5 entries)

Terminal-tight spacing scale.

| Key | Value | px |
|-----|-------|----|
| 0   | 0     | 0  |
| 1   | 0.25rem| 4  |
| 2   | 0.5rem | 8  |
| 4   | 1rem   | 16 |
| 8   | 2rem   | 32 |

### Border Radius (4 entries)

Sharp terminal corners.

| Key | Value |
|-----|-------|
| none| 0 |
| sm  | 2px |
| md  | 4px |
| lg  | 8px |

### Border Width (2 entries)

Custom terminal variants.

| Key | Value |
|-----|-------|
| terminal | 1px |
| terminal-accent | 2px |

### Box Shadows (5 entries)

Terminal glow effects using primary green.

| Key | Value |
|-----|-------|
| sm  | 0 1px 2px 0 rgba(0, 255, 136, 0.05) |
| md  | 0 4px 6px -1px rgba(0, 255, 136, 0.1) |
| lg  | 0 10px 15px -3px rgba(0, 255, 136, 0.1) |
| xl  | 0 20px 25px -5px rgba(0, 255, 136, 0.1) |
| glow| 0 0 15px rgba(0, 255, 136, 0.5) |

### Keyframes (7 entries)

Performance-first: Only `transform` and `opacity` (Constitution Pillar IV).

1. `scanline`: Translate Y from -100% to 100%.
2. `blink`: Opacity 1 to 0.
3. `pulse-glow`: Scale 1 to 1.02 + opacity 1 to 0.8.
4. `float`: Translate Y 0 to -5px.
5. `crt-flicker`: Rapid opacity jitter.
6. `glitch`: Rapid small translate X/Y jitter.
7. `matrix-column`: Translate Y from -100% to 100% (long duration).

### Animations (8 entries)

| Name | Keyframe | Duration/Timing |
|------|----------|-----------------|
| scanline | scanline | 8s linear infinite |
| cursor-blink | blink | 1s step-end infinite |
| pulse | pulse-glow | 2s ease-in-out infinite |
| float | float | 3s ease-in-out infinite |
| flicker | crt-flicker | 0.15s infinite |
| glitch | glitch | 0.5s infinite |
| matrix | matrix-column | 20s linear infinite |
| slow-pan | scanline | 20s linear infinite |

### Screens (1 entry)

- `terminal-sm`: 480px

## Decisions

- **Decision**: Use `theme.extend` instead of overriding `theme` entirely.
- **Rationale**: Allows usage of standard Tailwind utilities (e.g., `flex`, `grid`, `block`) while having custom tokens for the terminal theme.
- **Alternatives Considered**: Overriding `theme` entirely was rejected because it would require manual definition of hundreds of standard Tailwind utility values.

- **Decision**: Explicit line-heights in `fontSize`.
- **Rationale**: Fulfills Constitution requirement for deterministic typography.
- **Alternatives Considered**: Relative line-heights (e.g., `1.5`) were rejected to ensure pixel-perfect terminal alignment.

- **Decision**: Restrict animations to `transform` and `opacity`.
- **Rationale**: Fulfills Constitution Pillar IV performance requirements.
- **Alternatives Considered**: Using `width` for typewriter was rejected; the typewriter effect will be handled via a custom hook (JS-driven text content) instead of CSS width animation.
