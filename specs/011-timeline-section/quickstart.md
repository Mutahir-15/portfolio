# Quickstart: S-11 / Timeline Section

## Implementation Checklist

### 1. Setup & Data
- [ ] Define `TimelineEvent` interface.
- [ ] Copy `timelineData` array from spec.
- [ ] Define animation variants at module level.

### 2. Layout Structure
- [ ] Wrap component in `PageWrapper`.
- [ ] Apply `id="timeline"` and section padding.
- [ ] Implement `@skill/section-heading`.
- [ ] Add `overflow-x-hidden` to the section.

### 3. Vertical Spine
- [ ] Create absolute vertical line.
- [ ] Responsive positioning (Mobile: 20px, Desktop: 50%).
- [ ] Match border colors from tokens.

### 4. Nodes & Cards
- [ ] Map `timelineData` to alternating flex containers.
- [ ] Implement connector dots with variants.
- [ ] Build content card with title, badges, and hidden details.
- [ ] Integrate `Badge` component from S-10.

### 5. Interactivity
- [ ] Implement `expandedIndex` state.
- [ ] Wrap collapsible content in `AnimatePresence`.
- [ ] Add toggle buttons with ARIA attributes.

### 6. Styling & Animation
- [ ] Apply Q4 active pulse and left border accent.
- [ ] Wire up `whileInView` scroll animations.
- [ ] Implement `useReducedMotion()` conditional logic.

## Commands

### Type Checking
```bash
npx tsc --noEmit
```

### Visual Verification
- [ ] Verify spine alignment on mobile.
- [ ] Verify Q4 glow pulse in light mode.
- [ ] Verify only one card expands at a time.
