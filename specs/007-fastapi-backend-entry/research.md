# Research: S-7 / FastAPI Backend Entry Point

## Decisions

### 1. Rate Limiter Configuration (slowapi)
- **Decision**: Use `slowapi.Limiter` with `get_remote_address` as the key function. Register via `SlowAPIMiddleware` and `app.state.limiter`.
- **Rationale**: `slowapi` is the project standard (per Spec). Using `app.state.limiter` allows routers to access the limiter instance for route-specific overrides or exemptions.
- **Exemption**: The health check endpoint will use the `@limiter.exempt` decorator to bypass rate limiting (per EC-003).

### 2. OpenAI Agents SDK Stubbing
- **Decision**: Create lightweight class stubs in `agents/` that don't yet instantiate the `openai_agents.Agent` class, but provide the file structure.
- **Rationale**: This allows the routers to import the agent files (even if stubs) without causing `ImportError` when the SDK is added to `requirements.txt`.

### 3. Request ID Tracing
- **Decision**: Implement as a standard FastAPI middleware (`app.middleware('http')`) that generates a `uuid4` and attaches it to both the request state and the response headers (`X-Request-ID`).
- **Rationale**: Provides consistent tracing across the application as per FR-006.

## Rationale
The architecture follows a strict "Router -> Agent -> Lib" dependency direction to prevent circular imports (per EC-005). Using `lifespan` for startup/shutdown events is the modern FastAPI approach over the deprecated `@app.on_event`.

## Alternatives Considered
- **Redis for Rate Limiting**: Rejected for Phase 1 because in-memory storage is sufficient for the initial volume and simplifies the stack (per PR-003).
- **Manual CORS implementation**: Rejected in favor of FastAPI's `CORSMiddleware` which is standard and handles preflight `OPTIONS` automatically (per EC-002).
