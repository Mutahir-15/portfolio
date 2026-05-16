import uuid
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, RedirectResponse
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

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/api/docs")

# Health Check
class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str

@app.get("/api/health", response_model=HealthResponse)
@limiter.exempt
async def health_check():
    return HealthResponse(status="healthy", version="1.0.0", environment=settings.environment)

# Register Routers
app.include_router(chat_router.router, prefix="/api")
app.include_router(contact_router.router, prefix="/api")
app.include_router(projects_router.router, prefix="/api")

# Middlewares
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

app.state.limiter = limiter
app.add_exception_handler(429, rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    detail = str(exc) if settings.debug else "Internal Server Error"
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_SERVER_ERROR",
            "detail": detail,
            "request_id": getattr(request.state, "request_id", None)
        }
    )
