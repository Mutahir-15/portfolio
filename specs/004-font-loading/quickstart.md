# Quickstart: S-4 / Font Loading

## Overview
This feature implements optimized font loading using `next/font/google`. It connects the Typography system defined in S-2 to the Layout established in S-3.

## Usage in Components
Once implemented, you can use the fonts via Tailwind utility classes:

```tsx
// For headings, UI, code
<h1 className="font-mono text-2xl">Terminal Title</h1>

// For body text, descriptions
<p className="font-sans">This is Geist Sans body text.</p>
```

## Verification Commands
```bash
# Type check
cd frontend && npx tsc --noEmit

# Production build check (verifies font preloading/optimization)
cd frontend && npm run build
```

## Troubleshooting
If fonts are not loading:
1. Check `layout.tsx` to ensure `jetbrainsMono.variable` and `geistSans.variable` are in the `<html>` className.
2. Verify `tailwind.config.ts` uses `var(--font-mono)` and NOT the font name string.
3. Check Network tab in DevTools for font request status.
