# Tasks: S-5 / Base Layout

**Input**: Design documents from `specs/005-base-layout/`
**Prerequisites**: plan.md, spec.md, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify environment and dependencies.

- [ ] T001 Verify Framer Motion installation
      Action: cd frontend && npm list framer-motion
      Done: import { motion } from 'framer-motion' resolves without error. If missing: npm install framer-motion.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core components required by all user stories.

- [ ] T002 [US1] Implement PageWrapper component
      File: `frontend/components/layout/page-wrapper.tsx`
      Change: |
        import React from 'react';

        interface PageWrapperProps {
          children: React.ReactNode;
          className?: string;
        }

        export default function PageWrapper({ children, className }: PageWrapperProps) {
          return (
            <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
              {children}
            </div>
          );
        }
      Done: Renders children in max-w-6xl mx-auto with responsive px-4 sm:px-6 lg:px-8. Optional className appended safely.

---

## Phase 3: User Story 2 - Global Site Navigation (Priority: P2)

**Goal**: Fixed top navigation with hide/show behavior and mobile menu.

**Independent Test**: Navbar visibility toggles on scroll; mobile menu opens/closes.

### Implementation for User Story 2

- [ ] T003 [US2] Implement useScrollDirection hook in navbar.tsx
      File: `frontend/components/layout/navbar.tsx`
      Change: |
        'use client';
        import { useState, useEffect, useRef } from 'react';

        export function useScrollDirection() {
          const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
          const lastScrollY = useRef(0);

          useEffect(() => {
            const updateScrollDirection = () => {
              const scrollY = window.pageYOffset;
              const direction = scrollY > lastScrollY.current ? 'down' : 'up';
              if (direction !== scrollDirection && (scrollY - lastScrollY.current > 5 || lastScrollY.current - scrollY > 5)) {
                setScrollDirection(direction);
              }
              lastScrollY.current = scrollY > 0 ? scrollY : 0;
            };
            window.addEventListener('scroll', updateScrollDirection);
            return () => window.removeEventListener('scroll', updateScrollDirection);
          }, [scrollDirection]);

          return scrollDirection;
        }
      Done: Returns 'up' | 'down', delta > 5px threshold, cleans up listener on unmount.

- [ ] T004 [US2] Implement Navbar shell and logo
      File: `frontend/components/layout/navbar.tsx`
      Change: |
        import { motion, AnimatePresence } from 'framer-motion';
        import { ThemeToggle } from './theme-toggle';
        import { PageWrapper } from './page-wrapper';

        export default function Navbar() {
          const scrollDirection = useScrollDirection();
          const [isMenuOpen, setIsMenuOpen] = useState(false);

          return (
            <motion.nav
              initial={false}
              animate={{ y: scrollDirection === 'down' ? '-100%' : '0%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 z-50 h-16 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-light-border dark:border-dark-border font-mono"
            >
              <PageWrapper className="h-full flex justify-between items-center">
                <a href="#" className="font-bold text-2xl text-light-green dark:text-dark-green flex items-center" aria-label="Mutahir Bin Athar — home">
                  {">"} MBA<span className="animate-blink">_</span>
                </a>
                {/* Desktop and Mobile components go here */}
              </PageWrapper>
            </motion.nav>
          );
        }
      Done: Fixed position, h-16, backdrop-blur, "> MBA_" logo with animate-blink cursor.

- [ ] T005 [US2] Implement Navbar desktop links
      File: `frontend/components/layout/navbar.tsx`
      Change: Add desktop nav links array and render with hover transitions.
      Done: 5 links in [label] format, hidden on mobile, hover color transition 150ms.

- [ ] T006 [US2] Implement Navbar ThemeToggle + scroll animation
      File: `frontend/components/layout/navbar.tsx`
      Change: Integrate ThemeToggle from S-3 into the right side of the Navbar.
      Done: ThemeToggle renders right side, Framer Motion translateY 300ms on scroll.

- [ ] T007 [US2] Implement Navbar mobile hamburger button
      File: `frontend/components/layout/navbar.tsx`
      Change: Add hamburger button with divs for lines, toggling `isMenuOpen`.
      Done: Visible mobile only, aria-label, aria-expanded, toggles isMenuOpen.

- [ ] T008 [US2] Implement Navbar mobile dropdown menu
      File: `frontend/components/layout/navbar.tsx`
      Change: Use `AnimatePresence` and `motion.div` for the dropdown menu.
      Done: 5 links stacked, Framer Motion opacity + translateY 200ms, closes on link click.

- [ ] T009 [US2] Add ARIA attributes to Navbar
      File: `frontend/components/layout/navbar.tsx`
      Change: Ensure all AC-001 through AC-006 accessibility requirements are met.
      Done: nav aria-label, button aria-label, aria-expanded, logo aria-label satisfied.

---

## Phase 4: User Story 3 - Persistent Site Information (Priority: P3)

**Goal**: Minimal footer with copyright and GitHub link.

**Independent Test**: Footer visible at bottom with working external link.

### Implementation for User Story 3

- [ ] T010 [US3] Implement Footer component
      File: `frontend/components/layout/footer.tsx`
      Change: |
        import React from 'react';
        import { PageWrapper } from './page-wrapper';

        export default function Footer() {
          return (
            <footer className="py-6 border-t border-light-border dark:border-dark-border font-mono terminal-sm">
              <PageWrapper className="flex justify-between items-center">
                <span className="text-light-muted dark:text-dark-muted">© 2025 Mutahir Bin Athar</span>
                <a 
                  href="https://github.com/Mutahir-15" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-light-muted dark:text-dark-muted hover:text-light-green dark:hover:text-dark-green transition-colors"
                  aria-label="Mutahir's GitHub profile"
                >
                  [github]
                </a>
              </PageWrapper>
            </footer>
          );
        }
      Done: © 2025 Mutahir Bin Athar on left, [github] link to Mutahir-15 on right, wrapped in PageWrapper.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Integration and final verification.

- [ ] T011 Extend layout.tsx with Navbar + Footer
      File: `frontend/app/layout.tsx`
      Change: Add `<Navbar />` and `<Footer />` around `<main className="pt-16">`.
      Done: S-3 and S-4 content intact; root layout structural shell complete.

- [ ] T012 Update layout barrel export
      File: `frontend/components/layout/index.ts`
      Change: |
        export { default as PageWrapper } from './page-wrapper';
        export { default as Navbar } from './navbar';
        export { default as Footer } from './footer';
        export { default as ThemeToggle } from './theme-toggle';
      Done: All 4 exports present — PageWrapper, Navbar, Footer, ThemeToggle.

- [ ] T013 TypeScript verification
      Action: cd frontend && npx tsc --noEmit
      Done: EXACTLY 0 TypeScript errors.

- [ ] T014 Visual verification checklist
      Action: Manual audit of SC-001 through SC-015 in browser.
      Done: All success criteria confirmed.

---

## Dependencies & Execution Order

1. **Phase 1**: Verify environment.
2. **Phase 2**: PageWrapper (Foundational dependency for Navbar/Footer).
3. **Phase 3**: Navbar implementation.
4. **Phase 4**: Footer implementation.
5. **Phase N**: Global integration and verification.

### Parallel Opportunities

- T003 (useScrollDirection) and T010 (Footer) can be worked on in parallel once PageWrapper is ready.
- T012 (Barrel export) can be done anytime after files exist.
- T013 and T014 must be done last.
