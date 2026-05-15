---
id: 009
title: align-gemini-client-c1
stage: misc
date: 2026-05-15
surface: agent
model: gemini-2.0-flash
feature: fastapi-backend-entry
branch: 007-fastapi-backend-entry
user: ADMINS
command: /sp.analyze --fix C1
labels: [spec, tasks, constitution, ai, gemini]
links:
  spec: specs/007-fastapi-backend-entry/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/007-fastapi-backend-entry/spec.md
 - specs/007-fastapi-backend-entry/tasks.md
---

## Prompt

--fix C1

Issue:      C1 / LOW / Constitution custom provider pattern
            not referenced in gemini_client.py stub
Finding:    Constitution Pillar V (AI Feature Standards)
            mandates the OpenAI Agents SDK custom model
            provider pattern for Gemini 2.5 Flash.
            The current gemini_client.py is a plain stub
            with only a docstring. When Phase 3 tasks are
            written, the implementer may not reference the
            custom provider requirement and implement
            the wrong integration pattern.

Action:     Enrich gemini_client.py stub with explicit
            implementation contract for Phase 3.

Replace current gemini_client.py stub content with:

  """
  Gemini client — OpenAI Agents SDK + Gemini 2.5 Flash.

  IMPLEMENTATION CONTRACT (Phase 3):
  ────────────────────────────────────────────────────
  This file must configure Gemini 2.5 Flash as a custom
  model provider for the OpenAI Agents SDK using the
  custom base_url + api_key pattern.

  Required pattern (do NOT deviate from this):

    from agents import AsyncOpenAI, OpenAIChatCompletionsModel
    from agents import set_default_openai_client
    from backend.lib.config import settings

    gemini_client = AsyncOpenAI(
      api_key=settings.gemini_api_key,
      base_url='https://generativelanguage.googleapis.com'
               '/v1beta/openai/',
    )

    GEMINI_MODEL = OpenAIChatCompletionsModel(
      model='gemini-2.5-flash',
      openai_client=gemini_client,
    )

    set_default_openai_client(gemini_client)

  All agents (chat_agent, summary_agent, contact_agent)
  import GEMINI_MODEL from this file — never instantiate
  their own clients.

  Constitution reference:
    Pillar V — AI Feature Standards:
    "Gemini client configured once in
     /backend/lib/gemini_client.py using the OpenAI
     Agents SDK's custom model provider pattern —
     never instantiate the client directly in agent files"

  WARNING: Do not use google-generativeai SDK directly.
  Do not use langchain. OpenAI Agents SDK only.
  ────────────────────────────────────────────────────
  """

  # TODO: Phase 3 — implement using contract above
  # Imports needed in Phase 3:
  #   from agents import (
  #     AsyncOpenAI,
  #     OpenAIChatCompletionsModel,
  #     set_default_openai_client,
  #   )
  #   from backend.lib.config import settings

Add to Phase 3 task list reminder note in spec.md:
  "PHASE 3 NOTE: When implementing gemini_client.py,
   follow the implementation contract defined in the
   file docstring exactly. Constitution Pillar V
   mandates the custom model provider pattern —
   no direct Google SDK usage."

## Response snapshot

Applied fix C1 by enriching the `gemini_client.py` stub specification in `tasks.md` with a detailed implementation contract. This contract strictly mandates the OpenAI Agents SDK custom model provider pattern for Gemini 2.5 Flash, as required by Constitution Pillar V. Added a corresponding reminder note to `spec.md` for Phase 3 alignment.

## Outcome

- ✅ Impact: High - Prevented architectural drift and ensured constitutionally mandated AI integration patterns are preserved for future phases.
- 🧪 Tests: No tests run; artifact enrichment.
- 📁 Files: Modified `specs/007-fastapi-backend-entry/spec.md` and `specs/007-fastapi-backend-entry/tasks.md`.
- 🔁 Next prompts: /sp.implement
- 🧠 Reflection: Proactively embedding implementation contracts in stubs is an effective way to enforce architectural standards in a multi-phase development workflow.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
