# Research: Environment Variable Validation

## Decision: Frontend Validation with Zod
- **Rationale**: Zod is the industry standard for TypeScript validation. It provides excellent type inference and works perfectly with Next.js environment variables.
- **Alternatives Considered**: 
    - `t3-env`: Highly recommended but adds another abstraction layer. Zod provides enough flexibility for this project's scale.
    - Manual validation: Error-prone and lacks type safety.

## Decision: Backend Validation with Pydantic Settings
- **Rationale**: Pydantic v2's `BaseSettings` (via `pydantic-settings`) is the native way to handle configuration in FastAPI. It supports type casting, validation, and environment variable mapping out of the box.
- **Alternatives Considered**:
    - `python-dotenv` + manual `os.environ`: Lacks validation and type safety.
    - `dynaconf`: Overkill for this project.

## Decision: Security Hardening with `server-only`
- **Rationale**: Next.js 15 encourages the use of the `server-only` package to ensure that modules intended only for the server (like those containing secrets) are never accidentally imported into client components.
- **Alternatives Considered**: 
    - Manual naming conventions (`NEXT_PUBLIC_`): Effective but not enforced by the build system like `server-only`.

## Best Practices Found
1. **Masking**: Use Pydantic's `SecretStr` or custom `__repr__` for masking sensitive data.
2. **Fail Fast**: Validate at the very beginning of the entry point (`main.py` and `env.ts` import in `layout.tsx`).
3. **Example Files**: Always maintain `.example` files to document required variables without exposing secrets.
