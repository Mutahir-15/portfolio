# Feature Specification: S-5 / Base Layout

**Feature Branch**: `005-base-layout`  
**Created**: 2026-05-11  
**Status**: Draft  
**Input**: User description: "Implement the four base layout components that wrap every page section of the portfolio: PageWrapper, Navbar, Footer, and root layout extension."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Structural Page Wrapping (Priority: P1)

As a user, I want every section of the portfolio to have consistent horizontal alignment and margins, so that the site looks professional and is easy to read across different screen sizes.

**Why this priority**: Foundational layout consistency is critical for professional aesthetics and responsive design.

**Independent Test**: Wrap any content in `PageWrapper` and verify it stays centered with a max-width of 1152px and appropriate responsive horizontal padding.

**Acceptance Scenarios**:

1. **Given** a screen wider than 1152px, **When** content is wrapped in `PageWrapper`, **Then** the content is centered with equal margins on both sides.
2. **Given** a mobile screen, **When** content is wrapped in `PageWrapper`, **Then** it has a minimum horizontal padding of 1rem (px-4).

---

### User Story 2 - Global Site Navigation (Priority: P2)

As a user, I want a persistent navigation bar at the top of the page so that I can quickly jump to different sections (About, Skills, Projects, etc.) and toggle the site theme.

**Why this priority**: Essential for site-wide navigation and user-controlled accessibility (theme toggling).

**Independent Test**: Scroll down the page and verify the navbar hides; scroll up and verify it reappears. Click nav links and verify they target the correct section anchors.

**Acceptance Scenarios**:

1. **Given** the user is at the top of the page, **When** they scroll down more than 20px, **Then** the navbar smoothly translates out of view.
2. **Given** the user has scrolled down, **When** they scroll up, **Then** the navbar smoothly translates back into view.
3. **Given** a mobile device, **When** the user clicks the hamburger icon, **Then** a vertical list of navigation links is displayed.

---

### User Story 3 - Persistent Site Information (Priority: P3)

As a user, I want to see copyright information and a link to the project source/GitHub at the bottom of every page, so I know who built the site and where to find the code.

**Why this priority**: Standard professional practice and provides a clear "end of page" signal.

**Independent Test**: Scroll to the bottom of the page and verify the footer contains the copyright text and a working GitHub link that opens in a new tab.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the bottom of the page, **When** they see the footer, **Then** it contains "© 2025 Mutahir Bin Athar" and a "[github]" link.
2. **Given** the user clicks the "[github]" link, **When** the link is clicked, **Then** github.com/Mutahir-15 opens in a new browser tab.

---

### Edge Cases

- **EC-001: Navigation Jitter**: How does the system handle small scroll movements? Resolution: Throttled updates and a 5px delta threshold in scroll direction detection.
- **EC-002: Content Overlap**: How is content prevented from being hidden behind the fixed navbar? Resolution: The root `<main>` element must have top padding (`pt-16`) matching the navbar height.
- **EC-003: Theme Toggle Reliability**: Ensure no hydration mismatches or SSR conflicts with the theme toggle. Resolution: Navbar and ThemeToggle are Client Components; FAWT script handles early theme application.
- **EC-004: PageWrapper className collision**: The optional className prop uses nullish coalescing (?? '') to safely append — never passes 'undefined' as a class string.
- **EC-005: Footer year hardcoded**: resolved — dynamic via `new Date().getFullYear()` in Server Component `footer.tsx`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implement `PageWrapper` component with `max-w-6xl`, `mx-auto`, and responsive `px-4`/`px-6`/`px-8` padding.
- **FR-002**: Implement `Navbar` as a fixed top-0 component with `h-16`, backdrop-blur, and scroll-aware visibility (hide on scroll down, show on scroll up).
- **FR-003**: Navbar MUST include a terminal-style logo `> MBA_` with a blinking cursor effect on the left.
- **FR-004**: Navbar MUST include five navigation links (`[about]`, `[skills]`, `[projects]`, `[timeline]`, `[contact]`) that are centered on desktop and stack in a mobile menu on small screens.
- **FR-005**: Navbar MUST integrate the existing `ThemeToggle` component from S-3.
- **FR-006**: Implement `Footer` component with a top border, copyright text, and GitHub link, wrapped in `PageWrapper`.
- **FR-007**: Extend the root `layout.tsx` to include `Navbar`, `<main>`, and `Footer` within the `ThemeProvider`, ensuring S-3 and S-4 modifications are preserved.
- **FR-008**: Update the `layout/index.ts` barrel export to include all layout components.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: PageWrapper renders children inside a centered container with a maximum width of 1152px.
- **SC-002**: Navbar visibility transitions (translateY) complete within 300ms.
- **SC-003**: Mobile menu opens/closes with a 200ms opacity + translateY animation.
- **SC-004**: Cumulative Layout Shift (CLS) related to layout components is 0.
- **SC-005**: All interactive elements are keyboard navigable and use S-2 token focus ring colors.
- **SC-006**: `tsc --noEmit` returns exactly 0 TypeScript errors.
- **SC-007**: No hydration mismatch warnings in the browser console.
- **SC-008**: GitHub link opens correctly in a new tab with `noopener noreferrer`.
