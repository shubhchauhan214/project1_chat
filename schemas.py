from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "What is Python?"
            }
        }

class ChatCreate(BaseModel):
    user_msg: str
    bot_msg: str

class ChatResponse(BaseModel):
    reply: str
    message_id: int

class ChatHistoryOut(BaseModel):
    id: int
    user_msg: str
    bot_msg: str
    created_at: datetime

    class Config:
        from_attributes = True