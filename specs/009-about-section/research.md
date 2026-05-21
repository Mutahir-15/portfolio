# Research: About Section (S-9)

## Technical Unknowns & Findings

### 1. Terminal Window Design Tokens
**Question**: Are `rounded-terminal-lg` and `shadow-terminal-green` defined?
**Finding**: `tailwind.config.ts` currently has `borderRadius.lg` (8px) and generic `boxShadow` values like `glow`.
**Decision**: I will use `rounded-lg` and create/use a shadow that matches the "terminal green" glow (e.g., `shadow-terminal-green`). If explicit aliases are required, I will add them to `tailwind.config.ts` in Phase 0.
**Rationale**: Consistency with existing tokens while fulfilling the "terminal aesthetic" requirement.

### 2. Arabic Font Fallback (EC-001)
**Question**: Which font should be used for Arabic fallback?
**Finding**: `layout.tsx` currently uses `Inter` for sans. `Inter` does not support Arabic.
**Decision**: I will use a system-level Arabic fallback by wrapping Arabic text in a `span` with `font-sans` (which falls back to system-ui/sans-serif). I will verify if a specific Arabic font (like `Vazirmatn` or `Noto Sans Arabic`) was intended, but for now, system fallback is the safest "non-global" approach.
**Rationale**: Meets EC-001 requirement of being local to the greeting line.

### 3. TerminalWindow Component Type
**Question**: Server or Client component?
**Finding**: Spec says Server, but User Planning Constraints (PR-001) say Client due to Framer Motion `whileInView`.
**Decision**: Implement as `'use client'`.
**Rationale**: User input overrides spec for implementation details.

### 4. useTypewriter Availability
**Finding**: Verified `frontend/hooks/use-typewriter.ts` exists and follows the expected interface.
**Action**: Import and use directly.

### 5. PageWrapper Availability
**Finding**: Verified `frontend/components/layout/page-wrapper.tsx` exists.
**Action**: Use as the outer container for `AboutSection`.

## Best Practices
- **Framer Motion**: Use `whileInView` with `viewport={{ once: true }}` for scroll animations.
- **Accessibility**: Use `aria-live="polite"` for the typewriter greeting to ensure screen readers announce the changing text.
- **Responsive**: Use `grid-cols-1 lg:grid-cols-2` for the About section layout as per constraints.
