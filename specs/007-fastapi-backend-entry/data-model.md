# Data Model: S-7 / FastAPI Backend Entry Point

## Entities

### HealthResponse
Represents the system health status.
- `status`: string (fixed value 'ok')
- `version`: string (e.g., '1.0.0')
- `environment`: string (development/production)

### ChatMessage
A single message in a conversation.
- `role`: string (enum: 'user' | 'assistant')
- `content`: string (min_length: 1, max_length: 2000)

### ChatRequest
User request to the chatbot.
- `message`: string (min_length: 1, max_length: 500)
- `history`: list of `ChatMessage` (max_length: 20)

### ChatResponse
Chatbot's reply.
- `reply`: string
- `request_id`: string (UUID)

### ContactRequest
Contact form submission.
- `name`: string (min_length: 2, max_length: 100)
- `email`: EmailStr (validated email)
- `message`: string (min_length: 10, max_length: 2000)

### ContactResponse
Result of contact submission.
- `success`: boolean
- `message`: string
- `request_id`: string (UUID)

## State Transitions
N/A - This phase primarily involves stateless request/response patterns for stubs.
