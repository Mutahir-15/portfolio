# Research: S-11 / Timeline Section

## Decisions & Rationale

### 1. Vertical Spine Implementation
- **Decision**: Use `position: relative` on the main container with an `absolute` child for the line.
- **Rationale**: Simplest way to achieve a continuous line across multiple independent node components/elements.
- **Alternatives**: SVG path (more complex to make responsive), border-left on nodes (harder to center on desktop).

### 2. Alternating Layout
- **Decision**: Flex-col with `self-start` / `self-end` and `text-right` / `text-left` alignment based on index.
- **Rationale**: Flexbox allows for easy switching between a single column (mobile) and a centered alternating layout (desktop) using media queries.

### 3. Expand/Collapse State
- **Decision**: Single `expandedIndex: number | null` in the parent component.
- **Rationale**: Enforces the "only one expanded" requirement naturally. Simpler than an object of booleans.

### 4. Custom Animations
- **Decision**: Define `slideInLeft` and `slideInRight` variants locally in `timeline-section.tsx`.
- **Rationale**: These are specific to this section's layout and not generic enough for the global `framer-animation` skill at this time.

## Technology Best Practices

### Framer Motion Height Transitions
- Use `AnimatePresence` for exit animations.
- Use `height: 'auto'` for the visible state to avoid hardcoding heights.
- Set `overflow: 'hidden'` during transition.

### Accessibility (WAI-ARIA Disclosure)
- Apply `aria-expanded` to the trigger.
- Apply `aria-controls` to the content div.
- Ensure the trigger has a clear focus state.

## Unresolved Unknowns
- None. (Authoritative data and technical constraints provided in spec).
