---
id: 001
title: Specify Font Loading Infrastructure
stage: spec
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-exp
feature: font-loading
branch: 004-font-loading
user: admin
command: /sp.specify
labels: [spec, font-loading, nextjs]
links:
  spec: specs/004-font-loading/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-font-loading/spec.md
 - specs/004-font-loading/checklists/requirements.md
tests:
 - n/a
---

## Prompt

description: Create or update the feature specification from a natural language feature description.
handoffs: 
  - label: Build Technical Plan
    agent: sp.plan
    prompt: Create a plan for the spec. I am building with...
  - label: Clarify Spec Requirements
    agent: sp.clarify
    prompt: Clarify specification requirements
    send: true
---

## User Input

```text
Project: Mutahir Bin Athar — Personal Portfolio Spec: S-4 / Font Loading Phase: 1 — Foundation Depends on: S-1 complete (folder scaffold exists) S-2 complete (fontFamily tokens defined) S-3 complete (layout.tsx ThemeProvider exists) Stack: Next.js 15, TypeScript, Tailwind CSS 4 Convention: kebab-case filenames, PascalCase components, camelCase hooks — per Constitution Pillar I --- ## OBJECTIVE Implement production-grade font loading for the portfolio using Next.js next/font/google. This spec connects the fontFamily tokens defined in S-2 to actual loaded fonts and applies them to the application via CSS variables. Two fonts are loaded: 1. JetBrains Mono — headings, navbar, terminal UI, badges 2. Geist Sans — body text, descriptions, paragraphs Fonts must be: - Loaded via next/font only — no @import, no CDN links - Exposed as CSS variables (--font-mono, --font-sans) - Applied to <html> via className in layout.tsx - Preloaded automatically by Next.js (zero extra config) - Verified against S-2 fallback chain (U2 fix) --- ## FILES TO IMPLEMENT frontend/ └── app/ └── layout.tsx ← extend existing S-3 implementation add font variables to <html> className add font loading at top of file NOTE: layout.tsx already exists from S-3. This spec EXTENDS it — do not overwrite ThemeProvider, FAWT script, or metadata. Append font logic only. --- ## FUNCTIONAL REQUIREMENTS FR-001: Load JetBrains Mono via next/font/google Configuration: variable: '--font-mono' subsets: ['latin'] weights: ['400', '500', '700'] display: 'swap' preload: true Usage: applied to <html> via className FR-002: Load Geist Sans via next/font/google Configuration: variable: '--font-sans' subsets: ['latin'] weights: ['400', '500'] display: 'swap' preload: true Usage: applied to <html> via className FR-003: Apply CSS variables to <html> element The <html> className must include both font variables: className={`${jetbrainsMono.variable} ${geistSans.variable}`} This exposes --font-mono and --font-sans to all CSS and Tailwind utility classes across the app. FR-004: Connect CSS variables to Tailwind tokens tailwind.config.ts fontFamily tokens (from S-2) must reference the CSS variables: mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace'] sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'] NOTE: This requires updating tailwind.config.ts from S-2. The font name strings ('JetBrains Mono', 'Geist Sans') defined in S-2 must be REPLACED with CSS variable references so Tailwind resolves the loaded font correctly. This is the correct pattern for next/font + Tailwind. FR-005: Font display strategy display: 'swap' is mandatory for both fonts. Rationale: ensures text is visible during font load using the fallback chain — eliminates invisible text (FOIT — Flash of Invisible Text). This directly implements the U2 fix from S-2 analysis. FR-006: Preload behavior Next.js preloads fonts automatically when loaded via next/font/google with preload: true. This generates <link rel="preload"> in <head> automatically — no manual link tags needed. Verify preload tags are present in page source. --- ## PERFORMANCE REQUIREMENTS PR-001: Zero layout shift from font loading CLS contribution from fonts must be 0. Achieved via: - display: 'swap' (FR-005) - Explicit font fallback chain in S-2 tokens (FR-004) - next/font automatic size-adjust (built-in) PR-002: Fonts must not block rendering next/font with display: 'swap' ensures fonts never block the critical rendering path. Verify: no render-blocking font resources in Lighthouse report. PR-003: Font file size budget JetBrains Mono (3 weights): ≤ 150kb total Geist Sans (2 weights): ≤ 100kb total next/font automatically subsets to latin only — this budget should be met without extra config. --- ## EDGE CASES EC-001: next/font network failure If Google Fonts CDN is unreachable at build time: - next/font will throw a build error - Resolution: fonts must also be available as local fallbacks in public/fonts/ for offline/CI builds - Document this in README.md under "Font Setup" EC-002: CSS variable undefined at runtime If --font-mono or --font-sans is undefined (font failed to load post-build): - Tailwind font-mono class falls through to 'Fira Code' → 'Consolas' → 'monospace' - Tailwind font-sans class falls through to 'Inter' → 'system-ui' → 'sans-serif' - This is the U2 fallback chain from S-2 — verified here EC-003: Font weight mismatch If a component requests a font weight not loaded (e.g. font-weight: 600 with only 400/500/700 loaded): - Browser synthesizes the weight — acceptable - Constitution Pillar I: components must only use weights 400, 500, or 700 for mono and 400 or 500 for sans EC-004: Hydration mismatch from fonts next/font injects styles during SSR — no client-side font injection occurs. This eliminates hydration mismatches caused by font class differences between server and client renders. --- ## INTEGRATION WITH S-2 TOKEN SYSTEM The following change to tailwind.config.ts is REQUIRED as part of this spec (FR-004): BEFORE (S-2 definition): fontFamily: { mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'], sans: ['Geist Sans', 'Inter', 'system-ui', 'sans-serif'], } AFTER (S-4 update): fontFamily: { mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace'], sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'], } Rationale: next/font exposes loaded fonts via CSS variables. Tailwind must reference the variable, not the font name, to correctly use the next/font-loaded instance. --- ## SUCCESS CRITERIA SC-001: JetBrains Mono loads with weights 400, 500, 700 Verified: browser DevTools > Network > Font tab SC-002: Geist Sans loads with weights 400, 500 Verified: browser DevTools > Network > Font tab SC-003: --font-mono CSS variable resolves to JetBrains Mono Verified: DevTools > Elements > Computed > --font-mono SC-004: --font-sans CSS variable resolves to Geist Sans Verified: DevTools > Elements > Computed > --font-sans SC-005: <html> className contains both font variable classes Verified: DevTools > Elements > inspect <html> tag SC-006: Lighthouse reports zero render-blocking font resources SC-007: CLS score contribution from fonts = 0 SC-008: tailwind.config.ts fontFamily uses var(--font-mono) and var(--font-sans) — not font name strings SC-009: S-3 ThemeProvider, FAWT script, and metadata in layout.tsx are intact — not overwritten SC-010: tsc --noEmit returns EXACTLY 0 TypeScript errors SC-011: Font fallback chain verified per EC-002 (block fonts in DevTools, confirm fallback renders) --- ## STOP AFTER COMPLETION After printing the S-4 summary block, STOP COMPLETELY. Do NOT generate S-5 automatically. Do NOT run /sp.plan, /sp.specify, or any other command. Do NOT continue to the next spec. Await explicit user instruction before any further action.
```

## Response snapshot

I have generated the specification for S-4 / Font Loading.
- Created branch `004-font-loading` and initialized folder structure.
- Wrote `specs/004-font-loading/spec.md` based on detailed user requirements.
- Created quality checklist at `specs/004-font-loading/checklists/requirements.md`.
- Verified that all mandatory sections are complete and requirements are testable.

## Outcome

- ✅ Impact: Established a solid foundation for production-grade font loading with Next.js.
- 🧪 Tests: n/a (Specification phase)
- 📁 Files: 2 new files created in `specs/004-font-loading/`.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: The user provided a very detailed input which allowed for a high-quality spec creation without the need for additional clarification turns.

## Evaluation notes (flywheel)

- Failure modes observed: `Join-Path` in PowerShell script had a bug; fixed it.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
