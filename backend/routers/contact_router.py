from fastapi import APIRouter, Request
from models.contact_models import ContactRequest, ContactResponse
from lib.rate_limiter import limiter

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse)
@limiter.limit("5/minute")
async def contact_endpoint(request: Request, contact_req: ContactRequest):
    return ContactResponse(
        success=True,
        message="Message received. Logic coming in Phase 4.",
        request_id=getattr(request.state, "request_id", "stub")
    )
