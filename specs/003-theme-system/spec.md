# Feature Specification: S-3 / Theme System

**Feature Branch**: `003-theme-system`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User description: "Project: Mutahir Bin Athar — Personal Portfolio Spec: S-3 / Theme System Phase: 1 — Foundation Depends on: S-1 complete (folder scaffold exists) S-2 complete (all 58 design tokens available) Stack: Next.js 15, TypeScript, Tailwind CSS 4 Convention: kebab-case filenames, PascalCase components, camelCase hooks — per Constitution Pillar I --- ## OBJECTIVE Implement a complete dark/light theme system..."

## Clarifications

### Session 2026-05-05
- Q: How should the system respond if the user changes their OS color preference while the site is open? → A: Update theme immediately when OS preference changes (Option A).
- Q: For the ThemeToggle UI, should the button show text labels or icons? → A: Use icons only (Moon/Sun) with labels as tooltips (Option C).
- Q: What should happen if the theme preference in localStorage is corrupted or invalid? → A: Silently fall back to system preference or "Dark" mode (Option A).
- Q: How should the initial theme state be synchronized between server and client to avoid hydration errors? → A: Initialize theme state inside `useEffect` (Safe for SSR) (Option A).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Persisted Theme Preference (Priority: P1)

As a user, I want the portfolio to remember my theme choice (Dark or Light) so that I don't have to re-select it every time I visit or refresh the page.

**Why this priority**: Core value of the feature. Without persistence, the theme system is just a temporary session state.

**Independent Test**: Can be tested by changing the theme, refreshing the page, and verifying the selected theme is maintained.

**Acceptance Scenarios**:

1. **Given** the user is on the site, **When** they toggle the theme to "Light", **Then** the UI updates to Light mode and 'light' is stored in localStorage.
2. **Given** 'light' is stored in localStorage, **When** the user refreshes the page, **Then** the page loads directly in Light mode without a flash of the Dark theme.

---

### User Story 2 - System Preference Detection (Priority: P2)

As a first-time visitor, I want the site to automatically match my operating system's theme preference (Dark or Light) so that the experience is personalized immediately.

**Why this priority**: Enhances the initial user experience by aligning with their environment.

**Independent Test**: Can be tested by clearing localStorage, setting OS theme to Light, and verifying the site loads in Light mode on first visit.

**Acceptance Scenarios**:

1. **Given** no theme preference is stored in localStorage, **When** the user visits for the first time and their system prefers 'dark', **Then** the site defaults to the Dark theme.
2. **Given** no theme preference is stored in localStorage, **When** the user visits for the first time and their system prefers 'light', **Then** the site defaults to the Light theme.

---

### User Story 3 - Instant Theme Toggling (Priority: P3)

As a user, I want to easily toggle between Dark and Light modes using a visible button so that I can choose the most comfortable viewing experience at any time.

**Why this priority**: Provides manual control over the theme.

**Independent Test**: Can be tested by clicking the [DARK_MODE] / [LIGHT_MODE] button and observing the UI transformation.

**Acceptance Scenarios**:

1. **Given** the site is in Dark mode, **When** the user clicks the theme toggle button, **Then** the site instantly transforms to Light mode with a smooth, opacity-only animation.
2. **Given** the site is in Light mode, **When** the user clicks the theme toggle button, **Then** the site instantly transforms back to Dark mode.

---

### Edge Cases

- **SSR / Hydration mismatch**: Ensure that the server-side default (Dark) doesn't conflict with a client-side preference (Light) in a way that causes React errors or visible flickering. Default to 'dark' on server and initialize in `useEffect` on client.
- **Invalid localStorage value**: If 'mba-portfolio-theme' is set to an unknown value, the system must silently fall back to system preference or the default Dark theme without notifying the user.
- **matchMedia unavailable**: If the browser doesn't support theme detection, the system must safely default to the Dark theme.
- **Rapid toggling**: If a user clicks the toggle button multiple times quickly, the final state must be consistent across state, localStorage, and the HTML class.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a `ThemeProvider` component that wraps the application and manages theme state.
- **FR-002**: System MUST apply the `.dark` class to the `<html>` element when the Dark theme is active.
- **FR-003**: System MUST store the theme preference in `localStorage` using the key `mba-portfolio-theme`.
- **FR-004**: System MUST inject a minimal, blocking inline `<script>` in the `<head>` to prevent Flash of Wrong Theme (FAWT) by applying the correct class before the page renders.
- **FR-005**: System MUST provide a custom hook `useTheme` that exposes the current theme, a boolean `isDark`, and a `toggleTheme` function. It MUST listen for and respond to system `prefers-color-scheme` changes in real-time unless a manual override exists in `localStorage`.
- **FR-006**: System MUST provide a `ThemeToggle` UI component that renders an icon-only terminal-style button (Moon/Sun) with descriptive tooltips.
- **FR-007**: `ThemeToggle` MUST utilize smooth opacity-only transitions with a duration of 200ms.
- **FR-008**: `ThemeToggle` MUST be keyboard accessible and include appropriate accessibility labels.

### Key Entities

- **Theme State**: Represents the current visual mode of the application.
  - Attributes: `type` ('dark' | 'light'), `isDark` (boolean).
- **Persistence Store**: Represents the browser's local storage where the preference is saved.
  - Attributes: `key` ('mba-portfolio-theme'), `value` ('dark' | 'light').

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero visible Flash of Wrong Theme (FAWT) during page loads/reloads (verified by visual inspection and recording).
- **SC-002**: Theme preference persists across browser restarts and page refreshes.
- **SC-003**: Initial theme matches `prefers-color-scheme` on first visit in 100% of cases.
- **SC-004**: `ThemeToggle` renders correct icon for each mode with an accessible tooltip.
- **SC-005**: FAWT prevention script is less than 200 bytes when minified.
- **SC-006**: `tsc --noEmit` returns zero errors for the implementation.
- **SC-007**: Accessibility check: `ThemeToggle` is fully operable via keyboard and complies with standard contrast requirements.
- **SC-008**: Console check: Zero hydration mismatch warnings related to theme state.
