from sqlalchemy.orm import Session
import models, schemas

def create_chat(db: Session, chat: schemas.ChatCreate):
    db_chat = models.ChatHistory(**chat.dict())
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat

def get_all_chats(db: Session, limit: int = 20):
    return db.query(models.ChatHistory).order_by(models.ChatHistory.created_at.desc()).limit(limit).all()

def get_chat_by_id(db: Session, chat_id: int):
    return db.query(models.ChatHistory).filter(models.ChatHistory.id == chat_id).first()

def delete_chat(db: Session, chat_id:int):
    db_chat = db.query(models.ChatHistory).filter(models.ChatHistory.id == chat_id).first()
    if db_chat:
        db.delete(db_chat)
        db.commit()
        return db_chat