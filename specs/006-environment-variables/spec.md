# Feature Specification: S-6 / Environment Variables

**Feature Branch**: `006-environment-variables`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: "Implement a fail-loud, type-safe environment variable validation system for both the frontend and backend."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Startup Safety Guard (Priority: P1)

As a developer, I want the application to fail immediately and descriptively if required environment variables are missing, so that I don't waste time debugging runtime errors caused by misconfiguration.

**Why this priority**: Preventing "silent failures" is critical for operational reliability and developer productivity.

**Independent Test**: Remove a required variable (e.g., `GEMINI_API_KEY`) from the `.env` file and verify the backend fails to start with a clear `[ENV ERROR]` message.

**Acceptance Scenarios**:

1. **Given** a missing required environment variable, **When** the application starts, **Then** it throws a descriptive error and terminates immediately.
2. **Given** an invalid environment variable (e.g., malformed URL), **When** the application starts, **Then** it identifies the specific variable and validation failure reason.

---

### User Story 2 - Type-Safe Development (Priority: P2)

As a developer, I want to access environment variables through a single, validated object with TypeScript/IDE support, so that I can avoid typos and ensure data integrity across the codebase.

**Why this priority**: Reduces bugs and improves developer speed through auto-completion and compile-time checks.

**Independent Test**: Import the `env` object in a frontend component and verify that `env.NEXT_PUBLIC_API_URL` is correctly typed as a string.

**Acceptance Scenarios**:

1. **Given** the `env.ts` or `config.py` module, **When** imported by another module, **Then** it provides full type/attribute completion for all validated variables.
2. **Given** an attempt to access `process.env` or `os.environ` directly, **When** reviewed, **Then** it is flagged as a violation of the "single point of access" principle.

---

### User Story 3 - Sensitive Data Masking (Priority: P3)

As a security-conscious developer, I want sensitive environment variables (like API keys) to be automatically masked in logs and string representations, so that credentials are never accidentally exposed.

**Why this priority**: Essential for maintaining security posture and preventing credential leakage in observability tools.

**Independent Test**: Print the backend `settings` object and verify that `gemini_api_key` appears as `'***'`.

**Acceptance Scenarios**:

1. **Given** a sensitive field like `resend_api_key`, **When** the settings object is logged or converted to a string, **Then** the value is replaced with a mask.

---

### Edge Cases

- **EC-001: Missing `.env` files**: System must provide clear instructions to copy from `.example` templates.
- **EC-002: Malformed URL for API**: Frontend must validate the format, not just the presence of `NEXT_PUBLIC_API_URL`.
- **EC-003: Comma-separated list parsing**: Backend must correctly parse `ALLOWED_ORIGINS` into a Python list, handling whitespace.
- **EC-004: Client-side exposure**: Ensure no server-only secrets are prefixed with `NEXT_PUBLIC_`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implement `frontend/lib/env.ts` using Zod to validate `NEXT_PUBLIC_API_URL` as a valid URL.
- **FR-002**: Frontend validation MUST fail loudly with a custom `[ENV ERROR]` message listing all failed issues.
- **FR-003**: Export inferred TypeScript types from `env.ts` for global consumer type safety.
- **FR-004**: Frontend `env.ts` MUST include `server-only` guard to prevent accidental secret leakage to the client.
- **FR-005**: Implement `backend/lib/config.py` using Pydantic `BaseSettings` for all backend configuration.
- **FR-006**: Backend MUST validate `GEMINI_API_KEY`, `RESEND_API_KEY`, and `ALLOWED_ORIGINS` (comma-separated).
- **FR-007**: Backend MUST support optional variables (`DEBUG`, `PORT`, `ENVIRONMENT`) with safe defaults.
- **FR-008**: Implement a startup guard in `backend/main.py` that validates the configuration before the server accepts requests.
- **FR-009**: The backend `Settings` class MUST override `__repr__` to mask sensitive API keys.
- **FR-010**: Finalize `.env.local.example` and `.env.example` with comprehensive comments and placeholder values.

### Key Entities *(include if feature involves data)*

- **Env (Frontend)**: A Zod-validated object containing public environment variables.
- **Settings (Backend)**: A Pydantic-validated singleton instance representing the entire backend configuration.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Application startup time is not significantly impacted by validation (< 50ms overhead).
- **SC-002**: `tsc --noEmit` returns 0 errors across the frontend.
- **SC-003**: Python type checking (if used) or runtime instantiation succeeds with a valid `.env`.
- **SC-004**: Sensitive keys are 100% masked in `__repr__` output.
- **SC-005**: 100% of environment variable access in the codebase is routed through the central validation modules.
- **SC-006**: Missing required variables result in immediate process exit (Exit Code 1) with descriptive logs.
