# Feature Specification: S-4 / Font Loading

**Feature Branch**: `004-font-loading`  
**Created**: 2026-05-10  
**Status**: Draft  
**Input**: User description: "Implement production-grade font loading for the portfolio using Next.js next/font/google."

## OBJECTIVE

Implement production-grade font loading for the portfolio using Next.js `next/font/google`. This spec connects the `fontFamily` tokens defined in S-2 to actual loaded fonts and applies them to the application via CSS variables.

Two fonts are loaded:
1. **JetBrains Mono** — headings, navbar, terminal UI, badges
2. **Geist Sans** — body text, descriptions, paragraphs

Fonts must be:
- Loaded via `next/font` only — no `@import`, no CDN links
- Exposed as CSS variables (`--font-mono`, `--font-sans`)
- Applied to `<html>` via `className` in `layout.tsx`
- Preloaded automatically by Next.js (zero extra config)
- Verified against S-2 fallback chain (U2 fix)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Optimized Font Loading (Priority: P1)

As a user, I want the portfolio text to load instantly and clearly without "invisible text" or sudden layout shifts, so I can start reading immediately with the intended typography.

**Why this priority**: Core user experience and performance. Proper font loading is critical for both aesthetic professional-grade presentation and passing Core Web Vitals (Lighthouse).

**Independent Test**: Verify text is visible immediately using fallback fonts and then "swaps" to high-quality fonts without shifting the layout (CLS = 0).

**Acceptance Scenarios**:

1. **Given** a user visits the site, **When** the page starts loading, **Then** JetBrains Mono and Geist Sans are preloaded and applied to the <html> tag via CSS variables.
2. **Given** the fonts are being fetched, **When** the connection is slow, **Then** the fallback font chain (Fira Code/Inter) is used via `display: 'swap'` until the primary fonts arrive.

---

### Edge Cases

- **EC-001: next/font network failure**: If Google Fonts CDN is unreachable at build time, `next/font` will throw a build error. Resolution: fonts must also be available as local fallbacks in `public/fonts/` for offline/CI builds.
- **EC-002: CSS variable undefined at runtime**: If `--font-mono` or `--font-sans` is undefined, Tailwind fallback chain from S-2 must take over.
- **EC-003: Font weight mismatch**: If a component requests a weight not loaded (e.g. 600), the browser must synthesize it.
- **EC-004: Hydration mismatch**: `next/font` must inject styles during SSR to prevent client-side hydration errors.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Load JetBrains Mono via `next/font/google` (Weights: 400, 500, 700; subsets: latin; variable: --font-mono).
- **FR-002**: Load Geist Sans via `next/font/google` (Weights: 400, 500; subsets: latin; variable: --font-sans).
- **FR-003**: Apply CSS variable classes to the `<html>` element in `frontend/app/layout.tsx`.
- **FR-004**: Connect CSS variables to Tailwind tokens in `tailwind.config.ts` (e.g., `mono: ['var(--font-mono)', ...fallback]`).
- **FR-005**: Mandatory `display: 'swap'` for both fonts to prevent Flash of Invisible Text (FOIT).
- **FR-006**: Ensure S-3 implementation (ThemeProvider, FAWT script) in `layout.tsx` is preserved and not overwritten.

### Integration with S-2 Token System

The following change to `tailwind.config.ts` is REQUIRED:
- REPLACE font name strings (e.g. 'JetBrains Mono') with CSS variable references (e.g. 'var(--font-mono)') so Tailwind resolves the loaded font correctly.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: JetBrains Mono and Geist Sans load with correct weights verified in browser Network tab.
- **SC-002**: `--font-mono` and `--font-sans` CSS variables resolve correctly in the Computed styles tab of DevTools.
- **SC-003**: The `<html>` tag contains both font variable classes in its `className`.
- **SC-004**: Lighthouse report shows zero render-blocking font resources.
- **SC-005**: Cumulative Layout Shift (CLS) contribution from font loading is 0.
- **SC-006**: `tsc --noEmit` returns exactly 0 TypeScript errors.
- **SC-007**: Font fallback chain renders correctly if primary fonts are blocked.
