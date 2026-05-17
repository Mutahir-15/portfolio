# Research: Hero Section (S-8)

## Unknowns & Investigations

### 1. Matrix Rain Animation in React
**Investigation**: Best practices for implementing a Canvas-based matrix rain animation within a Next.js 15 Client Component.
**Findings**:
- Use `useRef<HTMLCanvasElement>(null)` for the canvas element.
- Use `useEffect` to initialize the canvas and start the `requestAnimationFrame` loop.
- The `startMatrixRain` function should be defined outside the component or memoized to prevent re-creation.
- Return a cleanup function from `useEffect` that calls `cancelAnimationFrame`.
- Use `window.devicePixelRatio` to ensure sharpness on high-DPI screens.
- Dark mode/Light mode colors should be passed as arguments or reactive to theme changes.

### 2. `useTypewriter` State Machine
**Investigation**: Robust state machine for typing/pausing/deleting.
**Findings**:
- States: `TYPING`, `PAUSING`, `DELETING`.
- Transitions:
  - `TYPING` -> `PAUSING`: when `displayText === fullString`.
  - `PAUSING` -> `DELETING`: after `pauseDuration`.
  - `DELETING` -> `TYPING`: when `displayText === ""`, advance `currentIndex`.
- Use `useRef` to store the `setTimeout` ID to ensure cleanup and avoid stale closures.
- Respect `prefers-reduced-motion` by immediately returning the first string in the array as static text.

### 3. Reduced Motion Hook
**Investigation**: Standard implementation of `useReducedMotion`.
**Findings**:
- Use `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- Should be reactive to changes in system settings.
- Initial state should be `false` (or based on a safe default) to avoid SSR hydration mismatches.

## Decisions & Rationale

| Decision | Rationale | Alternatives |
|----------|-----------|--------------|
| `requestAnimationFrame` | Smoother animations and better performance than `setInterval`. | `setInterval` (jittery) |
| `useTypewriter` State Machine | Prevents race conditions and provides predictable transitions. | Random `useEffect` triggers |
| Canvas for Matrix Rain | Efficient for rendering hundreds of characters without DOM overhead. | SVG or DOM elements (slow) |
| Standalone cleanup function | Ensures no memory leaks when the component unmounts. | Inline cleanup |

## Best Practices
- **Canvas**: Always check for `ctx` before drawing (`EC-001`).
- **Hooks**: Ensure `useTypewriter` handles empty arrays (`EC-002`) and single-string arrays (`EC-003`).
- **A11y**: Use `aria-live="polite"` for the typewriter text so screen readers announce changes.
- **Performance**: Target opacity and transform for Framer Motion animations.
