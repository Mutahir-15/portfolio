# Implementation Plan: S-1 / Folder Scaffold

**Branch**: `foundation/folder-scaffold` | **Date**: 2026-04-30 | **Spec**: `/specs/001-scaffold/spec.md`
**Input**: Sequence the structural setup of the Next.js/FastAPI monorepo.

## Summary
The goal of this plan is to define the ordered execution steps for scaffolding the portfolio project. This is a purely structural phase focused on directory creation and empty shell file instantiation.

## Technical Context
- **Monorepo**: Root contains `/frontend` and `/backend`.
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion.
- **Backend**: Python 3.12+, FastAPI, OpenAI Agents SDK.
- **Rules**: Strict TypeScript exports and Python stubs/docstrings for all shells.

## Phase A — Root setup
- **Directories**: `frontend/`, `backend/`, `.github/workflows/`
- **Order**: Parallel creation of top-level folders.

## Phase B — Frontend config files
- **Files**:
  1. `frontend/tsconfig.json`
  2. `frontend/tailwind.config.ts`
  3. `frontend/next.config.ts`
  4. `frontend/package.json`
  5. `frontend/.env.local.example`
  6. `frontend/.eslintrc.json`
  7. `frontend/globals.css`
- **Order**: Configs before CSS to ensure Tailwind/TypeScript settings are established.
- **Note**: **MUST** complete before Phase C/D/E.

## Phase C — Frontend app/ directory
- **Files**:
  1. `frontend/app/favicon.ico`
  2. `frontend/app/layout.tsx`
  3. `frontend/app/page.tsx`
- **Order**: Icons/assets first, then shell components.
- **Note**: Depends on Phase B (tsconfig).

## Phase D — Frontend components/ (ui, sections, layout, ai)
- **Directories**: `ui/`, `sections/`, `layout/`, `ai/`
- **Files**:
  1. `ui/`: `terminal-window.tsx`, `terminal-loader.tsx`, `terminal-error.tsx`, `badge.tsx`, `button.tsx`
  2. `sections/`: `hero-section.tsx`, `about-section.tsx`, `skills-section.tsx`, `projects-section.tsx`, `timeline-section.tsx`, `certifications-section.tsx`, `contact-section.tsx`
  3. `layout/`: `navbar.tsx`, `footer.tsx`, `theme-toggle.tsx`, `page-wrapper.tsx`
  4. `ai/`: `chatbot-widget.tsx`, `contact-form.tsx`
- **Order**: Subdirectories can be created in parallel; shell components within them sequentially.
- **Note**: No barrel exports created yet.

## Phase E — Frontend hooks/, lib/, types/, data/
- **Files**:
  1. `hooks/`: `use-typewriter.ts`, `use-theme.ts`, `use-reduced-motion.ts`
  2. `lib/`: `api.ts`, `env.ts`, `github.ts`, `utils.ts`
  3. `types/`: `github.ts`, `index.ts`
  4. `data/`: `project-summaries.json`
- **Order**: Types first, then hooks/lib to allow for type usage if needed in signatures.

## Phase F — Barrel exports (all index.ts files)
- **Files**:
  1. `frontend/components/ui/index.ts`
  2. `frontend/components/sections/index.ts`
  3. `frontend/components/layout/index.ts`
  4. `frontend/components/ai/index.ts`
- **Order**: Sequential or parallel.
- **Note**: **MUST** occur after all sibling components exist to prevent broken exports.

## Phase G — Backend structure
- **Files**:
  1. Root: `backend/main.py`, `backend/requirements.txt`, `backend/.env.example`, `backend/README.md`
  2. `routers/`: `__init__.py`, `chat_router.py`, `contact_router.py`, `projects_router.py`
  3. `agents/`: `__init__.py`, `chat_agent.py`, `summary_agent.py`, `contact_agent.py`
  4. `models/`: `__init__.py`, `chat_models.py`, `contact_models.py`
  5. `lib/`: `__init__.py`, `gemini_client.py`, `config.py`, `prompts.py`, `rate_limiter.py`
- **Order**: Root files, then subdirectories with `__init__.py` alongside their modules.

## Phase H — CI workflow shells
- **Files**:
  1. `.github/workflows/frontend-ci.yml`
  2. `.github/workflows/backend-ci.yml`
- **Order**: Parallel.

## Phase I — Verification
- **Steps**:
  1. Recursive list of all directories.
  2. Content check of `tsconfig.json` and `tailwind.config.ts`.
  3. Validation of barrel exports matching sibling files.
  4. Final run of `tsc --noEmit` from `frontend/`.

## ADR Suggestions
📋 Architectural decision detected: Monorepo Structure
Document reasoning and tradeoffs? Run `/sp.adr monorepo-structure`
