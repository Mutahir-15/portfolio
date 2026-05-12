"""Main entry point for FastAPI."""
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# FR-008: Startup guard
try:
    from lib.config import settings
except Exception as e:
    print(f"❌ [ENV ERROR] Critical configuration failure: {e}")
    sys.exit(1)

app = FastAPI(title="Portfolio API", debug=settings.debug)

# FR-006: CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: Include routers

@app.get("/")
async def root():
    return {"message": "Portfolio API is running", "environment": settings.environment}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.port, reload=settings.debug)
