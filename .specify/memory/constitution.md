<!--
SYNC IMPACT REPORT
Version change: Initial → 1.0.0
List of modified principles:
- I. CODE QUALITY & LANGUAGE STANDARDS (New)
- II. ARCHITECTURE OVERVIEW (New)
- III. TAILWIND CSS & TERMINAL THEME CONSISTENCY (New)
- IV. ANIMATION & PERFORMANCE STANDARDS (New)
- V. AI FEATURE STANDARDS (New)
- VI. DATA & VALIDATION STANDARDS (New)
Added sections:
- ACCESSIBILITY & UX STANDARDS
- FOLDER STRUCTURE CONVENTION
- DEPLOYMENT & ENVIRONMENT STANDARDS
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ Updated alignment
- .specify/templates/spec-template.md: ✅ Updated alignment
- .specify/templates/tasks-template.md: ✅ Updated alignment
Follow-up TODOs: None
-->

# Portfolio Constitution

## Core Principles

### I. CODE QUALITY & LANGUAGE STANDARDS
#### TypeScript (Frontend — Next.js)
- Strict TypeScript (`strict: true`) enforced across all files — no implicit `any`, no type assertions without justification comments.
- File naming: kebab-case for ALL .ts and .tsx files (e.g. `hero-section.tsx`, `use-typewriter.ts`).
- Component naming: PascalCase for component functions, camelCase for hooks (`useTypewriter`) and utilities.
- All components must have explicit Props interfaces — never use `React.FC`, always use explicit return types.
- Co-locate types with their component unless shared — shared types live in `/types/index.ts` with barrel exports.
- No unused imports, variables, or dead code — ESLint + Prettier enforced on every commit.
- Barrel exports (`index.ts`) required for every feature folder.

#### Python (Backend — FastAPI)
- File naming: snake_case for ALL .py files (e.g. `chat_router.py`, `gemini_client.py`).
- Class naming: PascalCase (e.g. `ChatAgent`).
- Function and variable naming: snake_case (e.g. `get_project_summary`).
- All functions must have type hints — no untyped function signatures.
- Pydantic v2 used for all request/response models — no raw dicts in API boundaries.
- Ruff used as linter and formatter — enforced on every commit.
- One responsibility per file — routers, agents, clients, and models live in separate files.

### II. ARCHITECTURE OVERVIEW
#### Frontend (/frontend)
- Next.js 15 App Router with TypeScript.
- Tailwind CSS 4 for all styling — no plain CSS files, no CSS Modules, no inline style props (except for dynamic values).
- Framer Motion for all component-level animations.
- Atomic design structure:
    - `/components/ui` → atoms (Button, Badge, TerminalWindow)
    - `/components/sections` → organisms (HeroSection, ProjectsSection)
    - `/components/layout` → templates (Navbar, Footer, PageWrapper)
    - `/components/ai` → AI-specific Client Components (Chatbot, ContactForm)
- Every section is a Server Component by default — opt into 'use client' only when interactivity or browser APIs are required.

#### Backend (/backend)
- Python 3.12+ with FastAPI.
- OpenAI Agents SDK as the agent orchestration layer — all AI features (chatbot, project summaries, smart contact form) are built as Agents using this SDK.
- Gemini 2.5 Flash as the LLM — configured as the model provider inside the OpenAI Agents SDK via custom `base_url` + `api_key` pattern.
- All agents defined in `/backend/agents` — one file per agent.
- FastAPI routers in `/backend/routers` — one file per feature domain.
- Pydantic models in `/backend/models` — one file per domain.
- Shared utilities in `/backend/lib` (Gemini client, rate limiter, env config).

#### Communication
- Next.js frontend calls Python FastAPI backend via REST endpoints.
- Base URL stored in `NEXT_PUBLIC_API_URL` environment variable.
- All API calls from the frontend go through `/frontend/lib/api.ts` — never fetch the FastAPI backend directly from a component.
- FastAPI backend runs on port 8000 in development, proxied via Vercel rewrites in production.

### III. TAILWIND CSS & TERMINAL THEME CONSISTENCY
- Tailwind CSS 4 is the ONLY styling method — no plain CSS, no CSS Modules, no external component libraries (shadcn allowed only for accessible primitives like Dialog).
- All design tokens (colors, fonts, spacing) defined in `tailwind.config.ts` under the `theme.extend` block — never hardcode hex values in className props.
- Terminal theme has TWO modes — toggled by a `ThemeToggle` component that switches the `.dark` class on `<html>`:
    - **DARK MODE** (default): background `#0a0f0a`, surface `#0f1a0f`, primary accent `#00ff88` (terminal green), secondary accent `#00d4ff` (cyan), text primary `#c8ffc8`, text secondary `#7aab7a`, border `#1a2f1a`.
    - **LIGHT MODE**: background `#f0f4f0`, surface `#e4ece4`, primary accent `#006633` (dark terminal green), secondary accent `#0077aa` (dark cyan), text primary `#0a1a0a`, text secondary `#2d5a2d`, border `#b0ccb0`.
- Primary font: JetBrains Mono for headings, UI chrome, and code elements.
- Body font: Geist Sans for paragraph text and descriptions.
- Both fonts loaded via `next/font`.
- All interactive elements must have a terminal-style focus ring (1px solid, 2px offset).
- Theme preference persisted in `localStorage` — respect `prefers-color-scheme` as default.

### IV. ANIMATION & PERFORMANCE STANDARDS
- Framer Motion is the ONLY library for component-level animations.
- CSS keyframes allowed ONLY for ambient effects (scanlines, matrix rain, cursor blink) — must never block pointer events.
- Every animated component must respect `prefers-reduced-motion` via `useReducedMotion()`.
- Scroll animations use `whileInView` with `once: true`.
- Typewriter effect implemented as a custom hook: `/frontend/hooks/use-typewriter.ts`.
- No UI transition duration may exceed 800ms (ambient effects exempt).
- Lighthouse performance score target ≥ 90.
- All images use `next/image` exclusively.
- CLS < 0.1 — all fonts preloaded, dynamic sections use skeleton screens.

### V. AI FEATURE STANDARDS (OpenAI Agents SDK + Gemini 2.5 Flash)
- ALL AI features (Chatbot, Project Summary Generator, Smart Contact Form Agent) powered by OpenAI Agents SDK with Gemini 2.5 Flash.
- Gemini client configured once in `/backend/lib/gemini_client.py` using the OpenAI Agents SDK's custom model provider pattern.
- Chatbot system prompt lives in `/backend/lib/prompts.py` as a typed constant encoding bio, skills, projects, tone, and hard boundaries.
- All FastAPI AI routes must implement rate limiting: max 10 requests/min per IP using `slowapi`.
- AI responses stream from FastAPI to frontend using `StreamingResponse`; frontend consumes via `ReadableStream`.
- Project summaries generated by `summary_agent` at build time and cached as `/frontend/data/project-summaries.json`.
- No API keys (`GEMINI_API_KEY`) ever appear in frontend code — all AI calls are backend-only.
- All AI errors caught in FastAPI exception handlers and returned as structured JSON.

### VI. DATA & VALIDATION STANDARDS
- GitHub repos fetched at build time inside a Next.js Server Component — never via client-side fetch.
- GitHub API response typed with a `GithubRepo` interface in `/frontend/types/github.ts`.
- All FastAPI request bodies validated with Pydantic v2 models; Zod used for client-side form validation in Next.js.
- All environment variables validated at startup: Frontend (`/frontend/lib/env.ts` via Zod), Backend (`/backend/lib/config.py` via Pydantic). Fail loudly if missing.
- Contact form submissions hit `POST /api/contact` on FastAPI — processed by `contact_agent`, email sent via Resend Python SDK.

## ACCESSIBILITY & UX STANDARDS
- All interactive elements keyboard-navigable with visible focus states.
- Minimum contrast ratio 4.5:1 for all text/background combinations in BOTH dark and light modes.
- AI Chatbot widget dismissable via Escape key, focus trapped when open using a `FocusTrap` component.
- `TerminalLoader` component (blinking cursor + cycling status text) used for ALL async loading states.
- Terminal-style error output component used for ALL error states (prefixed with `[ERROR]` in accent red, monospace font).
- No content layout shift on load — fonts preloaded, skeletons for dynamic sections.

## FOLDER STRUCTURE CONVENTION
```text
portfolio/
├── frontend/                   # Next.js 15 + TypeScript
│   ├── app/                    # App Router pages
│   ├── components/
│   │   ├── ui/                 # Atoms
│   │   ├── sections/           # Page sections
│   │   ├── layout/             # Navbar, Footer
│   │   └── ai/                 # AI Client Components
│   ├── hooks/                  # Custom hooks (use-typewriter.ts etc.)
│   ├── lib/                    # api.ts, env.ts, utils.ts
│   ├── types/                  # index.ts, github.ts
│   ├── data/                   # project-summaries.json (build artifact)
│   └── public/                 # Static assets
│
├── backend/                    # Python FastAPI
│   ├── main.py                 # FastAPI app entry point
│   ├── routers/                # chat_router.py, contact_router.py
│   ├── agents/                 # chat_agent.py, summary_agent.py
│   ├── models/                 # chat_models.py, contact_models.py
│   └── lib/                    # gemini_client.py, config.py, prompts.py
│
└── .github/
    └── workflows/              # CI: lint, typecheck, deploy
```

## DEPLOYMENT & ENVIRONMENT STANDARDS
- Frontend deployed to Vercel — Next.js 15 preset, auto CI/CD from main.
- Backend deployed to a Python-compatible host (Railway or Render) — Vercel rewrites proxy `/api/*` to the FastAPI backend URL in production.
- Three environments: development, preview (per PR), production.
- Direct commits to main forbidden — PRs required for all changes.
- Bundle size budget: JS < 200kb first load (`next/bundle-analyzer` in CI).
- Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1.
- Required environment variables: `NEXT_PUBLIC_API_URL`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `ALLOWED_ORIGINS`.

## Governance
- The Portfolio Constitution is the authoritative source for all architectural and design decisions.
- Any deviation from these principles must be documented as an ADR (Architectural Decision Record) and justified.
- All Pull Requests must be reviewed against these standards.
- Amendments to this constitution require a version bump and an updated Sync Impact Report.

**Version**: 1.0.0 | **Ratified**: 2026-04-29 | **Last Amended**: 2026-04-29
