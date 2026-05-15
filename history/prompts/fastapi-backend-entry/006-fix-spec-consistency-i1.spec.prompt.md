---
id: 006
title: fix-spec-consistency-i1
stage: spec
date: 2026-05-15
surface: agent
model: gemini-2.0-flash
feature: fastapi-backend-entry
branch: 007-fastapi-backend-entry
user: ADMINS
command: /sp.analyze --fix I1
labels: [spec, consistency, fix, pydantic]
links:
  spec: specs/007-fastapi-backend-entry/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/007-fastapi-backend-entry/spec.md
tests:
 - none
---

## Prompt

--fix I1

Issue:      I1 / MEDIUM / Inconsistency in FR-010
Finding:    FR-010 mentions "regex patterns for roles"
            in a way that implies both ChatMessage AND
            ContactRequest use role validation.
            Only ChatMessage has a role field.
            ContactRequest has no role field at all.
            This ambiguity could cause an implementer
            to incorrectly add a role field to
            ContactRequest model.

Action:     Update FR-010 in spec.md to explicitly
            scope role validation to ChatMessage only.

Replace the current FR-010 description with:

  FR-010: Pydantic Request/Response Models

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

## Response snapshot

Updated `spec.md` to resolve ambiguity in FR-010 regarding role validation. The fix explicitly scopes role validation to the `ChatMessage` model and provides detailed constraints for chat models, while strictly forbidding role fields in contact models to prevent implementation errors.

## Outcome

- ✅ Impact: Medium - Improved implementation clarity and prevented incorrect model fields.
- 🧪 Tests: No tests run; spec update.
- 📁 Files: Modified `specs/007-fastapi-backend-entry/spec.md`.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Precise specification of model constraints during the analysis phase significantly reduces the risk of rework during implementation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
