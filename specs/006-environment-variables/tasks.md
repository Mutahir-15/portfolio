---
description: "Task list for Environment Variable Validation implementation"
---

# Tasks: S-6 / Environment Variables

**Input**: Design documents from `/specs/006-environment-variables/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Test tasks are included to verify fail-loud behavior and masking (SC-004, SC-006).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- File paths are relative to repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Verify `frontend/.gitignore` contains `.env.local` and `.env.local.example` is NOT ignored
- [ ] T002 [P] Verify `backend/.gitignore` contains `.env` and `.env.example` is NOT ignored
- [ ] T003 [P] Install `zod` and `server-only` in `frontend/` via `npm install`
- [ ] T004 [P] Finalize `frontend/.env.local.example` with `NEXT_PUBLIC_API_URL` and comments
- [ ] T005 [P] Finalize `backend/.env.example` with all 6 required/optional variables and comments

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for environment handling

- [ ] T006 [P] Create `frontend/lib/env.ts` with `server-only` import and basic Zod export structure
- [ ] T007 [P] Create `backend/lib/config.py` with `pydantic-settings` import and `Settings` class skeleton

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Startup Safety Guard (Priority: P1) 🎯 MVP

**Goal**: Application fails immediately and descriptively if required variables are missing or malformed.

**Independent Test**: Remove `GEMINI_API_KEY` from `backend/.env` and verify backend fails to start with a clear `[ENV ERROR]` message.

### Implementation for User Story 1

- [ ] T008 [US1] Implement Pydantic validation for all 6 backend variables in `backend/lib/config.py`
- [ ] T009 [US1] Implement comma-separated list parsing for `ALLOWED_ORIGINS` in `backend/lib/config.py`
- [ ] T010 [US1] Implement startup guard in `backend/main.py` using `try...except` around settings import
- [ ] T011 [US1] Add descriptive `[ENV ERROR]` logging and `exit(1)` to startup guard in `backend/main.py`
- [ ] T012 [US1] Test: Verify backend process exits with code 1 and error log when required variables are missing

**Checkpoint**: User Story 1 functional - Backend is now fail-safe.

---

## Phase 4: User Story 2 - Type-Safe Development (Priority: P2)

**Goal**: Access environment variables through a single, validated object with IDE support.

**Independent Test**: Import `env` in a frontend component and verify `env.NEXT_PUBLIC_API_URL` has correct types and autocompletion.

### Implementation for User Story 2

- [ ] T013 [US2] Complete Zod schema validation for `NEXT_PUBLIC_API_URL` in `frontend/lib/env.ts`
- [ ] T014 [US2] Implement fail-loud error handling with `[ENV ERROR]` prefix in `frontend/lib/env.ts`
- [ ] T015 [US2] Export inferred TypeScript types for the `env` object in `frontend/lib/env.ts`
- [ ] T016 [US2] Test: Verify IDE autocompletion and type checking (tsc) for env.NEXT_PUBLIC_API_URL
- [ ] T016a [US2] Test: Measure env validation startup overhead (Target: < 50ms)
- [ ] T016b [US2] Audit for NEXT_PUBLIC_ secret exposure in frontend/
- [ ] T017 [US2] Test: Verify frontend build/runtime fails loudly if variables are malformed

**Checkpoint**: User Story 2 functional - Frontend is now type-safe and fail-safe.

---

## Phase 5: User Story 3 - Sensitive Data Masking (Priority: P3)

**Goal**: Sensitive environment variables are automatically masked in logs and string representations.

**Independent Test**: Print the `settings` object in the backend and verify `gemini_api_key` appears as `'***'`.

### Implementation for User Story 3

- [ ] T018 [US3] Override `__repr__` in the `Settings` class in `backend/lib/config.py` to mask sensitive keys
- [ ] T019 [US3] Test: Verify `print(settings)` output masks sensitive variables (SC-004)

**Checkpoint**: All user stories complete and independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup

- [ ] T020 [P] Run `tsc --noEmit` in `frontend/` to ensure zero environment-related type errors
- [ ] T021 [P] Audit codebase to ensure all `process.env` and `os.environ` access is replaced by `env` or `settings`
- [ ] T022 [P] Verify `ALLOWED_ORIGINS` correctly parses whitespace-heavy comma lists (EC-003)
- [ ] T023 [P] Final run-through of all `quickstart.md` validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Stories (Phase 3+)**: Depend on Phase 2 completion.
  - US1 (P1) is the MVP and should be prioritized.
  - US2 and US3 can proceed in parallel once Phase 2 is done.
- **Polish (Phase 6)**: Depends on all user stories completion.

### Parallel Opportunities

- Phase 1 tasks (T001-T005) can all run in parallel.
- Phase 2 tasks (T006-T007) can run in parallel.
- Once Phase 2 is done, implementation for US1, US2, and US3 can theoretically run in parallel if independent files are maintained (which they are).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete User Story 1 (Backend startup safety).
3. **Validate**: Verify the backend fails loud. This delivers the most critical safety requirement.

### Incremental Delivery

1. Foundation ready.
2. Add Backend Safety (US1) -> MVP Ready.
3. Add Frontend Type-Safety (US2) -> Developer Experience improved.
4. Add Security Masking (US3) -> Security hardened.
5. Final verification (Phase 6) -> Feature complete.
