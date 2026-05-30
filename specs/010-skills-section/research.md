# Research: Skills Section (S-10)

## Decision: Tailwind 4 vs config.ts
Rationale: The project uses a `tailwind.config.ts` (Tailwind 3 style) but is specified as Next.js 15. The configuration is already robust with `dark.*` and `light.*` nested colors.
Alternatives considered: Moving to pure CSS variables in `globals.css` (Tailwind 4 default behavior). Rejected to maintain consistency with existing tokens in `tailwind.config.ts`.

## Decision: Hover Animations
Rationale: Framer Motion `whileHover` using `scale` and `boxShadow` (glow). `scale` is a transform property and won't trigger layout shifts, maintaining 60fps.
Alternatives considered: CSS `:hover` with transitions. Rejected because Framer Motion provides better spring physics and `useReducedMotion` integration.

## Decision: Unicode Icon Verification
Rationale: Use λ (Languages), ⬡ (Frameworks), ⚡ (AI/ML), $ (Tools). These are common JetBrains Mono glyphs.
Alternatives considered: SVG icons or Lucide-react. Rejected to maintain "terminal" aesthetic and minimize external dependencies. Fallbacks: `[lang]`, `[fw]`, `[ai]`, `[$]`.

## Decision: Staggered Scroll Animations
Rationale: Use `whileInView` with `staggerChildren`. This allows the category blocks to pop in sequentially.
Alternatives considered: Individual delays per component. Rejected because `staggerChildren` is easier to manage at the container level.
