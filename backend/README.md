# Portfolio AI Backend

FastAPI entry point for the mutahir.dev portfolio.

## Tech Stack

- **Framework**: FastAPI
- **Validation**: Pydantic v2
- **Rate Limiting**: SlowAPI
- **AI SDK**: OpenAI Agents SDK (configured for Gemini 2.5 Flash)
- **Tracing**: Custom Request ID middleware

## Getting Started

### Prerequisites

- Python 3.12+
- Virtual environment (recommended)

### Installation

1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Configuration

Create a `.env` file in the `backend/` directory (use `.env.example` as a template):

```env
GEMINI_API_KEY=your_key_here
ALLOWED_ORIGINS=http://localhost:3000,https://mutahir.dev
ENVIRONMENT=development
```

### Running the Application

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
Documentation is available at:
- Swagger UI: `http://localhost:8000/api/docs`
- ReDoc: `http://localhost:8000/api/redoc`

## API Route Map

| Method | Endpoint | Description | Auth | Rate Limit |
|--------|----------|-------------|------|------------|
| GET | `/api/health` | System health check | No | Exempt |
| POST | `/api/chat` | AI Chatbot endpoint | No | 10/min |
| POST | `/api/contact` | Contact form submission | No | 5/min |
| GET | `/api/projects` | List portfolio projects | No | Default |
| GET | `/api/projects/summaries` | Get project summaries | No | Default |

## Project Structure

- `main.py`: App entry point and middleware.
- `routers/`: API route definitions.
- `agents/`: AI agent logic (stubs).
- `models/`: Pydantic data models.
- `lib/`: Shared utilities (config, rate limiter, clients).
