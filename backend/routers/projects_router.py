"""Projects router — GET /api/projects endpoint."""
from fastapi import APIRouter

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/")
async def get_projects():
    # TODO: Implement projects endpoint
    return {"projects": []}
