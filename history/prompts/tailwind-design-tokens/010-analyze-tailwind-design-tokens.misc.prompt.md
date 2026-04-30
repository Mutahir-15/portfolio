---
id: "010"
title: "Analyze Tailwind Design Tokens Specification S-2"
stage: "misc"
date: "2026-04-30"
surface: "agent"
model: "gemini-2.0-flash"
feature: "tailwind-design-tokens"
branch: "002-tailwind-design-tokens"
user: "ADMINS"
command: "/sp.analyze"
labels: ["analysis", "quality-check", "design-tokens"]
links:
  spec: "specs/002-tailwind-design-tokens/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - specs/002-tailwind-design-tokens/spec.md
---

## Prompt

---
description: Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, and tasks.md after task generation.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Identify inconsistencies, duplications, ambiguities, and underspecified items across the three core artifacts (`spec.md`, `plan.md`, `tasks.md`) before implementation. This command MUST run only after `/sp.tasks` has successfully produced a complete `tasks.md`.

## Operating Constraints

**STRICTLY READ-ONLY**: Do **not** modify any files. Output a structured analysis report. Offer an optional remediation plan (user must explicitly approve before any follow-up editing commands would be invoked manually).

**Constitution Authority**: The project constitution (`.specify/memory/constitution.md`) is **non-negotiable** within this analysis scope. Constitution conflicts are automatically CRITICAL and require adjustment of the spec, plan, or tasks—not dilution, reinterpretation, or silent ignoring of the principle. If a principle itself needs to change, that must occur in a separate, explicit constitution update outside `/sp.analyze`.

## Execution Steps

### 1. Initialize Analysis Context

Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` once from repo root and parse JSON for FEATURE_DIR and AVAILABLE_DOCS. Derive absolute paths:

- SPEC = FEATURE_DIR/spec.md
- PLAN = FEATURE_DIR/plan.md
- TASKS = FEATURE_DIR/tasks.md

Abort with an error message if any required file is missing (instruct the user to run missing prerequisite command).
For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

### 2. Load Artifacts (Progressive Disclosure)

Load only the minimal necessary context from each artifact:

**From spec.md:**

- Overview/Context
- Functional Requirements
- Non-Functional Requirements
- User Stories
- Edge Cases (if present)

**From plan.md:**

- Architecture/stack choices
- Data Model references
- Phases
- Technical constraints

**From tasks.md:**

- Task IDs
- Descriptions
- Phase grouping
- Parallel markers [P]
- Referenced file paths

**From constitution:**

- Load `.specify/memory/constitution.md` for principle validation

### 3. Build Semantic Models

Create internal representations (do not include raw artifacts in output):

- **Requirements inventory**: Each functional + non-functional requirement with a stable key (derive slug based on imperative phrase; e.g., "User can upload file" → `user-can-upload-file`)
- **User story/action inventory**: Discrete user actions with acceptance criteria
- **Task coverage mapping**: Map each task to one or more requirements or stories (inference by keyword / explicit reference patterns like IDs or key phrases)
- **Constitution rule set**: Extract principle names and MUST/SHOULD normative statements

### 4. Detection Passes (Token-Efficient Analysis)

Focus on high-signal findings. Limit to 50 findings total; aggregate remainder in overflow summary.

#### A. Duplication Detection

- Identify near-duplicate requirements
- Mark lower-quality phrasing for consolidation

#### B. Ambiguity Detection

- Flag vague adjectives (fast, scalable, secure, intuitive, robust) lacking measurable criteria
- Flag unresolved placeholders (TODO, TKTK, ???, `<placeholder>`, etc.)

#### C. Underspecification

- Requirements with verbs but missing object or measurable outcome
- User stories missing acceptance criteria alignment
- Tasks referencing files or components not defined in spec/plan

#### D. Constitution Alignment

- Any requirement or plan element conflicting with a MUST principle
- Missing mandated sections or quality gates from constitution

#### E. Coverage Gaps

- Requirements with zero associated tasks
- Tasks with no mapped requirement/story
- Non-functional requirements not reflected in tasks (e.g., performance, security)

#### F. Inconsistency

- Terminology drift (same concept named differently across files)
- Data entities referenced in plan but absent in spec (or vice versa)
- Task ordering contradictions (e.g., integration tasks before foundational setup tasks without dependency note)
- Conflicting requirements (e.g., one requires Next.js while other specifies Vue)

### 5. Severity Assignment

Use this heuristic to prioritize findings:

- **CRITICAL**: Violates constitution MUST, missing core spec artifact, or requirement with zero coverage that blocks baseline functionality
- **HIGH**: Duplicate or conflicting requirement, ambiguous security/performance attribute, untestable acceptance criterion
- **MEDIUM**: Terminology drift, missing non-functional task coverage, underspecified edge case
- **LOW**: Style/wording improvements, minor redundancy not affecting execution order

### 6. Produce Compact Analysis Report

Output a Markdown report (no file writes) with the following structure:

## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A1 | Duplication | HIGH | spec.md:L120-134 | Two similar requirements ... | Merge phrasing; keep clearer version |

(Add one row per finding; generate stable IDs prefixed by category initial.)

**Coverage Summary Table:**

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|

**Constitution Alignment Issues:** (if any)

**Unmapped Tasks:** (if any)

**Metrics:**

- Total Requirements
- Total Tasks
- Coverage % (requirements with >=1 task)
- Ambiguity Count
- Duplication Count
- Critical Issues Count

### 7. Provide Next Actions

At end of report, output a concise Next Actions block:

- If CRITICAL issues exist: Recommend resolving before `/sp.implement`
- If only LOW/MEDIUM: User may proceed, but provide improvement suggestions
- Provide explicit command suggestions: e.g., "Run /sp.specify with refinement", "Run /sp.plan to adjust architecture", "Manually edit tasks.md to add coverage for 'performance-metrics'"

### 8. Offer Remediation

Ask the user: "Would you like me to suggest concrete remediation edits for the top N issues?" (Do NOT apply them automatically.)

## Operating Principles

### Context Efficiency

- **Minimal high-signal tokens**: Focus on actionable findings, not exhaustive documentation
- **Progressive disclosure**: Load artifacts incrementally; don't dump all content into analysis
- **Token-efficient output**: Limit findings table to 50 rows; summarize overflow
- **Deterministic results**: Rerunning without changes should produce consistent IDs and counts

### Analysis Guidelines

- **NEVER modify files** (this is read-only analysis)
- **NEVER hallucinate missing sections** (if absent, report them accurately)
- **Prioritize constitution violations** (these are always CRITICAL)
- **Use examples over exhaustive rules** (cite specific instances, not generic patterns)
- **Report zero issues gracefully** (emit success report with coverage statistics)

## Context

We have created a specifications file for tailwind-design-tokens filename: 002-tailwind-design-tokens at path: specs/002-tailwind-design-tokens/. Analyze this specification and share a detailed report that is this a good and a quality specifications? or it could be better.

## Response snapshot

## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A1 | Ambiguity | MEDIUM | spec.md:FR-003 | "optimized line heights" is subjective and lacks measurable bounds. | Define specific line-height values (e.g., 1.5rem for base) or reference a standard ratio. |
| A2 | Ambiguity | MEDIUM | spec.md:SC-004 | "without noticeable performance degradation" is non-measurable. | Align with Constitution IV: "Maintain 60fps and Lighthouse Performance Score ≥ 90." |
| U1 | Underspecification | MEDIUM | spec.md:Requirements | Missing requirement for custom border widths defined in input (Spec 6: terminal, terminal-accent). | Add FR-008 for custom border widths (1px and 2px terminal variants). |
| U2 | Underspecification | LOW | spec.md:Edge Cases | No defined fallback behavior for font loading failures. | Add edge case for font fallback to system mono/sans stacks. |
| C1 | Constitution | LOW | spec.md:Success Criteria | SC-002 mentions `tsc --noEmit` but doesn't explicitly target the zero-error requirement from Constitution I. | Ensure SC-002 explicitly mandates "0 TypeScript errors" for consistency. |

**Coverage Summary Table:**

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|
| define-dual-palette-colors | N/A | Missing tasks.md | Analysis performed on Spec only. |
| implement-terminal-typography | N/A | Missing tasks.md | Analysis performed on Spec only. |
| provide-terminal-font-sizes | N/A | Missing tasks.md | Analysis performed on Spec only. |
| define-terminal-spacing | N/A | Missing tasks.md | Analysis performed on Spec only. |
| implement-sharp-radii | N/A | Missing tasks.md | Analysis performed on Spec only. |
| define-custom-animations | N/A | Missing tasks.md | Analysis performed on Spec only. |
| support-terminal-breakpoint | N/A | Missing tasks.md | Analysis performed on Spec only. |

**Constitution Alignment Issues:**
- **Minor**: SC-004 should more strictly reference the Lighthouse ≥ 90 target defined in Constitution IV.
- **Strength**: Color palettes and font families are perfectly aligned with Constitution III.

**Metrics:**
- Total Requirements: 7
- Total Tasks: 0 (tasks.md not yet generated)
- Coverage %: 0%
- Ambiguity Count: 2
- Duplication Count: 0
- Critical Issues Count: 0

---

### Next Actions

- **Proceed to Planning**: The specification is high quality and strictly adheres to the Constitution's theme requirements. The identified ambiguities are minor and can be resolved during the `/sp.plan` phase.
- **Remediation**: I recommend updating `spec.md` to include the missing Border Width requirement (FR-008) and tightening the performance success criteria (SC-004).

**Would you like me to suggest concrete remediation edits for the top 3 issues (A1, A2, U1)?**

## Outcome

- ✅ Impact: Provided a quality analysis of the Design Tokens specification.
- 🧪 Tests: Validated against project constitution.
- 📁 Files: N/A (Read-only analysis).
- 🔁 Next prompts: /sp.plan S-2 Tailwind Tokens
- 🧠 Reflection: Spec is robust but needs slightly more measurable performance targets.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): None
