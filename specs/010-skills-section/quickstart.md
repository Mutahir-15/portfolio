# Quickstart: Skills Section (S-10)

## Development Setup

1. **Badge Component**:
   ```bash
   touch frontend/components/ui/badge.tsx
   ```
   Implement the `Badge` atom with variants.

2. **Skills Section**:
   ```bash
   touch frontend/components/sections/skills-section.tsx
   ```
   Implement the section layout and animations.

3. **Integrate**:
   Import `SkillsSection` into the main page (likely `frontend/app/page.tsx`).

## Verification Commands

```bash
# Type check
cd frontend
npm run tsc -- --noEmit

# Lint
npm run lint
```

## Troubleshooting

- **Icon missing**: If λ, ⬡, or ⚡ don't appear, ensure `JetBrains Mono` is correctly loaded as the `--font-mono` variable.
- **Animations jerky**: Ensure `will-change: transform` is used if needed, though Framer Motion handles most performance optimizations.
