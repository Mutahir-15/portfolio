# Feature Specification: Hero Section

**Feature Branch**: `008-hero-section`  
**Created**: 2026-05-17  
**Status**: Draft  
**Input**: User description: "Implement the Hero section — the first thing every visitor sees. It must immediately communicate who Mutahir is, what he does, and provide clear calls to action. Visual identity: full-screen terminal-style landing with a typewriter effect cycling through role titles, a subtle matrix rain ambient background, and two CTA buttons. This spec also implements the useTypewriter custom hook which is consumed by both HeroSection (S-8) and AboutSection (S-9)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Brand Identity & Role Communication (Priority: P1)

A visitor arrives at the portfolio home page and immediately sees Mutahir's name and a dynamic terminal-style line that cycles through his various professional roles (e.g., "Agentic AI Engineer").

**Why this priority**: This is the primary value proposition of the home page—identifying the owner and their expertise.

**Independent Test**: Can be verified by loading the page and observing that the name "Mutahir Bin Athar" is prominent and the role title text changes automatically over time.

**Acceptance Scenarios**:

1. **Given** the home page is loaded, **When** the Hero section is visible, **Then** the text "Mutahir Bin Athar" must be displayed as the main heading.
2. **Given** the page is loaded, **When** observing the role title line, **Then** it must cycle through at least 5 different roles (e.g., Spec-Driven Developer, Agentic AI Engineer, etc.) using a typewriter animation.

---

### User Story 2 - Navigation and Calls to Action (Priority: P2)

After reading the introduction, the visitor wants to see Mutahir's work or download his resume. They use the prominent CTA buttons to either scroll down or trigger a download.

**Why this priority**: Converts interest into action, allowing the visitor to explore further or obtain contact/resume info.

**Independent Test**: Can be tested by clicking the "View Projects" and "Download CV" buttons.

**Acceptance Scenarios**:

1. **Given** the Hero section CTAs are visible, **When** clicking "View Projects", **Then** the page must smoothly scroll to the projects section.
2. **Given** the Hero section CTAs are visible, **When** clicking "Download CV", **Then** the browser should initiate a download of the CV file.

---

### User Story 3 - Visual Immersion & Atmosphere (Priority: P3)

The visitor notices a "Matrix rain" animation in the background (opacity 0.07 in dark, 0.04 in light) and a CRT-style scanline overlay (alpha 0.03), giving the site a "hacker/terminal" aesthetic.

**Why this priority**: Enhances the professional brand of an AI/Spec-driven engineer through a unique and polished visual identity.

**Independent Test**: Can be verified by observing the background of the Hero section and inspecting computed styles in DevTools.

**Acceptance Scenarios**:

1. **Given** the site is in dark mode, **When** viewing the background, **Then** a green character animation (Matrix rain) MUST be visible at exactly 0.07 opacity.
2. **Given** the site is in dark mode, **When** viewing the Hero section, **Then** a horizontal scanline effect MUST be visible with a repeating 2px pattern and 0.03 alpha.

---

### Edge Cases

- **Reduced Motion**: If a user has "Reduce Motion" enabled in their OS, all animations (Matrix rain, typewriter, bouncing scroll indicator) must stop or revert to static states.
- **Canvas Unavailability**: If the browser cannot render the 2D canvas context, the Hero section must still be fully functional and readable without the Matrix rain background.
- **Empty Typewriter Data**: If the list of role strings is empty, the typewriter line should remain empty or show a default without crashing or looping indefinitely.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hero section MUST occupy the full height of the viewport (`min-h-screen`) and center its content both vertically and horizontally.
- **FR-002**: The background MUST feature a decorative "Matrix rain" animation using an HTML5 Canvas.
  - Opacity (exact values):
    - Dark mode: 0.07
    - Light mode: 0.04
  - Deviation rule: Values outside 0.04–0.10 range require explicit approval. Do not tweak for taste.
- **FR-003**: A "typewriter" animation MUST cycle through an array of professional roles, typing characters one by one, pausing at the end of a word, and then deleting them before starting the next.
- **FR-004**: The typewriter animation MUST use an `aria-live="polite"` container to ensure role changes are communicated to screen readers.
- **FR-005**: Two primary Call-to-Action buttons MUST be provided: "View Projects" (internal anchor link) and "Download CV" (file download link).
- **FR-006**: A "whoami" prompt prefix MUST appear above the main heading to reinforce the terminal theme.
- **FR-007**: A CRT scanline overlay MUST be applied in dark mode using CSS gradients.
  - Background: `repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)`
  - Line height: 2px (1px transparent + 1px tinted)
  - Tint alpha: 0.03 — exact value, do not adjust.
  - Deviation rule: alpha outside 0.02–0.05 range requires explicit approval.
- **FR-008**: An animated scroll indicator (e.g., a bouncing arrow) MUST appear at the bottom of the section and disappear once the user scrolls down more than 100px.
- **FR-009**: All animations MUST be disabled if the user's system preference for reduced motion is active.
- **FR-010**: The Hero section MUST be responsive, adjusting font sizes (terminal-4xl to terminal-2xl) and button layouts for mobile devices.

### Key Entities *(none)*

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The Hero section consistently fills 100% of the visible viewport height on both mobile and desktop devices.
- **SC-002**: The typewriter animation correctly cycles through all 5 roles defined in the specification.
- **SC-003**: Lighthouse Accessibility score for the Hero section is 100/100, including proper ARIA labels for decorative elements and buttons.
- **SC-004**: Cumulative Layout Shift (CLS) remains at 0 when the typewriter text cycles or when the canvas initializes.
- **SC-005**: The "Matrix rain" animation maintains a performance target of 60fps on modern devices without causing significant CPU spikes (monitored via devtools).
- **SC-006**: Matrix rain canvas opacity = 0.07 in dark mode and 0.04 in light mode.
  - Verified via browser DevTools: Inspect canvas element → Computed styles → opacity.
  - Expected values: 0.07 (dark), 0.04 (light).
- **SC-015**: Scanline overlay rgba alpha = 0.03.
  - Verified via DevTools computed background or by inspecting the inline style/class.
