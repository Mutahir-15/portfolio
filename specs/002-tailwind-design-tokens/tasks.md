# Tasks: S-2 / Tailwind Design Tokens

**Input**: Design documents from `specs/002-tailwind-design-tokens/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Organization**: Tasks are grouped by user story to ensure a "Modern Terminal" design system is built incrementally and verified at each step.

## Phase 1: Setup

**Purpose**: Project initialization and basic config structure.

- [ ] T001 TASK-1: Replace shell with full config skeleton in frontend/tailwind.config.ts
      TASK-1: Replace shell with full config skeleton
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {},
              fontFamily: {},
              fontSize: {},
              spacing: {},
              borderRadius: {},
              borderWidth: {},
              boxShadow: {},
              keyframes: {},
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: File contains all required empty theme.extend keys and correct content paths.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the color palette which is referenced by other tokens (e.g., shadows).

- [ ] T002 TASK-2: Implement dual-palette colors (16 tokens) in frontend/tailwind.config.ts
      TASK-2: Implement dual-palette colors
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {},
              fontSize: {},
              spacing: {},
              borderRadius: {},
              borderWidth: {},
              boxShadow: {},
              keyframes: {},
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: colors.dark and colors.light contain all 16 specified hex values.

---

## Phase 3: User Story 1 - Single Source of Truth (Priority: P1)

**Goal**: Establish all visual constants for design consistency.
**Independent Test**: Verify that text, spacing, and borders can be styled using these tokens.

- [ ] T003 [US1] TASK-3: Implement Typography and Font Sizes (10 tokens) in frontend/tailwind.config.ts
      TASK-3: Implement Typography and Font Sizes
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {},
              borderRadius: {},
              borderWidth: {},
              boxShadow: {},
              keyframes: {},
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: fontFamily and fontSize contain all 10 tokens with explicit line-heights.

- [ ] T004 [US1] TASK-4: Implement Spacing, Radius, and Border (11 tokens) in frontend/tailwind.config.ts
      TASK-4: Implement Spacing, Radius, and Border
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                8: '2rem',
              },
              borderRadius: {
                none: '0',
                sm: '2px',
                md: '4px',
                lg: '8px',
              },
              borderWidth: {
                terminal: '1px',
                'terminal-accent': '2px',
              },
              boxShadow: {},
              keyframes: {},
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: spacing, borderRadius, and borderWidth contain all 11 tokens.

- [ ] T005 [US1] TASK-5: Implement Box Shadows (5 tokens) in frontend/tailwind.config.ts
      TASK-5: Implement Box Shadows
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                8: '2rem',
              },
              borderRadius: {
                none: '0',
                sm: '2px',
                md: '4px',
                lg: '8px',
              },
              borderWidth: {
                terminal: '1px',
                'terminal-accent': '2px',
              },
              boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 255, 136, 0.05)',
                md: '0 4px 6px -1px rgba(0, 255, 136, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 255, 136, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 255, 136, 0.1)',
                glow: '0 0 15px rgba(0, 255, 136, 0.5)',
              },
              keyframes: {},
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: boxShadow contains all 5 tokens including terminal glow.

---

## Phase 4: User Story 2 - Performance-Compliant Animations (Priority: P1)

**Goal**: Implement smooth animations restricted to transform and opacity.
**Independent Test**: Verify keyframes only target `transform` and `opacity` in the config.

- [ ] T006 [US2] TASK-6: Implement Animation Keyframes (7 tokens) in frontend/tailwind.config.ts
      TASK-6: Implement Animation Keyframes
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                8: '2rem',
              },
              borderRadius: {
                none: '0',
                sm: '2px',
                md: '4px',
                lg: '8px',
              },
              borderWidth: {
                terminal: '1px',
                'terminal-accent': '2px',
              },
              boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 255, 136, 0.05)',
                md: '0 4px 6px -1px rgba(0, 255, 136, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 255, 136, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 255, 136, 0.1)',
                glow: '0 0 15px rgba(0, 255, 136, 0.5)',
              },
              keyframes: {
                scanline: {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
                blink: {
                  '0%, 100%': { opacity: '1' },
                  '50%': { opacity: '0' },
                },
                'pulse-glow': {
                  '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                  '50%': { transform: 'scale(1.02)', opacity: '0.8' },
                },
                float: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                },
                'crt-flicker': {
                  '0%': { opacity: '0.9' },
                  '5%': { opacity: '0.8' },
                  '10%': { opacity: '0.95' },
                  '15%': { opacity: '0.9' },
                  '20%': { opacity: '0.8' },
                  '25%': { opacity: '0.9' },
                  '30%': { opacity: '0.95' },
                  '100%': { opacity: '0.9' },
                },
                glitch: {
                  '0%': { transform: 'translate(0)' },
                  '20%': { transform: 'translate(-2px, 2px)' },
                  '40%': { transform: 'translate(-2px, -2px)' },
                  '60%': { transform: 'translate(2px, 2px)' },
                  '80%': { transform: 'translate(2px, -2px)' },
                  '100%': { transform: 'translate(0)' },
                },
                'matrix-column': {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
              },
              animation: {},
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: keyframes contain all 7 tokens targeting only transform and opacity.

- [ ] T007 [US2] TASK-7: Implement Animations (8 tokens) in frontend/tailwind.config.ts
      TASK-7: Implement Animations
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                8: '2rem',
              },
              borderRadius: {
                none: '0',
                sm: '2px',
                md: '4px',
                lg: '8px',
              },
              borderWidth: {
                terminal: '1px',
                'terminal-accent': '2px',
              },
              boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 255, 136, 0.05)',
                md: '0 4px 6px -1px rgba(0, 255, 136, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 255, 136, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 255, 136, 0.1)',
                glow: '0 0 15px rgba(0, 255, 136, 0.5)',
              },
              keyframes: {
                scanline: {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
                blink: {
                  '0%, 100%': { opacity: '1' },
                  '50%': { opacity: '0' },
                },
                'pulse-glow': {
                  '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                  '50%': { transform: 'scale(1.02)', opacity: '0.8' },
                },
                float: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                },
                'crt-flicker': {
                  '0%': { opacity: '0.9' },
                  '5%': { opacity: '0.8' },
                  '10%': { opacity: '0.95' },
                  '15%': { opacity: '0.9' },
                  '20%': { opacity: '0.8' },
                  '25%': { opacity: '0.9' },
                  '30%': { opacity: '0.95' },
                  '100%': { opacity: '0.9' },
                },
                glitch: {
                  '0%': { transform: 'translate(0)' },
                  '20%': { transform: 'translate(-2px, 2px)' },
                  '40%': { transform: 'translate(-2px, -2px)' },
                  '60%': { transform: 'translate(2px, 2px)' },
                  '80%': { transform: 'translate(2px, -2px)' },
                  '100%': { transform: 'translate(0)' },
                },
                'matrix-column': {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
              },
              animation: {
                scanline: 'scanline 8s linear infinite',
                'cursor-blink': 'blink 1s step-end infinite',
                pulse: 'pulse-glow 2s ease-in-out infinite',
                float: 'float 3s ease-in-out infinite',
                flicker: 'crt-flicker 0.15s infinite',
                glitch: 'glitch 0.5s infinite',
                matrix: 'matrix-column 20s linear infinite',
                'slow-pan': 'scanline 20s linear infinite',
              },
              screens: {},
            },
          },
          plugins: [],
        };

        export default config;
      Done: animation contains all 8 specified animations mapped to keyframes.

---

## Phase 5: User Story 3 - Resilient Font Fallbacks (Priority: P2)

**Goal**: Ensure terminal aesthetic is maintained even if primary fonts fail.
**Independent Test**: Verify fallback stacks in `fontFamily`.

- [ ] T008 [US3] Verify Font Fallback Chains in frontend/tailwind.config.ts
      TASK-8: Verify Font Fallback Chains
      Done: fontFamily.mono starts with JetBrains Mono and falls back to monospace; fontFamily.sans starts with Geist Sans and falls back to sans-serif.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final tokens and system-wide verification.

- [ ] T009 TASK-9: Implement Terminal Screen Breakpoint (1 token) in frontend/tailwind.config.ts
      TASK-9: Implement Terminal Screen Breakpoint
      File: frontend/tailwind.config.ts
      Shell: |
        import type { Config } from 'tailwindcss';

        const config: Config = {
          content: [
            './app/**/*.{ts,tsx}',
            './components/**/*.{ts,tsx}',
          ],
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: {
                  background: '#0a0f0a',
                  surface: '#0f1a0f',
                  primary: '#00ff88',
                  secondary: '#00d4ff',
                  'text-primary': '#c8ffc8',
                  'text-secondary': '#7aab7a',
                  border: '#1a2f1a',
                  error: '#ff5555',
                },
                light: {
                  background: '#f0f4f0',
                  surface: '#e4ece4',
                  primary: '#006633',
                  secondary: '#0077aa',
                  'text-primary': '#0a1a0a',
                  'text-secondary': '#2d5a2d',
                  border: '#b0ccb0',
                  error: '#cc0000',
                },
              },
              fontFamily: {
                mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'Consolas', 'monospace'],
                sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
              },
              fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
              },
              spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                8: '2rem',
              },
              borderRadius: {
                none: '0',
                sm: '2px',
                md: '4px',
                lg: '8px',
              },
              borderWidth: {
                terminal: '1px',
                'terminal-accent': '2px',
              },
              boxShadow: {
                sm: '0 1px 2px 0 rgba(0, 255, 136, 0.05)',
                md: '0 4px 6px -1px rgba(0, 255, 136, 0.1)',
                lg: '0 10px 15px -3px rgba(0, 255, 136, 0.1)',
                xl: '0 20px 25px -5px rgba(0, 255, 136, 0.1)',
                glow: '0 0 15px rgba(0, 255, 136, 0.5)',
              },
              keyframes: {
                scanline: {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
                blink: {
                  '0%, 100%': { opacity: '1' },
                  '50%': { opacity: '0' },
                },
                'pulse-glow': {
                  '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                  '50%': { transform: 'scale(1.02)', opacity: '0.8' },
                },
                float: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-5px)' },
                },
                'crt-flicker': {
                  '0%': { opacity: '0.9' },
                  '5%': { opacity: '0.8' },
                  '10%': { opacity: '0.95' },
                  '15%': { opacity: '0.9' },
                  '20%': { opacity: '0.8' },
                  '25%': { opacity: '0.9' },
                  '30%': { opacity: '0.95' },
                  '100%': { opacity: '0.9' },
                },
                glitch: {
                  '0%': { transform: 'translate(0)' },
                  '20%': { transform: 'translate(-2px, 2px)' },
                  '40%': { transform: 'translate(-2px, -2px)' },
                  '60%': { transform: 'translate(2px, 2px)' },
                  '80%': { transform: 'translate(2px, -2px)' },
                  '100%': { transform: 'translate(0)' },
                },
                'matrix-column': {
                  '0%': { transform: 'translateY(-100%)' },
                  '100%': { transform: 'translateY(100%)' },
                },
              },
              animation: {
                scanline: 'scanline 8s linear infinite',
                'cursor-blink': 'blink 1s step-end infinite',
                pulse: 'pulse-glow 2s ease-in-out infinite',
                float: 'float 3s ease-in-out infinite',
                flicker: 'crt-flicker 0.15s infinite',
                glitch: 'glitch 0.5s infinite',
                matrix: 'matrix-column 20s linear infinite',
                'slow-pan': 'scanline 20s linear infinite',
              },
              screens: {
                'terminal-sm': '480px',
              },
            },
          },
          plugins: [],
        };

        export default config;
      Done: screens.terminal-sm is defined at 480px.

- [ ] T010 Final Verification of Design Token System
      TASK-10: Final Verification
      Done: Running `tsc --noEmit` returns zero errors and all 58 tokens are present in `tailwind.config.ts`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001.
- **User Story 1 (Phase 3)**: Depends on Phase 2 (Colors used in shadows).
- **User Story 2 (Phase 4)**: Depends on Phase 1.
- **User Story 3 (Phase 5)**: Depends on T003.
- **Polish (Final Phase)**: Depends on all previous phases.

### User Story Dependencies

- **User Story 1 (P1)**: MVP. Core visual foundation.
- **User Story 2 (P1)**: High priority for brand identity (Terminal feel).
- **User Story 3 (P2)**: Accessibility/Resilience.

### Within Each User Story

- Tasks are sequential as they modify the same file `tailwind.config.ts`.

### Parallel Opportunities

- Documentation tasks (if any) could run in parallel.
- Since all implementation tasks target `tailwind.config.ts`, they must run sequentially to avoid merge conflicts.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. Validate US1 tokens are usable in a test component.

### Incremental Delivery

1. Foundation ready (Colors).
2. US1 complete (Static tokens).
3. US2 complete (Motion tokens).
4. System verified.
