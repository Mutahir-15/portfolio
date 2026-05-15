# Feature Specification: S-7 / FastAPI Backend Entry Point

**Feature Branch**: `007-fastapi-backend-entry`  
**Created**: 2026-05-13  
**Status**: Draft  
**Input**: User description provided verbatim in prompt history.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Backend Health & Infrastructure Readiness (Priority: P1)

As a system administrator or infrastructure monitoring tool (e.g., Railway/Vercel health checks), I want to verify that the FastAPI backend is fully operational and healthy without needing authentication.

**Why this priority**: Foundational requirement for deployment and automated monitoring. Without a health check, infrastructure cannot determine if the service is ready to receive traffic.

**Independent Test**: Can be verified by running the server and performing a `GET /api/health` request. It delivers value by confirming the application lifecycle and configuration are correct.

**Acceptance Scenarios**:

1. **Given** the FastAPI application is running, **When** a `GET /api/health` request is made, **Then** the system returns a 200 OK response with the status, version, and environment name.
2. **Given** the application is starting up, **When** checking the logs, **Then** startup events are logged (environment, allowed origins, debug status) but no sensitive API keys are printed.

---

### User Story 2 - Developer API Discovery (Priority: P1)

As a frontend developer, I want to access interactive API documentation so that I can understand the request/response contracts for the chat, contact, and projects features.

**Why this priority**: Enables parallel frontend/backend development by providing a clear contract and interactive testing playground.

**Independent Test**: Can be fully tested by navigating to `/api/docs` or `/api/redoc` in a browser. Delivers value by automating API documentation.

**Acceptance Scenarios**:

1. **Given** the backend is running, **When** I navigate to `http://localhost:8000/api/docs`, **Then** I see the Swagger UI listing all endpoints.
2. **Given** the Swagger UI is open, **When** I inspect the models, **Then** I see detailed Pydantic schemas for ChatRequest, ChatResponse, ContactRequest, and ContactResponse.

---

### User Story 3 - Feature Stubbing for Integration (Priority: P2)

As a frontend developer, I want the backend endpoints for chat, contact, and projects to return successful stub responses so that I can integrate the UI components before the AI logic is implemented.

**Why this priority**: Prevents the frontend from being blocked by complex LLM agent implementation.

**Independent Test**: Can be tested by sending POST/GET requests to the respective endpoints and receiving a 200 OK with a JSON placeholder.

**Acceptance Scenarios**:

1. **Given** the backend is running, **When** I POST to `/api/chat`, **Then** I receive a 200 OK with a "coming soon" message.
2. **Given** the backend is running, **When** I GET `/api/projects`, **Then** I receive a 200 OK with an empty list of projects.

---

### User Story 4 - Traffic Management & Security (Priority: P2)

As a system owner, I want all incoming traffic to be rate-limited and traced with unique IDs to prevent abuse and facilitate debugging.

**Why this priority**: Protects the backend from basic DoS/abuse and ensures every request can be correlated in logs.

**Independent Test**: Can be tested by sending more than 10 requests per minute from the same IP and verifying the 429 error, and by checking for the `X-Request-ID` header in any response.

**Acceptance Scenarios**:

1. **Given** a user sends 11 requests within 60 seconds, **When** the 11th request hits the API, **Then** the system returns a 429 Rate Limit Exceeded response.
2. **Given** any request to any endpoint, **When** the response is received, **Then** the `X-Request-ID` header is present and unique.

### Edge Cases

- **Port Conflict**: System should provide troubleshooting steps if port 8000 is occupied.
- **Missing Extra Dependencies**: Importing `EmailStr` without `pydantic[email]` should be handled gracefully or ensured via requirements.
- **CORS Preflight**: Browsers sending `OPTIONS` requests before a POST must be handled correctly by the middleware.
- **Debug Leakage**: Raw exception details must never be exposed when `DEBUG` is set to false in production.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a FastAPI application instance with metadata and prefixed documentation URLs (`/api/docs`).
- **FR-002**: System MUST implement CORS middleware allowing GET, POST, and OPTIONS from configured origins.
- **FR-003**: System MUST provide a health check endpoint at `GET /api/health` that is exempt from rate limiting.
- **FR-004**: System MUST register routers for `chat`, `contact`, and `projects` under the `/api` prefix.
- **FR-005**: System MUST implement a global exception handler that returns structured JSON and hides details in production.
- **FR-006**: System MUST inject a unique `X-Request-ID` into every request state and response header.
- **FR-007**: System MUST log startup and shutdown events without exposing sensitive environment variables.
- **FR-008**: System MUST enforce a default rate limit of 10 requests per minute per IP using `slowapi`.
- **FR-009**: System MUST provide stub endpoints for all Phase 3 and Phase 4 features to allow frontend integration.

  STUB VALIDATION RULE:
  All stub endpoints MUST accept and validate their
  Pydantic request models even in stub form.
  Rationale:
    - Validates models are correctly imported
    - Catches field constraint errors early
    - Ensures API contract is correct before
      Phase 3/4 implementation begins
    - Frontend integration can be tested against
      real validation behavior immediately

  Updated stub implementations:

  chat_router.py:
    from backend.models.chat_models import (
      ChatRequest,
      ChatResponse,
    )

    @router.post('', response_model=ChatResponse)
    async def chat(
      request: ChatRequest,
    ) -> ChatResponse:
      # TODO: Replace with chat_agent in Phase 4
      return ChatResponse(
        reply='Chat agent coming in Phase 4.',
        request_id='stub',
      )

  contact_router.py:
    from backend.models.contact_models import (
      ContactRequest,
      ContactResponse,
    )

    @router.post('', response_model=ContactResponse)
    async def contact(
      request: ContactRequest,
    ) -> ContactResponse:
      # TODO: Replace with contact_agent in Phase 4
      return ContactResponse(
        success=True,
        message='Contact agent coming in Phase 4.',
        request_id='stub',
      )

  projects_router.py:
    No request body needed (GET endpoints).
    Return typed dict responses as already defined.

  Verification:
    # Test chat stub validation
    curl -X POST http://localhost:8000/api/chat \
      -H "Content-Type: application/json" \
      -d '{"message": ""}'
    Expected: 422 Unprocessable Entity
             (min_length=1 violated)

    curl -X POST http://localhost:8000/api/chat \
      -H "Content-Type: application/json" \
      -d '{"message": "Hello"}'
    Expected: 200 with stub ChatResponse

    # Test contact stub validation
    curl -X POST http://localhost:8000/api/contact \
      -H "Content-Type: application/json" \
      -d '{"name": "M", "email": "bad", "message": "hi"}'
    Expected: 422 Unprocessable Entity
             (name min_length=2, invalid email, message
              min_length=10 all violated)
- **FR-010**: Pydantic Request/Response Models

  chat_models.py — THREE models:

    ChatMessage (internal message shape):
      role: str — ONLY this model uses role validation
        Field constraint: pattern='^(user|assistant)$'
        Rationale: enforces valid conversation turns,
        prevents injection of system-level role strings
      content: str
        Field constraint: min_length=1, max_length=2000

    ChatRequest (incoming API request):
      message: str
        Field constraint: min_length=1, max_length=500
      history: list[ChatMessage]
        Field constraint: max_length=20
      NOTE: ChatRequest has NO role field —
            role belongs to ChatMessage only

    ChatResponse (outgoing API response):
      reply: str
      request_id: str
      NOTE: ChatResponse has NO role field

  contact_models.py — TWO models:
    ContactRequest and ContactResponse
    NEITHER model has a role field.
    Role validation is EXCLUSIVE to ChatMessage.
    Do not add role fields to contact models.

  Verification grep after implementation:
    grep -n "role" backend/models/contact_models.py
    Expected: 0 results
    Any match = incorrect implementation
- **FR-011**: System MUST include stub files for all AI agents (Chat, Summary, Contact) ready for implementation.
- **FR-012**: System MUST include library stubs for Gemini client and agent system prompts.
- **FR-013**: System MUST provide a comprehensive README with setup, environment, and running instructions.

### Key Entities *(include if feature involves data)*

- **HealthResponse**: Represents the system health status, version, and environment.
- **ChatMessage**: Represents a single message in a conversation with `role` (user/assistant) and `content`.
- **ChatRequest/Response**: Data structures for interacting with the AI chatbot.
- **ContactRequest/Response**: Data structures for the contact form submission.
- **ProjectSummary**: Stub entity for GitHub project summaries.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Server starts and becomes ready for requests in under 2 seconds.
- **SC-002**: Health check endpoint responds in under 50ms.
- **SC-003**: Rate limiter overhead adds less than 5ms to any request.
  - *Note*: Rate limiter overhead verified manually via curl timing in Phase 1. Automated measurement deferred to Phase 5 (Polish & Performance) via Lighthouse and k6 load testing.
- **SC-004**: All API responses (100%) contain a unique `X-Request-ID`.
- **SC-005**: 11th request in one minute from the same IP consistently returns 429.
- **SC-006**: API documentation loads and accurately reflects all registered routes.
- **SC-007**: All defined endpoints return valid JSON according to their Pydantic models.
- **SC-008**: Code quality check (`ruff`) returns zero errors for the backend directory.
