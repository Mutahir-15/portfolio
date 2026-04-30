"""Main entry point for FastAPI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Portfolio API")

# TODO: Add CORS middleware
# TODO: Include routers

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
