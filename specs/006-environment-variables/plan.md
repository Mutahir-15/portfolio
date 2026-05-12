# Implementation Plan: S-6 / Environment Variables

**Branch**: `006-environment-variables` | **Date**: 2026-05-12 | **Spec**: `/specs/006-environment-variables/spec.md`
**Input**: Feature specification for a fail-loud, type-safe environment variable validation system.

## Summary
Implement a dual-system validation strategy using Zod for the Next.js frontend and Pydantic Settings for the FastAPI backend. The goal is to enforce configuration integrity at startup, prevent sensitive data leakage via `server-only` guards and masking, and provide a unified, type-safe interface for all configuration access.

## Technical Context

**Language/Version**: TypeScript 5.x (Frontend), Python 3.12+ (Backend)  
**Primary Dependencies**: Zod, server-only (Frontend); FastAPI, pydantic-settings v2 (Backend)  
**Storage**: N/A (Configuration only)  
**Testing**: `tsc --noEmit` (FE), Python import/instantiation tests (BE)  
**Target Platform**: Vercel (FE), Railway/Render (BE)
**Project Type**: Web application (Frontend + Backend)  
**Performance Goals**: < 50ms validation overhead at startup.  
**Constraints**: Zero secrets in source control; fail-loud on missing required variables.  
**Scale/Scope**: System-wide configuration management.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] VI. DATA & VALIDATION STANDARDS: Zod for client-side, Pydantic for backend.
- [x] DEPLOYMENT & ENVIRONMENT STANDARDS: All env vars validated at startup. Fail loudly if missing.
- [x] I. CODE QUALITY: Strict TypeScript enforced; Pydantic models for API/Config boundaries.

## Project Structure

### Documentation (this feature)

```text
specs/006-environment-variables/
├── plan.md              # This file
├── research.md          # Technology decisions and best practices
├── data-model.md        # Schema definitions for Env and Settings
├── quickstart.md        # Developer setup instructions
└── tasks.md             # Implementation tasks (generated via /sp.tasks)
```

### Source Code (repository root)

```text
backend/
└── lib/
    └── config.py        # Pydantic Settings implementation
frontend/
└── lib/
    └── env.ts           # Zod environment validation
```

## Execution Plan

### Phase A — Security pre-check
- **Files touched**: `.gitignore`
- **Security risk**: Accidental commitment of `.env` or `.env.local` to GitHub.
- **Action**: Verify `.gitignore` contains patterns for `.env`, `.env.local`, `.env.*.local`.
- **Verification**: `grep` or manual check confirms entries are present and effective.

### Phase B — Install frontend dependencies
- **Files touched**: `frontend/package.json`
- **Security risk**: Dependency confusion or malicious packages (stick to verified versions).
- **Action**: `npm install zod server-only`
- **Verification**: `package.json` contains both packages in the `dependencies` block.

### Phase C — Finalize frontend example file
- **Files touched**: `frontend/.env.local.example`
- **Security risk**: Documenting a secret by accident in the example file.
- **Action**: Write `frontend/.env.local.example` with `NEXT_PUBLIC_API_URL` and clear comments.
- **Verification**: File exists and contains the required template variable.

### Phase D — Implement frontend/lib/env.ts
- **Files touched**: `frontend/lib/env.ts`
- **Security risk**: Exposing server-only secrets (checked by `server-only` package).
- **Action**: Define Zod schema, parse `process.env`, handle errors with `[ENV ERROR]` prefix, export typed `env` object.
- **Verification**: `tsc --noEmit` returns 0 errors; manual import in a test file works.

### Phase E — Finalize backend example file
- **Files touched**: `backend/.env.example`
- **Security risk**: Documenting a secret by accident in the example file.
- **Action**: Write `backend/.env.example` with all 6 required/optional variables and placeholders.
- **Verification**: File exists and contains all required variables from the spec.

### Phase F — Implement backend/lib/config.py
- **Files touched**: `backend/lib/config.py`
- **Security risk**: Log exposure of API keys.
- **Action**: Create `Settings` class using `BaseSettings`, implement `__repr__` masking, add `field_validator` for `ALLOWED_ORIGINS`.
- **Verification**: Python import succeeds; `repr(settings)` shows masked keys.

### Phase G — Add startup guard to backend/main.py
- **Files touched**: `backend/main.py`
- **Security risk**: Running with invalid configuration.
- **Action**: Wrap settings instantiation in a `try...except` block at the top of `main.py`. Print `[ENV ERROR]` and `exit(1)` on failure.
- **Verification**: Application exits with code 1 and loud error message when `.env` is deleted.

### Phase H — Full verification
- **Files touched**: Multiple
- **Security risk**: Regressions or missed edge cases.
- **Action**: Run the full suite of acceptance criteria (SC-001 through SC-013).
- **Verification**: `tsc --noEmit` pass; backend startup pass; masking confirmed.
