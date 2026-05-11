# Research: S-5 / Base Layout

**Feature**: [S-5 / Base Layout](spec.md)

## R-001: Scroll-Aware Navbar Implementation

**Decision**: Implement `useScrollDirection` as an internal hook within `navbar.tsx`.

**Rationale**:
- Keeping it internal adheres to the "single-use hook" constraint.
- Logic will track `lastScrollY` to determine direction and apply a `5px` delta threshold to prevent jitter (especially on mobile/momentum scroll).
- Visibility toggle starts after `20px` scroll to prevent immediate hiding on page load.

**Alternatives Considered**:
- Global `useScroll` hook: Rejected to avoid unnecessary complexity for a single-use case.

---

## R-002: Navbar Animations & Performance

**Decision**: Use `framer-motion` for `translateY` (hide/show) and mobile menu (opacity + translateY).

**Rationale**:
- Framer Motion is the project standard for component-level animations (Constitution IV).
- `translateY` and `opacity` are GPU-accelerated and do not trigger layout shifts, keeping CLS at 0 (SC-004).
- 300ms for Navbar visibility and 200ms for mobile menu fall well within the 800ms constitution limit.

---

## R-003: UI Chrome & Accessibility

**Decision**: Use semantic `<nav>` and `<footer>` elements with appropriate ARIA labels.

**Rationale**:
- Ensures compliance with AC-001 through AC-004.
- Keyboard navigation will be handled naturally by using `<a>` tags for navigation links.
- Focus rings will use standardized S-2 colors via Tailwind utility classes.

---

## R-004: Barrel Export Pattern

**Decision**: Update `frontend/components/layout/index.ts` to export all 4 components.

**Rationale**:
- Adheres to Constitution Pillar I (Barrel exports required for every feature folder).
- Simplifies imports in `app/layout.tsx`.
