# Tasks: S-3 / Theme System

**Input**: Design documents from `specs/003-theme-system/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to ensure an incremental and testable implementation of the theme infrastructure.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial types and folder preparation.

- [ ] T001 Add Theme types and interfaces in frontend/types/index.ts
      File: frontend/types/index.ts
      Change: |
        export type Theme = 'dark' | 'light';

        export interface ThemeHookReturn {
          theme: Theme | undefined;
          isDark: boolean;
          toggleTheme: () => void;
        }
      Done: `Theme` and `ThemeHookReturn` are exported; `tsc --noEmit` passes.

---

## Phase 2: User Story 1 - Persisted Theme Preference (Priority: P1) 🎯 MVP

**Goal**: Implement theme state management with localStorage persistence and SSR safety.

**Independent Test**: Verify theme can be toggled and remains persisted after page refresh.

### Implementation for User Story 1

- [ ] T002 [US1] Implement core useTheme hook in frontend/hooks/use-theme.ts
      File: frontend/hooks/use-theme.ts
      Change: |
        'use client';
        import { useState, useEffect, useCallback } from 'react';
        import { Theme, ThemeHookReturn } from '@/types';

        const STORAGE_KEY = 'mba-portfolio-theme';

        export const useTheme = (): ThemeHookReturn => {
          const [theme, setTheme] = useState<Theme | undefined>(undefined);

          // Initial load
          useEffect(() => {
            const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
            if (stored === 'dark' || stored === 'light') {
              setTheme(stored);
            } else {
              const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              setTheme(system);
            }
          }, []);

          // S1: Centralized Sync
          useEffect(() => {
            if (theme) {
              document.documentElement.classList.toggle('dark', theme === 'dark');
            }
          }, [theme]);

          const toggleTheme = useCallback(() => {
            setTheme(prev => {
              const next = prev === 'dark' ? 'light' : 'dark';
              localStorage.setItem(STORAGE_KEY, next);
              return next;
            });
          }, []);

          return {
            theme,
            isDark: theme === 'dark',
            toggleTheme
          };
        };
      Done: Hook handles localStorage and centralized class synchronization.

- [ ] T003 [US1] Implement ThemeProvider in frontend/components/layout/theme-provider.tsx
      File: frontend/components/layout/theme-provider.tsx
      Change: |
        'use client';
        import React, { createContext, useContext } from 'react';
        import { useTheme } from '@/hooks/use-theme';
        import { ThemeHookReturn } from '@/types';

        const ThemeContext = createContext<ThemeHookReturn | undefined>(undefined);

        export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
          const themeValue = useTheme();
          return (
            <ThemeContext.Provider value={themeValue}>
              {children}
            </ThemeContext.Provider>
          );
        };

        export const useThemeContext = () => {
          const context = useContext(ThemeContext);
          if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
          return context;
        };
      Done: Dedicated provider created to encapsulate theme context.

- [ ] T004 [US1] Integrate ThemeProvider in frontend/app/layout.tsx
      File: frontend/app/layout.tsx
      Change: |
        // Wrap {children} in <ThemeProvider> inside RootLayout
      Done: App is wrapped in the ThemeProvider.

---

## Phase 3: User Story 2 - System Preference Detection (Priority: P2)

**Goal**: Align theme with OS settings and prevent FAWT (Flash of Wrong Theme).

**Independent Test**: Verify site matches OS theme on first visit and loads instantly without flicker.

### Implementation for User Story 2

- [ ] T005 [US2] Implement real-time OS preference syncing in frontend/hooks/use-theme.ts
      File: frontend/hooks/use-theme.ts
      Change: |
        // Update useEffect in useTheme to add listener for prefers-color-scheme
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
      Done: FAWT script injected and working as intended.

---

## Phase 4: User Story 3 - Instant Theme Toggling (Priority: P3)

**Goal**: Provide a terminal-style UI component for theme switching.

**Independent Test**: Click toggle icon and verify smooth opacity transition.

### Implementation for User Story 3

- [ ] T007 [US3] Implement ThemeToggle component in frontend/components/layout/theme-toggle.tsx
      File: frontend/components/layout/theme-toggle.tsx
      Done: UI component implemented with Framer Motion and terminal styling.

- [ ] T008 [P] Create/Update components/layout barrel export
      File: frontend/components/layout/index.ts
      Change: |
        export * from './theme-provider';
        export * from './theme-toggle';
      Done: [T1] Barrel export added AFTER implementation to prevent build breaks.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and robustness checks.

- [ ] T009 Handle matchMedia unavailability (EC-003) in use-theme.ts
      File: frontend/hooks/use-theme.ts
      Done: Safely defaults to 'dark' if `window.matchMedia` is missing.

- [ ] T010 Final Verification and Accessibility Check
      Check:
      - [ ] cd frontend; npx tsc --noEmit (0 errors)
      - [ ] [C1] Verify 4.5:1 contrast ratio in both modes using DevTools
      - [ ] Verify zero FAWT on slow 3G throttled refresh
      Done: All success criteria confirmed.

---

## Dependencies & Execution Order

1. **Phase 1 & 2**: Core hook and provider (Foundation).
2. **Phase 3**: Optimization (FAWT) and OS Sync.
3. **Phase 4**: UI layer (Toggle).
4. **Phase N**: Polish.
