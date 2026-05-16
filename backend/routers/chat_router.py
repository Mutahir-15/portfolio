from fastapi import APIRouter, Request
from models.chat_models import ChatRequest, ChatResponse
from lib.rate_limiter import limiter

router = APIRouter(prefix="/chat", tags=["AI Chat"])

@router.post("", response_model=ChatResponse)
@limiter.limit("10/minute")
async def chat_endpoint(request: Request, chat_req: ChatRequest):
    return ChatResponse(
        reply="AI Chat is coming soon in Phase 4.",
        request_id=getattr(request.state, "request_id", "stub")
    )
