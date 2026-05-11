# Implementation Plan: S-5 / Base Layout

**Branch**: `005-base-layout` | **Date**: 2026-05-11 | **Spec**: [specs/005-base-layout/spec.md](spec.md)

## Summary

Implement the foundational layout components for the portfolio: `PageWrapper`, `Navbar`, and `Footer`. These components provide the structural shell for all content sections, ensuring consistent max-width, navigation, and site-wide theme toggling. The implementation also involves extending the root `layout.tsx` to include these components globally.

## Technical Context

**Language/Version**: TypeScript / Next.js 15
**Primary Dependencies**: `framer-motion`, `tailwindcss` (v4)
**Storage**: `localStorage` (for theme preference, inherited from S-3)
**Testing**: `npx tsc --noEmit`, Visual Verification (mobile/desktop), Scroll behavior audit
**Target Platform**: Web (Modern Browsers)
**Performance Goals**: CLS = 0, GPU-accelerated animations (translateY/opacity), Throttled scroll listeners
**Constraints**: 
- PageWrapper implemented first.
- layout.tsx extended last.
- Do not modify `theme-toggle.tsx`.

## Constitution Check

- **Principle I (Code Quality)**: Strict TypeScript, kebab-case files, PascalCase components. Status: **PASS**
- **Principle II (Architecture)**: Atomic layout structure in `/components/layout`. Status: **PASS**
- **Principle IV (Animation)**: Framer Motion used for animations; no layout-triggering properties. Status: **PASS**
- **Accessibility**: ARIA labels, semantic tags, keyboard navigation. Status: **PASS**

## Project Structure

### Documentation (this feature)

```text
specs/005-base-layout/
├── plan.md              # This file
├── research.md          # Scroll and animation logic
├── quickstart.md        # Integration guide
└── tasks.md             # Task breakdown
```

### Source Code

```text
frontend/
├── app/
│   └── layout.tsx       # Modified: extend with Navbar, Footer, and pt-16
├── components/
│   └── layout/
│       ├── page-wrapper.tsx   # New
│       ├── navbar.tsx         # New (Client Component)
│       ├── footer.tsx         # New (Server Component)
│       ├── theme-toggle.tsx   # Existing (from S-3)
│       └── index.ts           # Modified: export all 4 components
```

## Execution Strategy

### Phase A — Verify Dependencies
- **Action**: Confirm `framer-motion` is installed.
- **Verification**: `npm list framer-motion`.

### Phase B — Implement PageWrapper
- **Files**: `frontend/components/layout/page-wrapper.tsx`
- **Key Detail**: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Gotcha**: Ensure `className` is merged correctly using template literals or `clsx`.
- **Verification**: Check if content is centered on desktop.

### Phase C — Implement Footer
- **Files**: `frontend/components/layout/footer.tsx`
- **Key Detail**: Server Component using `PageWrapper` internally.
- **Gotcha**: Use `target="_blank"` and `rel="noopener noreferrer"` for the GitHub link.
- **Verification**: Verify the link opens the correct URL in a new tab.

### Phase D — Implement Navbar Hook & Desktop Layout
- **Files**: `frontend/components/layout/navbar.tsx`
- **Key Detail**: Define `useScrollDirection` internally; implement fixed `h-16` with backdrop-blur.
- **Gotcha**: Ensure `z-50` is applied to stay on top of all content.
- **Verification**: Verify navbar is visible at top and hides on scroll down.

### Phase E — Implement Navbar Mobile Menu
- **Files**: `frontend/components/layout/navbar.tsx`
- **Key Detail**: State `isMenuOpen` toggles dropdown; Framer Motion for animations.
- **Gotcha**: Close menu when a navigation link is clicked.
- **Verification**: Test hamburger menu on mobile screen width.

### Phase F — Extend layout.tsx
- **Files**: `frontend/app/layout.tsx`
- **Key Detail**: Wrap `{children}` in `<main className="pt-16">` and add `<Navbar />` and `<Footer />`.
- **Gotcha**: Ensure `ThemeProvider` still wraps everything.
- **Verification**: Verify page has 16 units of top padding to avoid content hiding behind Navbar.

### Phase G — Update Barrel Export
- **Files**: `frontend/components/layout/index.ts`
- **Action**: Export `PageWrapper`, `Navbar`, `Footer`, and `ThemeToggle`.
- **Verification**: Verify all layout components can be imported from `@/components/layout`.

### Phase H — Full Verification
- **Action**: Run `tsc --noEmit` and manual audit of SC-001 through SC-015.
- **Verification**: 0 TS errors; smooth animations; responsive behavior.
