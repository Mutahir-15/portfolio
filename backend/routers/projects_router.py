from fastapi import APIRouter, Request

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("")
async def list_projects(request: Request):
    return {"projects": [], "count": 0, "request_id": getattr(request.state, "request_id", "stub")}

@router.get("/summaries")
async def project_summaries(request: Request):
    return {"summaries": {}, "request_id": getattr(request.state, "request_id", "stub")}
