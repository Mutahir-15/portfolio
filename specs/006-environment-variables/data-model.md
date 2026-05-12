# Data Model: Environment Configuration

## Frontend Environment (Zod)

### `EnvSchema`
| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `NEXT_PUBLIC_API_URL` | `string` | `url()` | The base URL for the FastAPI backend. |

### State Transitions
- **Initialization**: Validated on first import of `lib/env.ts`.
- **Validation Failure**: Throws `ZodError`, caught by a global handler or causes build/runtime crash (intended).

---

## Backend Environment (Pydantic Settings)

### `Settings` (BaseSettings)
| Field | Type | Validation | Description | Masked? |
|-------|------|------------|-------------|---------|
| `GEMINI_API_KEY` | `str` | `min_length(1)` | API key for Google Gemini. | Yes |
| `RESEND_API_KEY` | `str` | `min_length(1)` | API key for Resend email service. | Yes |
| `ALLOWED_ORIGINS` | `List[str]` | Comma-sep parser | CORS allowed origins. | No |
| `ENVIRONMENT` | `str` | "development", "production" | Deployment environment. | No |
| `DEBUG` | `bool` | Boolean parser | Enable/disable debug mode. | No |
| `PORT` | `int` | `gt(0)` | Backend port (default 8000). | No |

### Validation Rules
- `ALLOWED_ORIGINS`: Must be a string of comma-separated URLs, parsed into a list.
- `PORT`: Must be a positive integer.
- `DEBUG`: Automatically coerced from "true"/"false"/"1"/"0".
