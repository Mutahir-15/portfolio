# Quickstart: Environment Variables

## 1. Local Setup
Before running the application, you must set up your local environment variables.

### Frontend
1. Copy the example file:
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   ```
2. Fill in the `NEXT_PUBLIC_API_URL`. In development, this is typically `http://localhost:8000`.

### Backend
1. Copy the example file:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Fill in the required API keys and configuration.

## 2. Validation
The application will fail to start if any required variables are missing or invalid.

### Common Errors
- `[ENV ERROR]`: Check the console output for a list of missing or malformed variables.
- `server-only violation`: Ensure you aren't importing `lib/env.ts` into a 'use client' component if it contains non-public variables (though for this project, `env.ts` only contains public ones, we use the package as a safety best practice).

## 3. Adding New Variables
1. Add the variable to `.env.example` / `.env.local.example` with a descriptive comment.
2. Update the schema:
   - Frontend: `frontend/lib/env.ts`
   - Backend: `backend/lib/config.py`
