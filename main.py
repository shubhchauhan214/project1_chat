import os
from dotenv import load_dotenv
from fastapi import FastAPI
from database import Base, engine
from routes import chat

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Chat API with Anthropic", description="Simple chatbot using FastAPI + Anthropic Clause",
              version="1.0.0")


app.include_router(chat.router)

@app.get("/")
def root():
    return {"status": "Chat API is running"}