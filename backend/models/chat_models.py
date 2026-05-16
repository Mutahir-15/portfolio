from pydantic import BaseModel, Field
from typing import List

class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1, max_length=2000)

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    history: List[ChatMessage] = Field(default_factory=list, max_length=20)

class ChatResponse(BaseModel):
    reply: str
    request_id: str
