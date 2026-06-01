# Feature Specification: S-11 / Timeline Section

**Feature Branch**: `011-timeline-section`  
**Created**: 2026-05-31  
**Status**: Draft  
**Input**: User description: "Project: Mutahir Bin Athar — Personal Portfolio Spec: S-11 / Timeline Section Phase: 2 — Static Sections (Spec 4 of 6) Depends on: S-1 complete (timeline-section.tsx shell) S-2 complete (design tokens available) S-3 complete (theme system active) S-4 complete (fonts loaded) S-5 complete (Navbar, PageWrapper, layout) S-9 complete (section heading pattern) S-10 complete (Badge atom available) Skills: @skill/section-heading (auto-apply pattern) @skill/framer-animation (auto-apply variants) Stack: Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion Convention: kebab-case filenames, PascalCase components, camelCase hooks — per Constitution Pillar I --- ## OBJECTIVE Implement the Timeline section — an animated vertical timeline showing Mutahir's complete GIAIC learning journey from Quarter 1 through Quarter 4. Each quarter node expands to reveal skills learned, hackathons completed, and key achievements. This is the most content-rich static section — it tells Mutahir's developer story visually. --- ## FILES TO IMPLEMENT frontend/ └── components/ └── sections/ └── timeline-section.tsx ← implement fully --- ## GIAIC JOURNEY DATA (authoritative — do not alter) interface TimelineEvent { quarter: string period: string title: string status: 'completed' | 'active' description: string skills: string[] highlights: string[] variant: 'green' | 'cyan' } const timelineData: TimelineEvent[] = [ { quarter: 'Q1', period: '2023', title: 'TypeScript Foundations', status: 'completed', description: 'Learned TypeScript from scratch as part of the GIAIC program. Built type-safe applications and developed strong fundamentals in modern JavaScript tooling.', skills: ['TypeScript', 'JavaScript', 'Node.js'], highlights: [ 'Completed GIAIC Quarter 1', 'Built first type-safe projects', 'Established strong TS fundamentals', ], variant: 'cyan', }, { quarter: 'Q2', period: '2024', title: 'Next.js & Hackathons', status: 'completed', description: 'Mastered Next.js and the React ecosystem. Participated in multiple hackathons — all projects available on GitHub at Mutahir-15.', skills: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'], highlights: [ 'Completed GIAIC Quarter 2', 'Multiple hackathons completed', 'Projects live on GitHub/Mutahir-15', 'Deployed production Next.js apps', ], variant: 'green', }, { quarter: 'Q3', period: '2024', title: 'Python & OpenAI Agents SDK', status: 'completed', description: 'Learned Python and the OpenAI Agents SDK. Built agentic AI workflows and CLI coding agents using FastAPI as the backend framework.', skills: ['Python', 'OpenAI Agents SDK', 'FastAPI', 'Gemini API'], highlights: [ 'Completed GIAIC Quarter 3', 'Built CLI coding agents', 'Learned agentic AI workflows', 'FastAPI backend development', ], variant: 'cyan', }, { quarter: 'Q4', period: '2025 — Present', title: 'AI-Driven Development (AIDD)', status: 'active', description: 'Currently learning AI-Driven Development using Spec-Driven Development methodology and SpecKit Plus. Building this portfolio as a live AIDD project.', skills: ['AIDD', 'SpecKit Plus', 'Spec-Driven Development', 'Agentic Workflows'], highlights: [ 'Currently active — Quarter 4', 'Building portfolio with SDD', 'Using SpecKit Plus in production', 'Enrolled in GIAIC Agentic AI track', ], variant: 'green', }, ] --- ## FR-001: Section Layout Section wrapper: id=\"timeline\" py-terminal-xl (96px vertical padding) Wrapped in PageWrapper Section heading — @skill/section-heading: Comment: '// section' h2 label: 'journey' Green bar: 60px, 2px Apply fadeUpVariant from @skill/framer-animation --- ## FR-002: Vertical Timeline Structure Center spine: A vertical line running through the center of the timeline on desktop, left-aligned on mobile. Desktop (md+): Absolute vertical line — left: 50% Width: 2px Height: 100% of timeline container Color: Dark: bg-dark-border Light: bg-light-border Mobile (< md): Absolute vertical line — left: 20px Width: 2px Height: 100% Same color as desktop Container: position: relative (spine is absolute child) flex flex-col gap-12 --- ## FR-003: Quarter Node Each timelineData entry renders as one node. Nodes alternate left/right on desktop: Even index (0, 2 — Q1, Q3): content LEFT side Odd index (1, 3 — Q2, Q4): content RIGHT side Mobile: all nodes on RIGHT side of spine Node structure: Connector dot (on the spine): Position: absolute, centered on spine Size: w-4 h-4 (16px circle) Border: 2px solid Color by variant: green: border-dark-green bg-dark-bg (dark) / border-light-green bg-light-bg (light) cyan: border-dark-cyan bg-dark-bg (dark) / border-light-cyan bg-light-bg (light) Active status pulse: If status === 'active': add animate-glow-pulse on a pseudo-ring around the dot Implemented as an extra <span> behind the dot: absolute, inset: -4px, rounded-full, animate-glow-pulse (from S-2 tokens) Skipped when useReducedMotion() true Quarter label (above card): Text: '[Q1]' / '[Q2]' / '[Q3]' / '[Q4]' Style: font-mono terminal-sm font-bold Color by variant: green: text-dark-green / text-light-green cyan: text-dark-cyan / text-light-cyan Period label (next to quarter): Text: event.period Style: font-mono terminal-xs Color: text-dark-muted / text-light-muted Content card: Dark: bg-dark-surface border border-dark-border Light: bg-light-surface border border-light-border Rounded: rounded-terminal-lg Padding: p-6 Hover border color by variant: green: hover:border-dark-green cyan: hover:border-dark-cyan Transition: border-color 150ms ease --- ## FR-004: Card Content Inside each content card: Title: Text: event.title Tag: <h3> Style: font-mono terminal-lg font-bold Color: Dark: text-dark-text Light: text-light-text mb-2 Status badge (right of title): If completed: Text: [completed] Style: font-mono terminal-xs Color: text-dark-green / text-light-green border border-dark-green / border-light-green px-2 py-0.5 rounded-terminal-sm If active: Text: [active ▶] Style: same as completed but: bg-dark-green text-dark-bg (dark) bg-light-green text-light-bg (light) animate-glow-pulse on the badge bg Skipped when useReducedMotion() true Description: Text: event.description Style: font-sans terminal-sm leading-relaxed Color: text-dark-muted / text-light-muted mt-3 mb-4 Skills badges: Use Badge component from S-10 variant matches event.variant size=\"sm\" flex flex-wrap gap-2 mb-4 Highlights list: Each highlight renders as a terminal list item: Prefix: '▸' — font-mono terminal-xs variant color, aria-hidden="true"; Text: highlight string — font-sans terminal-xs muted color. Rationale: prefix is UI chrome (font-mono), content is descriptive text (font-sans) per Constitution Pillar III. --- ## FR-005: Expand / Collapse Interaction Each card is expandable — description and highlights are hidden by default, shown on click. Default state: Card shows: title + status badge + skills badges Hidden: description + highlights list Expanded state (isExpanded === true): Card shows: all content Toggle mechanism: Click anywhere on card → toggles isExpanded Button at bottom of card (always visible): Collapsed: '[+ expand]' Expanded: '[- collapse]' Style: font-mono terminal-xs Color: variant color (green or cyan) cursor-pointer Expand animation: Framer Motion AnimatePresence + motion.div: initial: { height: 0, opacity: 0 } animate: { height: 'auto', opacity: 1 } exit: { height: 0, opacity: 0 } duration: 0.3s Skipped when useReducedMotion() true — show/hide instantly with no animation State management: expandedIndex: number | null (useState) null = all collapsed Only ONE card expanded at a time — clicking a new card collapses the previous --- ## FR-006: Scroll Animations (@skill/framer-animation) Each node animates in on scroll: Even nodes (left side): slideInLeft variant initial: { opacity: 0, x: -30 } visible: { opacity: 1, x: 0 } Odd nodes (right side): slideInRight variant initial: { opacity: 0, x: 30 } visible: { opacity: 1, x: 0 } Mobile (all right side): fadeUpVariant duration: 0.5s easeOut whileInView, once: true, margin: '-80px' staggerChildren equivalent: delay by index * 0.1s All animations skipped when useReducedMotion() true --- ## FR-007: Active Quarter Visual Treatment Q4 (status: 'active') gets additional visual emphasis beyond the animated badge: Card left border accent: Dark: border-l-4 border-l-dark-green Light: border-l-4 border-l-light-green (Completed cards have no left border accent) Card shadow: Dark: shadow-terminal-green Light: none (Completed cards have no shadow) --- ## PERFORMANCE REQUIREMENTS PR-001: timelineData defined at module level — never inside component PR-002: expandedIndex state managed with single useState — not one boolean per card PR-003: AnimatePresence wraps collapsible content — not the entire card PR-004: All scroll animations: opacity + transform only — 60fps compliant PR-005: Glow pulse on active badge uses opacity animation (as per S-2 glowPulse keyframe rewrite in S-2 A2 fix) — not boxShadow --- ## ACCESSIBILITY REQUIREMENTS AC-001: Section has id=\"timeline\" for anchor nav AC-002: <h3> for each quarter title AC-003: Expand/collapse button has aria-expanded: aria-expanded={isExpanded} aria-controls=\"quarter-{index}-content\" AC-004: Collapsible content has id matching controls: id=\"quarter-{index}-content\" AC-005: Active pulse ring: aria-hidden=\"true\" AC-006: All Badge labels readable text (from S-10) AC-007: Connector dots: aria-hidden=\"true\" AC-008: Skills list prefix '▸': aria-hidden=\"true\" on the prefix span only --- ## EDGE CASES EC-001: Q4 active pulse in light mode animate-glow-pulse uses rgba green — verify it is visible against light-bg (#f0f4f0). If insufficient contrast, increase opacity from 0.6 to 0.8 in the glowPulse keyframe for light mode only. EC-002: Expand/collapse on mobile Card click target must be large enough for touch — minimum 44px height on the toggle button. Use py-3 on the toggle button to ensure this. EC-003: All cards expanded simultaneously State design prevents this (single expandedIndex). Verify: clicking Q2 while Q1 is open → Q1 closes. EC-004: Very long highlight strings Highlights are author-controlled data — kept short in timelineData above. If future data has long strings, font-mono terminal-xs will wrap naturally — acceptable. EC-005: Spine alignment on odd viewport widths The 50% spine on desktop and 20px on mobile must not cause horizontal scroll. Verify: overflow-x: hidden on the section wrapper. --- ## SUCCESS CRITERIA SC-001: Section renders with id=\"timeline\" anchor SC-002: Section heading '// section' + 'journey' + green bar rendered correctly SC-003: Vertical spine renders on desktop (center) and mobile (left-aligned at 20px) SC-004: All 4 quarter nodes render with correct quarter label, period, title, status badge SC-005: Q1 and Q3 nodes on LEFT side (desktop), Q2 and Q4 on RIGHT side SC-006: All content on RIGHT on mobile SC-007: Skills badges render with correct variant and size=\"sm\" SC-008: Expand/collapse toggles description + highlights with smooth animation SC-009: Only ONE card expanded at a time SC-010: Q4 card has green left border + shadow SC-011: Q4 active badge animates with glow-pulse SC-012: Connector dot color matches event.variant SC-013: Scroll animations: left nodes slide from left, right nodes from right SC-014: prefers-reduced-motion: all animations off, expand/collapse instant SC-015: tsc --noEmit returns EXACTLY 0 errors SC-016: No hydration warnings in browser console SC-017: overflow-x: hidden prevents horizontal scroll from spine positioning --- ## STOP AFTER COMPLETION After printing the S-11 summary block, STOP COMPLETELY. Do NOT generate S-12 automatically. Do NOT run /sp.plan, /sp.specify, or any other command. Await explicit user instruction before any further action."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Learning Journey (Priority: P1)

As a visitor, I want to see a clear, chronologically ordered timeline of Mutahir's GIAIC journey so I can understand his background and growth.

**Why this priority**: Core objective of the section; provides the primary narrative for the portfolio.

**Independent Test**: Verify that the section displays 4 distinct quarter nodes (Q1-Q4) in a vertical layout with correct titles and periods.

**Acceptance Scenarios**:

1. **Given** I am on the portfolio page, **When** I scroll to the "journey" section, **Then** I should see a vertical timeline with 4 nodes corresponding to Q1 through Q4.
2. **Given** I am on desktop, **When** I view the timeline, **Then** nodes should alternate between left and right sides of a center spine.
3. **Given** I am on mobile, **When** I view the timeline, **Then** all nodes should be on the right side of a left-aligned spine.

---

### User Story 2 - Explore Quarter Details (Priority: P2)

As a visitor, I want to expand individual timeline nodes to see detailed descriptions, specific skills learned, and key achievements for that quarter.

**Why this priority**: Enhances engagement and provides deeper evidence of technical competence.

**Independent Test**: Click on a timeline card and verify that the description and highlights list become visible.

**Acceptance Scenarios**:

1. **Given** a collapsed timeline card, **When** I click the card or the "[+ expand]" button, **Then** the card should expand with a smooth animation to show the description and highlights.
2. **Given** an expanded timeline card, **When** I click it or the "[- collapse]" button, **Then** it should collapse smoothly.
3. **Given** one card is already expanded, **When** I click a different card, **Then** the previous card should collapse and the new one should expand.

---

### User Story 3 - Identify Current Activity (Priority: P3)

As a visitor, I want to easily identify which quarter is currently active so I know what Mutahir is learning right now.

**Why this priority**: Highlighting current growth shows that the developer is active and continuously learning.

**Independent Test**: Verify that Q4 has distinct visual markers (active badge, pulse animation, left border accent).

**Acceptance Scenarios**:

1. **Given** the timeline is rendered, **When** I look at Q4, **Then** I should see an "[active ▶]" badge with a glow pulse animation.
2. **Given** I am viewing the Q4 card, **Then** I should see a green left border accent and a terminal shadow.

---

### Edge Cases

- **Reduced Motion:** If the user has `prefers-reduced-motion` enabled, all scroll animations must be disabled, and cards must expand/collapse instantly without height transitions.
- **Viewport Resilience:** The timeline spine and layout must remain correctly aligned on non-standard screen widths without causing horizontal overflow.
- **Single Expansion:** Clicking multiple cards in rapid succession should only ever result in a maximum of one card being expanded at a time.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: **Section Layout**: The section MUST be accessible via the 'timeline' anchor, include standard vertical spacing, and follow the consistent section heading pattern with the label 'journey'.
- **FR-002**: **Vertical Spine**: A vertical visual spine MUST be rendered, centered on large screens and aligned to the left on mobile devices.
- **FR-003**: **Chronological Nodes**: Timeline nodes MUST be displayed in chronological order, alternating sides on large screens for visual balance.
- **FR-004**: **Detailed Disclosure**: Each timeline node MUST support a toggle to reveal or hide detailed descriptions and specific achievements. Only one node should be expanded at a time to maintain focus.
- **FR-005**: **Current Status Highlight**: The currently active phase of the journey MUST be visually distinct from completed phases using animation and unique styling.
- **FR-006**: **Entry Animations**: Timeline nodes MUST animate into view as the user scrolls, providing a dynamic and engaging experience.
- **FR-007**: **Skill Categorization**: Each phase MUST display the key technologies and skills associated with it as distinct visual tags.

### Key Entities *(include if feature involves data)*

- **Timeline Event**: Represents a distinct phase of the learning journey.
  - `label`: e.g., "Q1"
  - `timeframe`: e.g., "2023"
  - `subject`: The primary focus of the phase
  - `status`: Indicator of whether the phase is finished or ongoing
  - `details`: Descriptive summary of learning and growth
  - `skills`: List of technologies mastered
  - `highlights`: List of specific achievements
  - `theme`: Visual color coding for the phase

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of `timelineData` entries are rendered in chronological order.
- **SC-002**: Expand/collapse interaction completes in exactly 0.3 seconds (when motion is enabled).
- **SC-003**: All scroll animations maintain 60fps by using transform and opacity properties exclusively.
- **SC-004**: Zero horizontal scrollbars introduced by the timeline spine on viewports from 320px to 3840px.
- **SC-005**: 100% compliance with accessibility requirements (semantic HTML, ARIA attributes).
- **SC-006**: Zero TypeScript errors (`tsc --noEmit`) in the implementation file.
