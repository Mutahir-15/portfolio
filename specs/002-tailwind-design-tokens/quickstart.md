# Quickstart: Tailwind Design Tokens (S-2)

## Overview
This document provides instructions on how to verify the implementation of the design token system in `tailwind.config.ts`.

## Verification Steps

### 1. Token Count Verification
Open `frontend/tailwind.config.ts` and ensure the following counts are met:
- **Colors**: 16 (8 under `dark`, 8 under `light`)
- **FontFamily**: 2 (`mono`, `sans`)
- **FontSize**: 8 (`xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`)
- **Spacing**: 5 (`0`, `1`, `2`, `4`, `8`)
- **BorderRadius**: 4 (`none`, `sm`, `md`, `lg`)
- **BorderWidth**: 2 (`terminal`, `terminal-accent`)
- **BoxShadow**: 5 (`sm`, `md`, `lg`, `xl`, `glow`)
- **Keyframes**: 7
- **Animations**: 8
- **Screens**: 1 (`terminal-sm`)
**Total**: 58 Tokens

### 2. TypeScript Validation
Run the following command from the `/frontend` directory:
```bash
npm run lint && npx tsc --noEmit
```
**Expected Outcome**: Zero errors.

### 3. Performance Check
Inspect the `keyframes` in `tailwind.config.ts`.
**Rule**: Only `transform` and `opacity` properties are permitted.
**Violations**: Any use of `width`, `height`, `top`, `left`, `margin`, or `padding` in keyframes.

### 4. Theme Check
Verify that the `dark` and `light` color palettes match the Constitution (Pillar III):
- **Dark Background**: `#0a0f0a`
- **Light Background**: `#f0f4f0`
- **Primary Accent**: `#00ff88` (Dark) / `#006633` (Light)

## Usage in Components
Tokens should be used via standard Tailwind classes:
- Colors: `text-dark-primary`, `bg-light-background`, `border-dark-border`
- Font: `font-mono`, `font-sans`
- Shadow: `shadow-glow`, `shadow-dark-lg`
- Animation: `animate-scanline`, `animate-cursor-blink`
