---
id: 002
title: Standardize PHR File Naming
stage: general
date: 2026-05-02
surface: agent
model: Gemini 2.0 Flash
feature: none
branch: main
user: ADMINS
command: none
labels: ["cleanup", "phr", "naming-convention"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/001-project-directory-structure-cleanup.general.prompt.md
 - history/prompts/tailwind-design-tokens/001-specify-tailwind-design-tokens.spec.prompt.md
 - history/prompts/tailwind-design-tokens/002-analyze-tailwind-design-tokens.misc.prompt.md
 - history/prompts/scaffold/003-complete-acceptance-criteria-for-folder-scaffold.misc.prompt.md
 - history/prompts/scaffold/004-sequenced-implementation-plan-for-folder-scaffold.plan.prompt.md
 - history/prompts/scaffold/005-actionable-task-generation-for-folder-scaffold.tasks.prompt.md
 - history/prompts/scaffold/006-implement-folder-scaffold.green.prompt.md
 - history/prompts/scaffold/007-detailed-documentation-scaffold.explainer.prompt.md
---

## Prompt

We need to fix and standardize file naming inside the history/prompts/ directory.

Problem:

Each subfolder (e.g., constitution/, general/, scaffold/) contains files with numeric prefixes like:
001-..., 002-..., etc.

However, the numbering is currently:

Inconsistent
Contains gaps (e.g., missing 003)
Not strictly sequential per folder
Requirements:
Each folder must maintain its own independent ID sequence
IDs must be:
Sequential (001, 002, 003, ...)
Continuous (no gaps)
Ordered based on logical or chronological flow
Rename files where necessary to:
Fix gaps
Restore proper ordering
Do NOT mix numbering across folders (each folder is isolated)
Goal:

Ensure a clean, predictable, and traceable naming system for all Prompt History Records.
Make sure to create a PHR for this as well.

## Response snapshot

Standardized the Prompt History Record (PHR) naming convention across all subdirectories in `history/prompts/`. Renamed files in `general`, `scaffold`, and `tailwind-design-tokens` to ensure independent, continuous, and sequential numbering starting from `001` per folder. Updated internal `id` metadata (both quoted and unquoted formats) to match the new filenames, eliminating gaps and inconsistencies.

## Outcome

- ✅ Impact: Established a clean, predictable, and traceable naming system for all PHRs.
- 🧪 Tests: Verified with `ls -R` and manual inspection of internal IDs.
- 📁 Files: Renamed and updated 8 files across 3 subdirectories.
- 🔁 Next prompts: Continue with planned feature work.
- 🧠 Reflection: Maintaining folder isolation for IDs prevents global ID conflicts and simplifies history tracking within specific features.
