---
id: 002
title: Create framer-animation skill
stage: misc
date: 2026-05-31
surface: agent
model: Gemini 2.0 Flash
feature: none
branch: 010-skills-section
user: Mutahir Bin Athar
command: sp.skill
labels: ["skill", "documentation", "animation", "framer-motion"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - skills/framer-animation.skill.md
tests:
 - none
---

## Prompt

"Create a SpecKit Plus skill file"

Skill name:   framer-animation
Skill file:   skills/framer-animation.skill.md
Purpose:      Reusable Framer Motion animation
              variants and patterns used across all
              portfolio sections. Extracted from S-8
              (Hero), S-9 (About), S-10 (Skills).
              Enforces Constitution Pillar IV:
              60fps, transform+opacity only,
              prefers-reduced-motion respected.

---

## SKILL DEFINITION

### What this skill does
Defines the standard Framer Motion variant constants,
whileInView configuration, and useReducedMotion
pattern used consistently across all sections.

### When to apply this skill
Apply whenever a section component uses scroll
animations, stagger effects, or hover interactions.
Every Phase 2+ section uses at least fadeUpVariant.

---

### VARIANT 1 — fadeUpVariant

Purpose: Single element fade + slide up on scroll
Use for: Section headings, individual cards,
         content blocks, terminal windows

  const fadeUpVariant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

Rules:
  - y value: always 20px — do not change
  - duration: always 0.5s — do not change
  - Properties: opacity + transform (y) ONLY
    Never animate: width, height, left, top,
    margin, padding (layout-triggering)
  - Used with: initial="hidden" animate="visible"
    OR initial="hidden" whileInView="visible"

---

### VARIANT 2 — containerVariant

Purpose: Stagger children animations sequentially
Use for: Category grids, card lists, badge groups,
         any set of 3+ sibling elements

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

Rules:
  - staggerChildren: always 0.15s
  - Container itself has no visual animation —
    only coordinates children timing
  - Each child must use fadeUpVariant

Usage pattern:
  <motion.div
    variants={containerVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >
    {items.map(item => (
      <motion.div
        key={item.id}
        variants={fadeUpVariant}
      >
        {/* child content */}
      </motion.div>
    ))}
  </motion.div>

---

### VARIANT 3 — fadeInVariant

Purpose: Fade only — no vertical movement
Use for: Overlays, scanlines, ambient elements,
         elements that should appear without motion

  const fadeInVariant = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

---

### VARIANT 4 — hoverVariant

Purpose: Scale up on hover for interactive elements
Use for: Badges, cards, buttons with hover effect

  const hoverVariant = {
    scale: 1.05,
    transition: { duration: 0.15, ease: 'easeOut' },
  }

Usage:
  <motion.div whileHover={hoverVariant}>

Rules:
  - scale: always 1.05 — do not exceed
  - Properties: transform (scale) ONLY
  - Never animate color in Framer Motion —
    use Tailwind transition-colors for color changes

---

### WHILEINVIEW STANDARD CONFIG

Apply this exact viewport config to ALL
whileInView animations across the codebase:

  viewport={{ once: true, margin: '-80px' }}

Rules:
  - once: true is MANDATORY — never re-animate
    on scroll-out (Constitution Pillar IV)
  - margin: '-80px' triggers animation 80px before
    element enters viewport — feels responsive
  - Do not use amount: threshold instead of margin

---

### DELAY CONVENTIONS

When multiple elements animate sequentially
without staggerChildren, use these delay values:

  Section heading:    delay: 0      (always first)
  Primary content:    delay: 0.2
  Secondary content:  delay: 0.4
  Tertiary content:   delay: 0.6
  CTA / buttons:      delay: 0.7
  Final element:      delay: 0.8

Maximum delay in any section: 0.8s
(Constitution max 800ms for UI transitions)

---

### PREFERS-REDUCED-MOTION PATTERN

MANDATORY in every component that uses
Framer Motion animations:

  // At top of component (after useState/useEffect)
  const prefersReducedMotion = useReducedMotion()

  // Conditional variant application:
  const resolvedVariant = prefersReducedMotion
    ? {}   // no animation
    : fadeUpVariant

  // OR pass directly to motion props:
  <motion.div
    variants={prefersReducedMotion ? {} : fadeUpVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >

  // For whileHover:
  <motion.div
    whileHover={prefersReducedMotion ? {} : hoverVariant}
  >

Rules:
  - useReducedMotion() must be called at the TOP
    of the component — not inside a loop or condition
  - When reduced motion is preferred: animations
    skip entirely, content displays immediately
  - The content itself is NEVER hidden — only the
    animation is disabled

---

### WHERE TO DEFINE VARIANTS

ALWAYS define variant constants at MODULE LEVEL
(outside the component function):

  // ✅ CORRECT — module level
  const fadeUpVariant = { ... }
  const containerVariant = { ... }

  export default function MySection() { ... }

  // ❌ WRONG — inside component
  export default function MySection() {
    const fadeUpVariant = { ... } // recreated every render
  }

Rationale: variants defined inside components are
recreated on every render — unnecessary garbage
collection pressure.

---

### IMPORT REQUIREMENTS

Every component using these patterns needs:

  import { motion, useReducedMotion } from 'framer-motion'

  // For whileInView only (no useInView hook needed —
  // whileInView handles it internally)

---

### CONSTITUTION COMPLIANCE CHECKLIST

  [ ] All animated properties: opacity or transform only
  [ ] No width, height, top, left, margin, padding
      in any keyframe or variant
  [ ] useReducedMotion() called in every animated component
  [ ] once: true on all whileInView viewports
  [ ] No animation duration exceeds 800ms
  [ ] Variant constants defined at module level
  [ ] whileHover uses scale: 1.05 maximum

### Usage in future specs
  Reference this skill in any section spec with:
    @skill/framer-animation
  SpecKit will auto-apply all variant constants,
  whileInView config, and reduced motion pattern
  without re-speccing them.

### Verification checklist
  [ ] fadeUpVariant: opacity 0→1, y 20→0, 0.5s
  [ ] containerVariant: staggerChildren 0.15s
  [ ] fadeInVariant: opacity 0→1, 0.4s
  [ ] hoverVariant: scale 1.05, 0.15s
  [ ] All variants at module level
  [ ] useReducedMotion() in every animated component
  [ ] viewport once:true margin:'-80px' everywhere
  [ ] No layout-triggering properties animated

Create this skill file at:
  skills/framer-animation.skill.md

Create the PHR at:
history/prompts/skills/

## Response snapshot

I created the `skills/framer-animation.skill.md` file, which codifies the project's standard Framer Motion variants and patterns. This skill ensures performance (transform/opacity only), accessibility (reduced motion support), and consistency (viewport config, delays) across all animated components in the portfolio.

## Outcome

- ✅ Impact: Standardized animation patterns for high performance and accessibility.
- 🧪 Tests: none
- 📁 Files: skills/framer-animation.skill.md
- 🔁 Next prompts: Use `@skill/framer-animation` in future specs.
- 🧠 Reflection: Explicitly defining animation constraints prevents performance regressions and layout shifts.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
