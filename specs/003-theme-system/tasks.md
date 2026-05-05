# Tasks: S-3 / Theme System

**Input**: Design documents from `specs/003-theme-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to ensure an incremental and testable implementation of the theme infrastructure.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial barrel exports and folder preparation.

- [ ] T001 [P] Ensure components/layout barrel export exists
      File: frontend/components/layout/index.ts
      Change: |
        export * from './theme-toggle';
      Done: File exists and exports future ThemeToggle component.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define the shared types that all components and hooks depend on.

- [ ] T002 Add Theme types and interfaces in frontend/types/index.ts
      File: frontend/types/index.ts
      Change: |
        export type Theme = 'dark' | 'light';

        export interface ThemeHookReturn {
          theme: Theme | undefined;
          isDark: boolean;
          toggleTheme: () => void;
        }
      Done: `Theme` and `ThemeHookReturn` are exported; `tsc --noEmit` passes for this file.

---

## Phase 3: User Story 1 - Persisted Theme Preference (Priority: P1) 🎯 MVP

**Goal**: Implement theme state management with localStorage persistence and SSR safety.

**Independent Test**: Verify theme can be toggled and remains persisted after page refresh.

### Implementation for User Story 1

- [ ] T003 [US1] Implement core useTheme hook in frontend/hooks/use-theme.ts
      File: frontend/hooks/use-theme.ts
      Change: |
        'use client';
        import { useState, useEffect, useCallback } from 'react';
        import { Theme, ThemeHookReturn } from '@/types';

        const STORAGE_KEY = 'mba-portfolio-theme';

        export const useTheme = (): ThemeHookReturn => {
          const [theme, setTheme] = useState<Theme | undefined>(undefined);

          useEffect(() => {
            const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
            if (stored === 'dark' || stored === 'light') {
              setTheme(stored);
            } else {
              const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              setTheme(system);
            }
          }, []);

          const toggleTheme = useCallback(() => {
            const next = theme === 'dark' ? 'light' : 'dark';
            setTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
            document.documentElement.classList.toggle('dark', next === 'dark');
          }, [theme]);

          return {
            theme,
            isDark: theme === 'dark',
            toggleTheme
          };
        };
      Done: Hook handles localStorage and updates the HTML class.

- [ ] T004 [US1] Implement ThemeProvider in frontend/app/layout.tsx
      File: frontend/app/layout.tsx
      Change: |
        // This task involves wrapping children in a Provider or just integrating logic in RootLayout
        // For simplicity in this project, we apply the logic directly in layout.tsx or a small wrapper
      Done: Root layout correctly applies the theme state to the app.

---

## Phase 4: User Story 2 - System Preference Detection (Priority: P2)

**Goal**: Align theme with OS settings and prevent FAWT (Flash of Wrong Theme).

**Independent Test**: Verify site matches OS theme on first visit and loads instantly without flicker.

### Implementation for User Story 2

- [ ] T005 [US2] Implement real-time OS preference syncing in frontend/hooks/use-theme.ts
      File: frontend/hooks/use-theme.ts
      Change: |
        // Update useEffect to add listener
        useEffect(() => {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
              setTheme(e.matches ? 'dark' : 'light');
              document.documentElement.classList.toggle('dark', e.matches);
            }
          };
          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        }, []);
      Done: OS theme changes update the UI immediately if no manual override exists.

- [ ] T006 [US2] Inject FAWT prevention inline script in frontend/app/layout.tsx
      File: frontend/app/layout.tsx
      Change: |
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `!(function(){try{var t=localStorage.getItem("mba-portfolio-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;"dark"===t||!t&&e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(t){}})();`
            }}
          />
        </head>
      Done: Script is injected in `<head>` and size is < 200 bytes.

---

## Phase 5: User Story 3 - Instant Theme Toggling (Priority: P3)

**Goal**: Provide a terminal-style UI component for theme switching.

**Independent Test**: Click toggle icon and verify smooth opacity transition and focus ring visibility.

### Implementation for User Story 3

- [ ] T007 [US3] Implement ThemeToggle component in frontend/components/layout/theme-toggle.tsx
      File: frontend/components/layout/theme-toggle.tsx
      Change: |
        'use client';
        import { useTheme } from '@/hooks/use-theme';
        import { motion, AnimatePresence } from 'framer-motion';
        import { Sun, Moon } from 'lucide-react';

        export const ThemeToggle = () => {
          const { theme, toggleTheme } = useTheme();
          if (!theme) return null;

          return (
            <button
              onClick={toggleTheme}
              className="p-2 border border-terminal focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Currently in ${theme} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          );
        };
      Done: Component renders icons, handles toggle, and uses Framer Motion.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and robustness checks.

- [ ] T008 [P] Update layout barrel export in frontend/components/layout/index.ts
      File: frontend/components/layout/index.ts
      Done: ThemeToggle is accessible via barrel export.

- [ ] T009 Handle matchMedia unavailability (EC-003) in use-theme.ts
      File: frontend/hooks/use-theme.ts
      Done: Safely defaults to 'dark' if `window.matchMedia` is missing.

- [ ] T010 Final Verification of Theme System
      Run: cd frontend; npx tsc --noEmit
      Done: 0 TS errors and all SC criteria from spec.md confirmed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2**: Prerequisites for all UI work.
- **Phase 3 (US1)**: Must be complete for persistence.
- **Phase 4 (US2)**: Depends on hook logic from Phase 3.
- **Phase 5 (US3)**: Consumes the hook from Phase 3.
- **Phase N**: Final verification.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- Once the hook (T003) is stable, the Toggle UI (T007) and FAWT script (T006) can be worked on in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement `useTheme` (T003).
3. Integrate into layout (T004).
4. Verify persistence manually.

### Incremental Delivery

1. Add FAWT script for performance.
2. Add real-time OS syncing.
3. Deliver `ThemeToggle` UI.
