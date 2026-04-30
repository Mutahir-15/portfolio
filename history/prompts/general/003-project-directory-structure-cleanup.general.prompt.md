---
id: 003
title: Project Directory Structure Cleanup
stage: general
date: 2026-04-30
surface: agent
model: Gemini 2.0 Flash
feature: none
branch: main
user: ADMINS
command: none
labels: ["cleanup", "structure", "policy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - GEMINI.md
---

## Prompt

We need to clean up and enforce proper directory structure in the project.

Issue:
An unnecessary nested folder exists at: specs
This folder incorrectly stores Prompt History Records (PHRs) inside the specs/ directory.

Required Actions:
Delete the folder: history/prompts from specs directory
Ensure all Prompt History Records (PHRs) are stored only in the central directory: history/prompts/ (at project root)
Enforce this rule going forward:
The specs/ directory must contain only specification-related files and folders
No history, logs, or runtime artifacts should exist inside specs/
Goal:
Maintain a clean, scalable, and logically separated project structure.

## Response snapshot

Cleaned up the directory structure by deleting the misplaced `history` folder inside `specs/001-scaffold/`. Updated `GEMINI.md` to explicitly enforce the "Directory Cleanliness Policy," ensuring that `specs/` contains only specification artifacts and all PHRs are routed to the central root `history/prompts/` directory.

## Outcome

- ✅ Impact: Restored directory integrity and established a permanent structural policy.
- 🧪 Tests: manual verification of file paths.
- 📁 Files: GEMINI.md updated; specs/001-scaffold/history removed.
- 🔁 Next prompts: Continue with feature implementation.
- 🧠 Reflection: Centralizing PHRs prevents "context fragmentation" across subdirectories.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
