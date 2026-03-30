import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import chat

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Chat API with GROQ", description="Simple chatbot using FastAPI + GROQ",
              version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)

@app.get("/")
def root():
    return {"status": "Chat API is running"}