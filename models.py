from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_msg = Column(Text, nullable=False)
    bot_msg = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())