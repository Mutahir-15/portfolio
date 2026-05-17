# Quickstart: Hero Section (S-8)

## Development Flow

### 1. Implement `useTypewriter` Hook
- File: `frontend/hooks/use-typewriter.ts`
- Run `npm run lint` to check for issues.
- Verification: Can be manually tested by importing into a temporary page.

### 2. Implement Matrix Rain Functionality
- Create `startMatrixRain` in `hero-section.tsx` (or a separate utility if shared).
- Verify dark/light mode transition by toggling the theme.

### 3. Build `HeroSection` Component
- Assemble the layout, canvas, and Framer Motion elements.
- Ensure `PageWrapper` is used for consistent padding.

### 4. Integration & Accessibility
- Check for `aria-live` on the typewriter text.
- Verify smooth scrolling to `#projects`.
- Check for `prefers-reduced-motion` compliance.

## Verification Checklist

```bash
# Type check
cd frontend
npx tsc --noEmit

# Lint check
npm run lint
```

## Manual Test Cases
- [ ] Typewriter cycles all 5 strings.
- [ ] Matrix rain is subtle in dark mode and even more subtle in light mode.
- [ ] Scroll indicator bounces and disappears after 100px scroll.
- [ ] "View Projects" scrolls to the correct section.
- [ ] "Reduce Motion" stops all animations.
