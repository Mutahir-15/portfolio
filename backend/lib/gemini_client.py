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
