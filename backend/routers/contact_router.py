"""Contact router — POST /api/contact endpoint."""
from fastapi import APIRouter

router = APIRouter(prefix="/contact", tags=["contact"])

@router.post("/")
async def contact():
    # TODO: Implement contact endpoint
    return {"message": "Contact endpoint not implemented"}
