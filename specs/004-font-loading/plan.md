# Implementation Plan: S-4 / Font Loading

**Branch**: `004-font-loading` | **Date**: 2026-05-10 | **Spec**: [specs/004-font-loading/spec.md](spec.md)
**Input**: Feature specification from `/specs/004-font-loading/spec.md`

## Summary

Implement production-grade font loading for the portfolio using Next.js `next/font/google`. This involves loading **JetBrains Mono** and **Geist Sans**, exposing them as CSS variables, and updating Tailwind's configuration to use these variables. The implementation prioritizes performance (zero CLS, preloading) and UX (FOIT prevention).

## Technical Context

**Language/Version**: TypeScript / Next.js 15  
**Primary Dependencies**: `next/font`, `tailwindcss` (v4)  
**Storage**: N/A  
**Testing**: `npx tsc --noEmit`, Lighthouse, DevTools verification  
**Target Platform**: Web (Modern Browsers)
**Project Type**: Next.js App Router  
**Performance Goals**: CLS = 0, zero render-blocking font resources, < 250kb total font weight  
**Constraints**: Must not overwrite existing S-3 Theme System in `layout.tsx`  
**Scale/Scope**: Repository-wide (applied to `<html>` root)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle III (Tailwind Consistency)**: JetBrains Mono and Geist Sans are the mandated fonts. Status: **PASS**
- **Principle IV (Animation & Performance)**: `next/font` preloading and `display: 'swap'` are mandated for zero CLS. Status: **PASS**
- **Architecture Overview**: `next/font` is the standard for font loading. Status: **PASS**

## Project Structure

### Documentation (this feature)

```text
specs/004-font-loading/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── app/
│   └── layout.tsx       # Modified: add font loading and variables
└── tailwind.config.ts   # Modified: update fontFamily to use CSS variables
```

**Structure Decision**: Standard Next.js/Tailwind structure. Modifying root layout and global tailwind config.

## Complexity Tracking

*No constitution violations.*

## Execution Strategy

### Phase A — Add JetBrains Mono to layout.tsx
- **Files**: `frontend/app/layout.tsx`
- **Key Risk**: Incorrect font variable name causing Tailwind lookup failure.
- **Verification**: `console.log(jetbrainsMono.variable)` or inspect `<html>` in DevTools.

### Phase B — Add Geist Sans to layout.tsx
- **Files**: `frontend/app/layout.tsx`
- **Key Risk**: Subsets mismatch if 'latin' is not enough for future content.
- **Verification**: Inspect `<html>` in DevTools to see both variables.

### Phase C — Apply font variables to <html> className
- **Files**: `frontend/app/layout.tsx`
- **Key Risk**: Breaking the `ThemeProvider` or FAWT script due to incorrect template literal nesting.
- **Verification**: Verify theme switching still works and fonts are applied to the entire document.

### Phase D — Update tailwind.config.ts fontFamily tokens
- **Files**: `frontend/tailwind.config.ts`
- **Key Risk**: Replacing the font name string with the wrong variable name (e.g., mismatching `var(--font-mono)` vs `var(--font-jetbrains-mono)`).
- **Verification**: Apply a utility like `font-mono` to a test element and verify the font-family in computed styles.

### Phase E — Document EC-001 in README.md
- **Files**: `README.md`
- **Key Risk**: Missing the "offline/CI" context which might lead to build failures in restricted environments.
- **Verification**: Read the file.

### Phase F — Full verification
- **Files**: All modified files.
- **Key Risk**: TypeScript errors or Lighthouse regressions.
- **Verification**: `tsc --noEmit`, Lighthouse report, DevTools inspection of variables and network requests.
