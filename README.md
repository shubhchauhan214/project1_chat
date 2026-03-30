# Project 1 — AI Chat API

A simple AI chatbot backend built with FastAPI and Groq LLM.

## Tech Stack

- **FastAPI** — Backend framework
- **Groq** — LLM API (llama-3.3-70b-versatile)
- **SQLAlchemy** — ORM
- **SQLite** — Database
- **Pydantic** — Data validation

## Project Structure
```
project1_chat/
├── frontend/          # Next.js frontend
├── routes/
│   └── chat.py        # Chat endpoints
├── main.py            # App entry point
├── database.py        # DB connection
├── models.py          # DB tables
├── schemas.py         # Pydantic models
├── crud.py            # DB operations
├── requirements.txt   # Dependencies
└── .env               # Environment variables
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |
| POST | `/chat/` | Send message to AI |
| GET | `/chat/history` | Get all chat history |
| GET | `/chat/{id}` | Get single chat |
| DELETE | `/chat/{id}` | Delete a chat |

## Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/shubhchauhan214/project1_chat.git
cd project1_chat
```

### 2. Virtual environment banao
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Dependencies install karo
```bash
pip install -r requirements.txt
```

### 4. `.env` file banao
```
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=sqlite:///./chat.db
```

### 5. Server start karo
```bash
uvicorn main:app --reload
```

### 6. Swagger UI
```
http://localhost:8000/docs
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:3000`
