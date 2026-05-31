# Skill: section-heading

## Purpose
Reusable section heading pattern used across all Phase 2 portfolio sections. Extracted from S-9 (About), confirmed in S-10 (Skills). Must be applied identically in S-11, S-12, S-13.

## SKILL DEFINITION

### What this skill does
Renders a consistent three-part section heading:
- **Part 1: comment line** → `// section`
- **Part 2: main heading** → `<h2>` with section name
- **Part 3: accent bar** → 60px colored underline

### When to apply this skill
Apply whenever a new portfolio section component is being specified or implemented. Every section in Phase 2 and beyond uses this exact pattern. Do not deviate from this pattern without explicit instruction.

### Exact implementation pattern

```tsx
<motion.div
  variants={fadeUpVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  {/* Part 1: Comment line */}
  <p 
    className="font-mono text-terminal-sm text-dark-muted dark:text-dark-muted text-light-muted mb-2"
    aria-hidden="true"
  >
    // section
  </p>

  {/* Part 2: Main heading */}
  <h2 className="font-mono text-terminal-3xl font-bold text-dark-green dark:text-dark-green text-light-green">
    {sectionName}
  </h2>

  {/* Part 3: Accent bar */}
  <div 
    className="w-[60px] h-[2px] mt-2 mb-8 bg-dark-green dark:bg-dark-green bg-light-green" 
    aria-hidden="true"
  />
</motion.div>
```

### Section name conventions
Each section uses its own identifier string in snake_case or with underscores:
- **About:** `about_me`
- **Skills:** `skills_&_tools`
- **Projects:** `projects`
- **Timeline:** `journey`
- **Certifications:** `certifications`
- **Contact:** `contact_me`

### Token references (from S-2)
- **Font:** `font-mono` (JetBrains Mono)
- **Size h2:** `text-terminal-3xl` (2rem / 2.5rem lh)
- **Size label:** `text-terminal-sm` (0.75rem)
- **Color dark:** `text-dark-green` / `bg-dark-green` (#00ff88)
- **Color light:** `text-light-green` / `bg-light-green` (#006633)
- **Color muted:** `text-dark-muted` (#7aab7a) dark / `text-light-muted` (#2d5a2d) light
- **Bar width:** 60px (fixed — do not make responsive)
- **Bar height:** 2px (fixed)
- **Spacing:** `mt-2` between h2 and bar; `mb-8` below bar before section content

### Framer Motion animation for heading
The heading group animates as one unit:
- **variant:** `fadeUpVariant` (see framer-animation skill)
- **delay:** 0s (heading always animates first)
- **whileInView:** true
- **once:** true
- **margin:** '-80px'

### Accessibility requirements
- `<h2>` tag is mandatory — never use `<div>` or `<p>` styled to look like a heading.
- `// section` comment line: `aria-hidden="true"` (decorative — screen readers skip it).
- Accent bar div: `aria-hidden="true"` (decorative).

### What NOT to do
- Do not change font from `font-mono` to `font-sans`.
- Do not change bar width from 60px.
- Do not use a different heading level (`<h1>`, `<h3>`).
- Do not add extra spacing beyond what is specified.
- Do not use different token names — always use the S-2 defined tokens exactly.

### Usage in future specs
Reference this skill in any section spec with:
`@skill/section-heading`

SpecKit will auto-apply this pattern without re-speccing it in the specification document.

### Verification checklist
- [ ] `// section` renders in font-mono muted color
- [ ] `<h2>` renders in terminal-3xl bold green
- [ ] 60px green bar renders below h2
- [ ] mb-8 spacing below bar before content
- [ ] aria-hidden on comment and bar
- [ ] Framer Motion fadeUp on whole heading group
- [ ] Identical appearance in dark and light mode
