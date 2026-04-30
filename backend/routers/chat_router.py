"""Chat router — POST /api/chat endpoint."""
from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/")
async def chat():
    # TODO: Implement chat endpoint
    return {"message": "Chat endpoint not implemented"}
