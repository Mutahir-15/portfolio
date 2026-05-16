---
description: "Task list for FastAPI Backend Entry Point implementation"
---

# Tasks: S-7 / FastAPI Backend Entry Point

**Input**: Design documents from `/specs/007-fastapi-backend-entry/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/
**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [Setup] Add pydantic[email] to requirements.txt (backend/requirements.txt)
- [x] T002 [Foundational] [P] Implement rate limiter utility (backend/lib/rate_limiter.py)

---

## Phase 2: Foundational (Models & Stubs)

**Purpose**: Core data structures and component stubs that MUST be complete before user stories

- [x] T003 [Foundational] [P] Implement Chat models (backend/models/chat_models.py)
- [x] T004 [Foundational] [P] Implement Contact models (backend/models/contact_models.py)
- [x] T005 [Foundational] [P] Create Gemini client stub (backend/lib/gemini_client.py)
- [x] T006 [Foundational] [P] Create Prompts stub (backend/lib/prompts.py)
- [x] T007 [Foundational] [P] Create Chat agent stub (backend/agents/chat_agent.py)
- [x] T008 [Foundational] [P] Create Summary agent stub (backend/agents/summary_agent.py)
- [x] T009 [Foundational] [P] Create Contact agent stub (backend/agents/contact_agent.py)
- [x] T010 [Foundational] [P] [US3] Create Chat router stub (backend/routers/chat_router.py)
- [x] T011 [Foundational] [P] [US3] Create Contact router stub (backend/routers/contact_router.py)
- [x] T012 [Foundational] [P] [US3] Create Projects router stub (backend/routers/projects_router.py)

---

## Phase 3: User Story 1 & 2 - Health & Docs (Priority: P1) 🎯 MVP

**Goal**: Deliver a healthy backend with interactive API documentation.

- [x] T013 [US1/US2] Initialize FastAPI app and lifespan (backend/main.py)
- [x] T014 [US1] [P] Configure CORS middleware (backend/main.py)
- [x] T015 [US1] [P] Implement health check endpoint (backend/main.py)
- [x] T016 [US1/US3] Register feature routers (backend/main.py)

---

## Phase 4: User Story 4 - Traffic & Security (Priority: P2)

**Goal**: Implement rate limiting, request tracing, and global error handling.

- [x] T017 [US4] [P] Add Request ID middleware (backend/main.py)
- [x] T018 [US4] [P] Add Rate Limiter middleware (backend/main.py)
- [x] T019 [US4] [P] Implement global exception handler (backend/main.py)

---

## Phase 5: Polish & Documentation

- [x] T020 [Polish] Write backend README (backend/README.md)

---

## Phase 6: Verification & Quality Control

- [x] T021 Verify startup and logs
- [x] T022 [P] Verify all endpoints via curl
- [x] T023 Verify rate limiting enforcement
- [x] T024 [P] Run Ruff linter
- [x] T025 Verify no sensitive keys in logs

---

## TASK SPECIFICATIONS (Implementation Details)

### TASK-1: Add pydantic[email] to requirements.txt
**File**: `backend/requirements.txt`
**Change**: Replace `pydantic>=2.7.0` with `pydantic[email]>=2.7.0`.
**Done**: `pydantic[email]>=2.7.0` present, `pip install -r requirements.txt` succeeds.

### TASK-2: Implement lib/rate_limiter.py
**File**: `backend/lib/rate_limiter.py`
**Change**:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request
from fastapi.responses import JSONResponse

# Create the limiter instance
limiter = Limiter(key_func=get_remote_address)

async def rate_limit_exceeded_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={
            "error": "RATE_LIMIT_EXCEEDED",
            "detail": "Too many requests. Please try again in a minute.",
            "request_id": getattr(request.state, "request_id", None)
        }
    )
```
**Done**: `limiter` and `rate_limit_exceeded_handler` exported.

### TASK-3: Implement models/chat_models.py
**File**: `backend/models/chat_models.py`
**Change**:
```python
from pydantic import BaseModel, Field
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=2000)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    history: List[ChatMessage] = Field(default_factory=list, max_length=20)

class ChatResponse(BaseModel):
    reply: str
    request_id: str
```
**Done**: Models importable and constraints correct.

### TASK-4: Implement models/contact_models.py
**File**: `backend/models/contact_models.py`
**Change**:
```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    request_id: Optional[str] = None
```
**Done**: `ContactRequest` and `ContactResponse` importable, `EmailStr` validates correctly.

### TASK-5: Implement lib/gemini_client.py stub
**File**: `backend/lib/gemini_client.py`
**Change**:
```python
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
```
**Done**: File exists with detailed implementation contract docstring.

### TASK-6: Implement lib/prompts.py stub
**File**: `backend/lib/prompts.py`
**Change**:
```python
"""
Agent Prompts (Phase 4).
"""
# TODO: Implement prompts in Phase 4
```
**Done**: File exists with docstring.

### TASK-7: Implement agents/chat_agent.py stub
**File**: `backend/agents/chat_agent.py`
**Change**:
```python
"""
Chat Agent (Phase 4).
"""
# TODO: Implement chat agent in Phase 4
```
**Done**: File exists with docstring.

### TASK-8: Implement agents/summary_agent.py stub
**File**: `backend/agents/summary_agent.py`
**Change**:
```python
"""
Summary Agent (Phase 3).
"""
# TODO: Implement summary agent in Phase 3
```
**Done**: File exists with docstring.

### TASK-9: Implement agents/contact_agent.py stub
**File**: `backend/agents/contact_agent.py`
**Change**:
```python
"""
Contact Agent (Phase 4).
"""
# TODO: Implement contact agent in Phase 4
```
**Done**: File exists with docstring.

### TASK-10: Implement routers/chat_router.py stub
**File**: `backend/routers/chat_router.py`
**Change**:
```python
from fastapi import APIRouter, Request
from models.chat_models import ChatRequest, ChatResponse
from lib.rate_limiter import limiter

router = APIRouter(prefix="/chat", tags=["AI Chat"])

@router.post("/", response_model=ChatResponse)
@limiter.limit("10/minute")
async def chat_endpoint(request: Request, chat_req: ChatRequest):
    return ChatResponse(
        reply="AI Chat is coming soon in Phase 4.",
        request_id=getattr(request.state, "request_id", "stub")
    )
```
**Done**: APIRouter with `/chat` prefix, stub POST with model validation.

### TASK-11: Implement routers/contact_router.py stub
**File**: `backend/routers/contact_router.py`
**Change**:
```python
from fastapi import APIRouter, Request
from models.contact_models import ContactRequest, ContactResponse
from lib.rate_limiter import limiter

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/", response_model=ContactResponse)
@limiter.limit("5/minute")
async def contact_endpoint(request: Request, contact_req: ContactRequest):
    return ContactResponse(
        success=True,
        message="Message received. Logic coming in Phase 4.",
        request_id=getattr(request.state, "request_id", "stub")
    )
```
**Done**: APIRouter with `/contact` prefix, stub POST with model validation.

### TASK-12: Implement routers/projects_router.py stub
**File**: `backend/routers/projects_router.py`
**Change**:
```python
from fastapi import APIRouter, Request

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/")
async def list_projects(request: Request):
    return {"projects": [], "count": 0, "request_id": getattr(request.state, "request_id", "stub")}

@router.get("/summaries")
async def project_summaries(request: Request):
    return {"summaries": {}, "request_id": getattr(request.state, "request_id", "stub")}
```
**Done**: APIRouter with `/projects` prefix, two stub GETs.

### TASK-13: Implement main.py — app instance + lifespan
**File**: `backend/main.py`
**Change**:
```python
import time
import uuid
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi.middleware import SlowAPIMiddleware
from pydantic import BaseModel

from lib.config import settings
from lib.rate_limiter import limiter, rate_limit_exceeded_handler
from routers import chat_router, contact_router, projects_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("backend")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting Portfolio Backend in {settings.environment} mode")
    logger.info(f"Allowed Origins: {settings.allowed_origins}")
    yield
    logger.info("Shutting down Portfolio Backend")

app = FastAPI(
    title="Portfolio AI Backend",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)
```
**Done**: FastAPI instance with title and lifespan.

### TASK-14: Add CORS middleware to main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
```
**Done**: `CORSMiddleware` configured with `settings.allowed_origins`.

### TASK-15: Add health check endpoint to main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str

@app.get("/api/health", response_model=HealthResponse)
@limiter.exempt
async def health_check():
    return HealthResponse(status="healthy", version="1.0.0", environment=settings.environment)
```
**Done**: `GET /api/health` returns valid JSON.

### TASK-16: Register routers in main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
app.include_router(chat_router.router, prefix="/api")
app.include_router(contact_router.router, prefix="/api")
app.include_router(projects_router.router, prefix="/api")
```
**Done**: All 3 routers included with `/api` prefix.

### TASK-17: Add request ID middleware to main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response
```
**Done**: `X-Request-ID` present in every response header.

### TASK-18: Add rate limiter middleware to main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
app.state.limiter = limiter
app.add_exception_handler(429, rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
```
**Done**: `SlowAPIMiddleware` added and 429 handler registered.

### TASK-19: Add global exception handler to main.py
**File**: `backend/main.py`
**Change**: Append to `main.py`:
```python
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    detail = str(exc) if settings.debug else "Internal Server Error"
    return JSONResponse(
        status_code=500,
        content={"error": "INTERNAL_SERVER_ERROR", "detail": detail, "request_id": getattr(request.state, "request_id", None)}
    )
```
**Done**: Unhandled exceptions return structured JSON.

### TASK-20: Write backend/README.md
**File**: `backend/README.md`
**Change**: Create README with Setup, Env vars, Run commands, and API Route Map.
**Done**: Documentation complete.

### TASK-21: Start uvicorn and verify startup
**Run**: `cd backend && uvicorn main:app --reload`
**Done**: Server starts without errors, logs show environment and origins.

### TASK-22: Curl all endpoints and verify validation
**Run**:
- `curl http://localhost:8000/api/health`
- `curl -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message": "Hello"}'`
- `curl -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message": ""}'` (Expect 422)
- `curl -X POST http://localhost:8000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","subject":"Hello","message":"Test message"}'`
- `curl -X POST http://localhost:8000/api/contact -H "Content-Type: application/json" -d '{"name": "M", "email": "bad", "message": "hi"}'` (Expect 422)
- `curl http://localhost:8000/api/projects`
**Done**: All return correct status codes (200 or 422) with `X-Request-ID` in headers.

### TASK-23: Test rate limiting
**Run**: `for i in {1..11}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/api/chat; done`
**Done**: 11th request returns 429.

### TASK-23a: Measure rate limiter overhead latency
**File**: `backend/` (curl timing commands)
**Change**:
1. **Baseline**: Temporarily comment out `SlowAPIMiddleware` in `main.py`, restart, and run:
   `for i in {1..5}; do curl -s -o /dev/null -w "Baseline %{time_total}s\n" http://localhost:8000/api/health; done`
2. **With Limiter**: Restore middleware, restart, and run:
   `for i in {1..5}; do curl -s -o /dev/null -w "With limiter %{time_total}s\n" http://localhost:8000/api/health; done`
3. **Calculate**: `overhead = (with_limiter_avg - baseline_avg) * 1000`
**Done**: Overhead < 5ms confirmed and recorded.

### TASK-24: Run Ruff linter
**Run**: `cd backend && python -m ruff check .`
**Done**: 0 errors.

### TASK-25: Verify no sensitive keys in logs
**Run**: `cd backend && uvicorn main:app 2>&1 | grep -i "api_key\|secret"`
**Done**: 0 matches.

---

## Dependencies & Execution Order

1. **Phase 1 (Setup)**: BLOCKS everything.
2. **Phase 2 (Foundational)**: BLOCKS all user stories. T003-T012 can run in parallel.
3. **Phase 3 (US1 & US2)**: Depends on Phase 2. T014-T015 can run in parallel after T013.
4. **Phase 4 (US4)**: Depends on Phase 3. T017-T019 can run in parallel.
5. **Phase 5 (Polish)**: Depends on all implementation.
6. **Phase 6 (Verification)**: Final step.

---

## Parallel Execution Examples

```bash
# Models and Stubs
Task: T003, T004, T005, T006, T007, T008, T009

# Router Stubs
Task: T010, T011, T012
```

---

## Implementation Strategy

1. **Setup**: Fix requirements.
2. **Foundational**: Create all models, agents, and router stubs. This ensures imports in `main.py` will work.
3. **MVP (US1/US2)**: Build `main.py` basic structure, CORS, and health check. Verify with `/api/health` and `/api/docs`.
4. **Traffic & Security**: Add middleware for tracing, rate limiting, and global error handling.
5. **Polish**: Finalize README.
6. **Validate**: Run all verification steps.
