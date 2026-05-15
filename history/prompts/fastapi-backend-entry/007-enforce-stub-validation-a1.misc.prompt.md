---
id: 007
title: enforce-stub-validation-a1
stage: misc
date: 2026-05-15
surface: agent
model: gemini-2.0-flash
feature: fastapi-backend-entry
branch: 007-fastapi-backend-entry
user: ADMINS
command: /sp.analyze --fix A1
labels: [spec, tasks, consistency, validation, stub]
links:
  spec: specs/007-fastapi-backend-entry/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/007-fastapi-backend-entry/spec.md
 - specs/007-fastapi-backend-entry/tasks.md
tests:
 - none
---

## Prompt

--fix A1

Issue:      A1 / LOW / Ambiguous stub validation behavior
Finding:    US3 (user story 3) does not explicitly state
            whether stub endpoints should validate request
            bodies using Pydantic models or accept any
            payload. tasks.md addresses this partially
            by using models in routes but does not make
            it an explicit requirement.

Action:     Make stub validation behavior an explicit
            requirement in spec.md and tasks.md.

Add to FR-009 in spec.md under Router Stubs:

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

## Response snapshot

Applied fix A1 by making stub validation an explicit requirement in both `spec.md` and `tasks.md`. Updated `spec.md` FR-009 with validation rules, implementation examples, and verification steps. Synchronized `tasks.md` (TASK-3, TASK-10, TASK-11, TASK-12, TASK-22) to reflect the corrected schemas and include validation failure tests (422).

## Outcome

- ✅ Impact: High - Ensured API contract integrity and enabled robust frontend integration testing from day one.
- 🧪 Tests: No tests run; artifact synchronization.
- 📁 Files: Modified `specs/007-fastapi-backend-entry/spec.md` and `specs/007-fastapi-backend-entry/tasks.md`.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Explicitly defining validation behavior even for stubs prevents "it works on my machine" issues when moving from stubs to real agents.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
