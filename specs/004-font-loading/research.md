# Research: S-4 / Font Loading

## Phase 0: Outline & Research

### Decision 1: Next.js Google Fonts Integration
- **Decision**: Use `next/font/google` with CSS variables.
- **Rationale**: This is the recommended pattern for Next.js 15 to ensure zero layout shift and easy integration with Tailwind CSS. It allows fonts to be loaded on the server and injected as CSS variables that Tailwind can then reference.
- **Alternatives considered**: 
    - `@import` in CSS: Rejected due to render-blocking nature.
    - Local font files: Reserved as fallback for EC-001 but not primary due to lack of automatic Google Fonts optimization/subsetting.

### Decision 2: Font Configuration
- **Decision**: 
    - JetBrains Mono: Weights 400, 500, 700.
    - Geist Sans: Weights 400, 500.
- **Rationale**: Matches the design requirements for headings/UI vs body text while keeping the bundle size within the budget.
- **Alternatives considered**: Loading all weights. Rejected to optimize performance.

### Decision 3: Fallback Strategy (EC-002)
- **Decision**: Utilize Tailwind's array-based `fontFamily` definition.
- **Rationale**: By defining `mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace']`, we ensure that if the CSS variable fails to resolve, the browser naturally falls back through the stack defined in S-2.

## Success Metrics Verification Plan
- **CLS Verification**: Use Chrome DevTools Performance tab to record a load and check for layout shift events.
- **Preload Verification**: Inspect page source for `<link rel="preload" as="font">` tags.
- **CSS Variable Verification**: Check `window.getComputedStyle(document.documentElement).getPropertyValue('--font-mono')` in console.
