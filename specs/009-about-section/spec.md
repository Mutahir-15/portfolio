# Feature Specification: About Section

**Feature Branch**: `009-about-section`  
**Created**: 2026-05-18  
**Status**: Draft  
**Input**: User description: "Project: Mutahir Bin Athar — Personal Portfolio Spec: S-9 / About Section Phase: 2 — Static Sections (Spec 2 of 6) Depends on: S-1 complete (about-section.tsx shell exists) S-2 complete (design tokens available) S-3 complete (theme system active) S-4 complete (fonts loaded) S-5 complete (Navbar, PageWrapper, layout) S-8 complete (useTypewriter hook available) Stack: Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion Convention: kebab-case filenames, PascalCase components, camelCase hooks — per Constitution Pillar I --- ## OBJECTIVE Implement the About section — a terminal-style window that introduces Mutahir, his current focus, location, and GIAIC program journey. The section uses a TerminalWindow UI component as its visual container, giving it an authentic code-editor aesthetic. This spec also fully implements the TerminalWindow atom component which will be reused across multiple sections in Phase 2 and Phase 4. --- ## FILES TO IMPLEMENT frontend/ ├── components/ │ ├── ui/ │ │ └── terminal-window.tsx ← implement fully here │ └── sections/ │ └── about-section.tsx ← implement fully here --- ## COMPONENT SPEC 1 — TerminalWindow File: frontend/components/ui/terminal-window.tsx Type: Server Component (no interactivity needed) Purpose: Reusable terminal chrome wrapper. Renders a window frame with a title bar (traffic light dots + title) and a content area. Used by AboutSection, AI Chatbot, and any other section needing terminal aesthetics. Props interface: interface TerminalWindowProps { title: string children: React.ReactNode className?: string showDots?: boolean // default: true animate?: boolean // default: true — controls // whether entry animation runs } Visual design: Outer container: Dark: bg-dark-surface border border-dark-border Light: bg-light-surface border border-light-border Border radius: rounded-terminal-lg (8px from S-2) Shadow: Dark: shadow-terminal-green (from S-2 tokens) Light: none (clean on light bg) overflow: hidden (clips content to rounded corners) Title bar: Height: h-10 (40px) Border-b: Dark: border-dark-border Light: border-light-border Background: Dark: bg-dark-bg Light: bg-light-bg Layout: flex items-center px-4 gap-3 Traffic light dots (left side of title bar): Rendered only when showDots is true (default) Three circles, 10px diameter each, gap-2: Dot 1: bg-[#ff5f57] (red — close) Dot 2: bg-[#ffbd2e] (yellow — minimise) Dot 3: bg-[#28ca41] (green — fullscreen) These are decorative — aria-hidden=\"true\" on the dots container Title text (center of title bar): Text: props.title Style: font-mono terminal-sm Color: Dark: text-dark-muted Light: text-light-muted Flex-1 with text-center to center regardless of dot presence Content area: Padding: p-6 Font: font-mono (all content inside is mono) Entry animation (when animate is true): Framer Motion — fadeUp variant: initial: { opacity: 0, y: 20 } animate: { opacity: 1, y: 0 } duration: 0.6s Wrapped in whileInView with once: true viewport: { once: true, margin: '-50px' } Skipped entirely when useReducedMotion() is true --- ## COMPONENT SPEC 2 — AboutSection File: frontend/components/sections/about-section.tsx Type: Client Component ('use client') — uses useTypewriter for the animated greeting line Section id: 'about' (anchor for Navbar link) --- ## FR-001: Section Layout Section wrapper: id=\"about\" py-terminal-xl (96px vertical padding from S-2) Wrapped in PageWrapper for consistent max-width Content layout (two columns on desktop): Desktop (lg+): grid grid-cols-2 gap-12 items-start Mobile: flex flex-col gap-8 Left column: TerminalWindow with bio content Right column: Quick stats / info cards --- ## FR-002: Terminal Window Content (Left Column) TerminalWindow props: title=\"about.exe\" showDots={true} animate={true} Inside TerminalWindow, render these lines in sequence as if a terminal session is running: Line 1 — command prompt: Text: $ cat mutahir.txt Style: font-mono terminal-sm Color: Dark: text-dark-green Light: text-light-green Prefix: $ in muted color, command in green Line 2 — animated greeting: Uses useTypewriter hook with: strings: [ 'Hello, World! 👋', 'Marhaba! مرحبا 👋', 'Assalam o Alaikum! 🌙', ] typeSpeed: 60 deleteSpeed: 30 pauseDuration: 3000 loop: true Style: font-mono terminal-base Color: Dark: text-dark-text Light: text-light-text Empty line above and below for spacing Line 3 — bio block: Rendered as a series of <p> tags with line breaks Content: \"I'm Mutahir Bin Athar, a Spec-Driven Developer from Karachi, Pakistan.\" \"Currently in Quarter 4 of the Governor Sindh Initiative for Agentic AI (GIAIC), where I build agentic AI workflows with Python, the OpenAI Agents SDK, and FastAPI.\" \"I'm passionate about Spec-Driven Development — using tools like SpecKit Plus to build software the right way: specified, planned, and verified before a single line of code is written.\" Style: font-sans terminal-base leading-relaxed Color: Dark: text-dark-muted Light: text-light-muted Each paragraph separated by mt-3 Line 4 — current focus line: Text: > Currently focused on: AIDD Style: font-mono terminal-sm Color: Dark: text-dark-green Light: text-light-green Blinking cursor after 'AIDD': animate-blink, aria-hidden=\"true\" mt-4 top margin Line 5 — location line: Text: > Location: Karachi, Pakistan 🇵🇰 Style: font-mono terminal-sm Color: Dark: text-dark-muted Light: text-light-muted --- ## FR-003: Info Cards (Right Column) Four stat cards stacked vertically (gap-4): Each card styled as a mini terminal panel: Dark: bg-dark-surface border border-dark-border Light: bg-light-surface border border-light-border Rounded: rounded-terminal-sm Padding: p-4 Card 1 — Program: Label: [program] Value: GIAIC — Agentic AI Sub: Governor Sindh Initiative Label color: dark-green / light-green (font-mono) Value color: dark-text / light-text (font-mono) Sub color: dark-muted / light-muted (font-sans) Card 2 — Quarter: Label: [quarter] Value: Quarter 4 — Active Sub: AI-Driven Development (AIDD) Colors: same pattern as Card 1 Card 3 — Location: Label: [location] Value: Karachi, Pakistan 🇵🇰 Sub: Pakistan Standard Time (UTC+5) Colors: same pattern as Card 1 Card 4 — Focus: Label: [focus] Value: Spec-Driven Development Sub: SpecKit Plus + Agentic Workflows Colors: same pattern as Card 1 Cards animate in with Framer Motion: staggerChildren: 0.1s Each card: fadeUp variant whileInView, once: true Skipped when useReducedMotion() is true --- ## FR-004: Section Heading Above the two-column grid, render a section header: Pattern used for ALL Phase 2 sections (reuse this): Line 1 (pre-label): Text: // section Style: font-mono terminal-sm Color: Dark: text-dark-muted Light: text-light-muted Line 2 (main heading): Text: about_me Tag: <h2> Style: font-mono terminal-3xl font-bold Color: Dark: text-dark-green Light: text-light-green Line 3 (underline accent): A <div> — width: 60px, height: 2px Color: Dark: bg-dark-green Light: bg-light-green mt-2 mb-8 NOTE: This heading pattern is identical across S-9 through S-13. Do not vary it between sections. --- ## FR-005: Scroll Animation The entire section content animates in on scroll: Framer Motion whileInView: Section heading: fadeUp, delay 0s Left column (TerminalWindow): fadeUp, delay 0.2s Right column (cards): stagger fadeUp, delay 0.1s viewport: { once: true, margin: '-80px' } All animations skipped when useReducedMotion() true --- ## PERFORMANCE REQUIREMENTS PR-001: TerminalWindow is a Server Component when animate={false} — no 'use client' needed. When animate={true} it uses Framer Motion whileInView — requires 'use client'. Resolution: make TerminalWindow always a Client Component since it always animates in production use. Mark 'use client'. PR-002: Traffic light dots use hardcoded hex colors (#ff5f57, #ffbd2e, #28ca41) — these are intentional fixed colors matching macOS dots. They do NOT use theme tokens and should NOT invert in dark/light mode. This is the one permitted exception to the no-hardcode rule per Constitution Pillar II rationale: \"cosmetic brand element with fixed identity\". PR-003: useTypewriter in AboutSection uses faster speeds (typeSpeed: 60, deleteSpeed: 30) than HeroSection — feels more like a live terminal. pauseDuration: 3000 gives enough read time. --- ## ACCESSIBILITY REQUIREMENTS AC-001: Section has id=\"about\" for anchor navigation AC-002: <h2> heading present for screen reader document outline AC-003: TerminalWindow title bar title is decorative — no need for aria-label (visual only) AC-004: Traffic light dots container: aria-hidden=\"true\" AC-005: Animated greeting has aria-live=\"polite\" AC-006: Blinking cursor after AIDD: aria-hidden=\"true\" AC-007: Info cards have no interactive elements — no role or aria needed beyond semantic HTML AC-008: All color combinations verified at 4.5:1 contrast ratio (S-2 token pairs all pass) --- ## EDGE CASES EC-001: useTypewriter multilingual strings The greeting strings include Arabic and Urdu script. The font stack (JetBrains Mono → fallbacks) may not render Arabic script correctly. Resolution: wrap Arabic/Urdu strings in a <span> with font-sans class — only those characters switch to Geist Sans which has better Unicode support. The Latin characters remain in font-mono. EC-002: Two useTypewriter instances on screen HeroSection and AboutSection both use useTypewriter simultaneously when the user scrolls down slowly. Both are independent hook instances — no shared state. No conflict expected but verify in browser that both animate independently. EC-003: TerminalWindow overflow Long content inside TerminalWindow could overflow the rounded corners. overflow-hidden on the outer container clips content correctly — verify with long bio text on small screens. EC-004: Grid column collapse on tablet The lg: breakpoint (1024px) triggers two columns. On tablets (768–1023px) the layout stacks vertically. Verify the stacked layout looks correct at 768px viewport width. --- ## SUCCESS CRITERIA SC-001: Section renders with id=\"about\" anchor SC-002: TerminalWindow renders with title bar, traffic light dots, and title \"about.exe\" SC-003: $ cat mutahir.txt command line renders in dark-green / light-green SC-004: Greeting cycles through 3 multilingual strings with correct type/delete/pause SC-005: Bio text renders in 3 paragraphs, font-sans, muted color SC-006: Current focus line shows '> Currently focused on: AIDD' with blinking cursor SC-007: Four info cards render with correct label/value/sub structure SC-008: Section heading pattern: '// section' above 'about_me' in terminal-3xl SC-009: Two-column layout on desktop (lg+), stacked on mobile SC-010: All scroll animations trigger on viewport entry with once: true SC-011: prefers-reduced-motion: all animations disabled, static content shown SC-012: Arabic/Urdu characters render correctly via font-sans fallback (EC-001) SC-013: tsc --noEmit returns EXACTLY 0 errors SC-014: No hydration warnings in browser console SC-015: TerminalWindow reusable — verify it accepts any children without styling breaking --- ## STOP AFTER COMPLETION After printing the S-9 summary block, STOP COMPLETELY. Do NOT generate S-10 automatically. Do NOT run /sp.plan, /sp.specify, or any other command. Await explicit user instruction before any further action."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identity & Professional Journey (Priority: P1)

A visitor wants to understand who Mutahir is and what he is currently focused on. They scroll to the "About" section and see a terminal-themed window presenting a bio, his current location, and his involvement in the GIAIC Agentic AI program.

**Why this priority**: This is the core purpose of the section—providing the narrative of the developer's background and expertise.

**Independent Test**: Can be fully tested by navigating to the "About" section and verifying that the bio text, location, and program details are accurate and clearly presented within the TerminalWindow container.

**Acceptance Scenarios**:

1. **Given** the visitor is at the About section, **When** the terminal window is visible, **Then** it must display Mutahir's bio text in a readable font and a clear location line.
2. **Given** the visitor is at the About section, **When** reviewing the content, **Then** it must explicitly mention the Governor Sindh Initiative for Agentic AI (GIAIC) and Quarter 4 status.

---

### User Story 2 - Multilingual Greeting & Global Presence (Priority: P2)

A visitor from a different cultural background arrives and is greeted in multiple languages (English, Arabic, Urdu). This communicates inclusivity and a global professional outlook.

**Why this priority**: Enhances the personal brand and adds a unique, dynamic element to the introduction.

**Independent Test**: Observe the greeting line in the terminal window for at least 15 seconds to ensure it cycles through all defined multilingual strings.

**Acceptance Scenarios**:

1. **Given** the About section is loaded, **When** observing the greeting line, **Then** it must cycle through "Hello, World! 👋", "Marhaba! مرحبا 👋", and "Assalam o Alaikum! 🌙".
2. **Given** the site is viewed on a standard browser, **When** Arabic/Urdu scripts are displayed, **Then** they must render correctly without broken character blocks.

---

### User Story 3 - Rapid Skill & Status Scanning (Priority: P2)

A recruiter or potential collaborator wants to quickly scan Mutahir's key stats (Program, Quarter, Location, Focus) without reading the full bio. They look at the info cards next to the main bio window.

**Why this priority**: Supports "scanning" behavior common in professional profile reviews.

**Independent Test**: Verify the presence and content of the four info cards on the right (or below on mobile) of the main bio.

**Acceptance Scenarios**:

1. **Given** the About section is visible, **When** viewing the info cards, **Then** four distinct cards must be present covering Program, Quarter, Location, and Focus.
2. **Given** the site is on a desktop, **When** viewing the cards, **Then** they must be arranged in a vertical stack alongside the bio window.

---

### User Story 4 - Immersive Technical Brand (Priority: P3)

A visitor experiences a cohesive "developer" aesthetic with terminal-style window chrome, code-comment headings, and blinking cursors. This reinforces Mutahir's identity as a technical professional.

**Why this priority**: Contributes to the overall professional visual identity and user experience "delight".

**Independent Test**: Inspect the terminal window frame for macOS-style traffic lights and verify the section header follows the specific code-comment pattern.

**Acceptance Scenarios**:

1. **Given** the About section is visible, **When** looking at the terminal window header, **Then** it must contain three decorative "traffic light" dots (Red, Yellow, Green).
2. **Given** the visitor scrolls to the section, **When** the heading appears, **Then** it must show "// section" above "about_me" with a green accent underline.

---

### Edge Cases

- **Multilingual Font Fallback**: Arabic and Urdu characters must fallback to a sans-serif font if the primary monospace font doesn't support them, ensuring readability.
- **Simultaneous Animations**: The `useTypewriter` hook must function correctly even if other instances (e.g., in the Hero section) are active or animating simultaneously.
- **Responsive Stacking**: On tablet/mobile screens, the two-column grid must collapse into a single vertical column while maintaining readability.
- **Terminal Overflow**: Content within the terminal window must be clipped if it exceeds the rounded corner boundaries.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The About section MUST have a unique ID (`about`) for anchor-link navigation from the Navbar.
- **FR-002**: A reusable `TerminalWindow` component MUST be implemented with a title bar containing decorative macOS-style traffic light dots and a custom title.
- **FR-003**: The section MUST use a standard heading pattern consisting of a "// section" comment line, an `<h2>` main title ("about_me"), and a green accent underline.
- **FR-004**: A command prompt simulation MUST be displayed inside the terminal window (e.g., `$ cat mutahir.txt`).
- **FR-005**: An animated typewriter greeting MUST cycle through English, Arabic, and Urdu greeting strings.
- **FR-006**: The bio block MUST include Mutahir's background, current GIAIC Quarter 4 status, and his passion for Spec-Driven Development.
- **FR-007**: A "current focus" line MUST be displayed with a blinking cursor (e.g., `> Currently focused on: AIDD`).
- **FR-008**: Four info cards MUST be displayed in a column (on desktop) providing quick facts: Program, Quarter, Location, and Focus.
- **FR-009**: All section content MUST animate in on scroll using a `fadeUp` transition, with info cards staggered.
- **FR-010**: All animations MUST be disabled if the user's system preference for reduced motion is active.

### Key Entities *(none)*

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The About section is successfully accessible via the `#about` anchor link.
- **SC-002**: Multilingual greeting cycles through all 3 strings (English, Arabic, Urdu) with correct character rendering.
- **SC-003**: The terminal window correctly clips long content using `overflow: hidden`.
- **SC-004**: The layout transitions from a 2-column grid (desktop) to a single column (mobile) at the 1024px (lg) breakpoint.
- **SC-005**: Accessibility audit: The section contains an `<h2>` heading and utilizes `aria-live="polite"` for animated text regions.
- **SC-006**: Performance: All animations maintain 60fps and CLS remains under 0.1 during text transitions.
- **SC-007**: Build Check: `tsc --noEmit` returns 0 errors across the new components.
