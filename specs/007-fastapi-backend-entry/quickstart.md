# Quickstart: S-7 / FastAPI Backend Entry Point

## Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and ensure `ALLOWED_ORIGINS` is set correctly.

## Development

1. **Start the server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

2. **Verify Health**:
   ```bash
   curl http://localhost:8000/api/health
   ```

3. **Explore Documentation**:
   Navigate to `http://localhost:8000/api/docs` for Swagger UI.

## Testing

1. **Run Linting**:
   ```bash
   ruff check .
   ```

2. **Verify Endpoints**:
   Test the stub endpoints for Chat, Contact, and Projects using the documentation or `curl`.
