import os
import anthropic
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import crud, schemas
from database import get_db

load_dotenv()

router = APIRouter(prefix="/chat", tags=["Chat"])

client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

@router.post("/", response_model=schemas.ChatResponse)
def send_message(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=500,
            messages=[
                {"role": "user", "content": request.message}
            ]
        )

        reply = response.content[0].text

        chat_data = schemas.ChatCreate(user_msg=request.message, bot_reply=reply)
        saved = crud.create_chat(db, chat_data)

        return schemas.ChatResponse(reply=reply, message_id=saved.id)

    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Anthropic API key is wrong or missing")

    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="API rate limit exceeded, please try again later")

    except anthropic.APIConnectionError:
        raise HTTPException(status_code=503, detail="Anthropic service is currently unavailable, please try again later")

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
    
