import os
from groq import Groq
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import crud, schemas
from database import get_db

load_dotenv()

router = APIRouter(prefix="/chat", tags=["Chat"])

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/", response_model=schemas.ChatResponse)
def send_message(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": request.message}
            ],
            max_tokens=500
        )

        reply = response.choices[0].message.content

        chat_data = schemas.ChatCreate(user_msg=request.message, bot_msg=reply)
        saved = crud.create_chat(db, chat_data)

        return schemas.ChatResponse(reply=reply, message_id=saved.id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {str(e)}")
    
@router.get("/history", response_model=list[schemas.ChatHistoryOut])
def get_history(limit: int = 20, db: Session = Depends(get_db)):
    try:
        return crud.get_all_chats(db, limit)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {str(e)}")
    
@router.get("/{chat_id}", response_model=schemas.ChatHistoryOut)
def get_chat(chat_id: int, db: Session = Depends(get_db)):
    try:
        db_chat = crud.get_chat_by_id(db, chat_id)
        if not db_chat:
            raise HTTPException(status_code=404, detail="Chat message not found")
        return db_chat
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {str(e)}")
    
@router.delete("/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    try:
        db_chat = crud.delete_chat(db, chat_id)
        if not db_chat:
            raise HTTPException(status_code=404, detail="Chat message not found")
    
    except HTTPException:
        raise
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {str(e)}")
    
