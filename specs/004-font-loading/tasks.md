# Tasks: S-4 / Font Loading

**Input**: Design documents from `specs/004-font-loading/`
**Prerequisites**: plan.md, spec.md, research.md

**Organization**: Tasks are grouped by user story to ensure an incremental and testable implementation of the font loading infrastructure.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Environment and dependency check.

- [ ] T001 [P] Verify `next` version supports `next/font/google`
      File: `frontend/package.json`
      Done: `next` version is >= 13.0.0.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core font loading implementation.

- [ ] T002 [P] [US1] Import and configure JetBrains Mono in `frontend/app/layout.tsx`
      File: `frontend/app/layout.tsx`
      Change: |
        import { JetBrains_Mono } from 'next/font/google';

        const jetbrainsMono = JetBrains_Mono({
          subsets: ['latin'],
          weight: ['400', '500', '700'],
          variable: '--font-mono',
          display: 'swap',
        });
      Done: JetBrains Mono configured as a CSS variable `--font-mono`.

- [ ] T003 [P] [US1] Import and configure Geist Sans in `frontend/app/layout.tsx`
      File: `frontend/app/layout.tsx`
      Change: |
        import { Geist } from 'next/font/google';

        const geistSans = Geist({
          subsets: ['latin'],
          weight: ['400', '500'],
          variable: '--font-sans',
          display: 'swap',
        });
      Done: Geist Sans configured as a CSS variable `--font-sans`.

- [ ] T004 [US1] Apply font variables to `<html>` element in `frontend/app/layout.tsx`
      File: `frontend/app/layout.tsx`
      Change: |
        // Extend existing <html> tag
        <html lang="en" className={`${jetbrainsMono.variable} ${geistSans.variable}`}>
      Done: `<html>` tag includes both font variables in `className`. Existing S-3 components (ThemeProvider, FAWT) remain untouched.

---

## Phase 3: User Story 1 - Optimized Font Loading (Priority: P1) 🎯 MVP

**Goal**: Connect loaded fonts to Tailwind CSS for application-wide use.

**Independent Test**: Verify fonts are applied to elements using `font-mono` and `font-sans` utility classes.

### Implementation for User Story 1

- [ ] T005 [US1] Update `fontFamily` tokens in `frontend/tailwind.config.ts`
      File: `frontend/tailwind.config.ts`
      Change: |
        fontFamily: {
          mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace'],
          sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        },
      Done: Tailwind tokens reference CSS variables instead of font name strings.

- [ ] T006 [P] [US1] Document font setup and fallback strategy in `README.md`
      File: `README.md`
      Change: |
        ## Font Setup
        This project uses `next/font/google` for JetBrains Mono and Geist Sans.
        
        **Offline/CI Fallback (EC-001)**:
        If the Google Fonts CDN is unreachable during build, the build will fail. 
        For offline environments, ensure local font files are present in `public/fonts/` 
        and update the configuration to use local loading.
      Done: EC-001 and fallback strategy documented.

- [ ] T006b [US1] Verify and populate `public/fonts/` directory
      File: `frontend/public/fonts/`
      Action: Ensure local .woff2 files for JetBrains Mono (400, 500, 700) and Geist Sans (400, 500) are present for offline safety.
      Done: `ls frontend/public/fonts/` shows 5 .woff2 files.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and performance audit.

- [ ] T007 [US1] Verify `--font-mono` resolves in browser
      Action: Open DevTools > Elements > inspect `<html>` > Computed styles > search for `--font-mono`.
      Done: Value resolves to JetBrains Mono.

- [ ] T008 [US1] Verify `--font-sans` resolves in browser
      Action: Open DevTools > Elements > inspect `<html>` > Computed styles > search for `--font-sans`.
      Done: Value resolves to Geist Sans.

- [ ] T009 [US1] Verify font fallback chain (EC-002)
      Action: In DevTools > Network tab, block request for `*.woff2` and reload.
      Done: Fira Code or Inter (fallbacks) render correctly; no "invisible text" occurs.

- [ ] T010 [US1] Run full TypeScript verification
      Action: `cd frontend && npx tsc --noEmit`
      Done: Exactly 0 errors.

- [ ] T011 [US1] Run Lighthouse performance audit
      Action: Run Lighthouse in Chrome DevTools (Mobile/Desktop).
      Done: CLS is 0, and no render-blocking font resources are reported.

---

## Dependencies & Execution Order

1. **Phase 2**: Configuration in `layout.tsx` (Foundation).
2. **Phase 3**: Connection in `tailwind.config.ts` (Tailwind Integration).
3. **Phase N**: Audit and documentation (Polish).

## Parallel Opportunities

- T002 and T003 can be implemented in the same turn.
- T006 (Documentation) can be done in parallel with implementation.
- T007-T011 (Verification) should be done sequentially after implementation.
